import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export interface AuthUser {
  userId: string
  email: string
  role: string
  firstName: string
  lastName: string
}

// Zod schema for JWT payload validation
const jwtPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  role: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  iat: z.number(),
  exp: z.number()
})

export function verifyAuth(request: NextRequest): AuthUser | null {
  try {
    // Get token from cookie or Authorization header
    let token = request.cookies.get('auth_token')?.value
    
    if (!token) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return null
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>
    
    // Validate JWT payload with Zod
    const result = jwtPayloadSchema.safeParse(decoded)
    if (!result.success) {
      console.error('Invalid JWT payload:', result.error)
      return null
    }
    
    return {
      userId: result.data.userId,
      email: result.data.email,
      role: result.data.role,
      firstName: result.data.firstName,
      lastName: result.data.lastName
    }
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

export function requireAuth(request: NextRequest) {
  const user = verifyAuth(request)
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requireRole(request: NextRequest, allowedRoles: string[]) {
  const user = requireAuth(request)
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }
  return user
}

// Helper function to validate request body with any Zod schema
export function validateRequestBody<T>(
  body: unknown, 
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: Array<{ field: string; message: string }> } {
  const result = schema.safeParse(body)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  return {
    success: false,
    errors: result.error.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message
    }))
  }
}
