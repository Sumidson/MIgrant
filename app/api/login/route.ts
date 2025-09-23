import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Database connection
import { connectDB, User } from '@/lib/database'

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()
    
    // Parse request body
    const body = await request.json()
    
    // Validate input data with Zod
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: result.error.errors.map(error => ({
            field: error.path.join('.'),
            message: error.message
          }))
        },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    // Update last login
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() })

    // Return user data (excluding sensitive information)
    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      emergencyContact: user.emergencyContact,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData,
      token: token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
