import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Database connection
import { connectDB, User } from '@/lib/database'

// Zod validation schema
const signupSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .trim(),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  phoneNumber: z.string()
    .regex(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits'),
  dateOfBirth: z.string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
  role: z.enum(['patient', 'admin', 'worker', 'healthcare_provider']).default('patient'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India')
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phoneNumber: z.string().regex(/^[0-9]{10,15}$/, 'Emergency contact phone number must be 10-15 digits'),
    relationship: z.string().min(1, 'Relationship is required')
  }),
  workerId: z.string().optional(),
  employerInfo: z.object({
    companyName: z.string().optional(),
    supervisorName: z.string().optional(),
    supervisorContact: z.string().optional()
  }).optional(),
  medicalInfo: z.object({
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    allergies: z.array(z.string()).default([]),
    chronicConditions: z.array(z.string()).default([]),
    currentMedications: z.array(z.string()).default([])
  }).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()
    
    // Parse request body
    const body = await request.json()
    
    // Validate input data with Zod
    const result = signupSchema.safeParse(body)
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

    const validatedData = result.data
    const { confirmPassword, ...userData } = validatedData

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: userData.email },
        { phoneNumber: userData.phoneNumber }
      ]
    })

    if (existingUser) {
      const field = existingUser.email === userData.email ? 'email' : 'phone number'
      return NextResponse.json(
        { 
          success: false, 
          message: `User with this ${field} already exists` 
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Convert dateOfBirth string to Date object
    const dateOfBirth = new Date(userData.dateOfBirth)

    // Create new user
    const newUser = new User({
      ...userData,
      dateOfBirth,
      password: hashedPassword,
      isVerified: false,
      registrationDate: new Date(),
      lastLogin: null
    })

    await newUser.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName
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

    // Return user data (excluding sensitive information)
    const responseUserData = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      dateOfBirth: newUser.dateOfBirth,
      address: newUser.address,
      emergencyContact: newUser.emergencyContact,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: responseUserData,
      token: token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
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
