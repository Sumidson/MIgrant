import { NextResponse } from 'next/server'
import { connectDB, User } from '@/lib/database'

export async function GET() {
  try {
    await connectDB()
    
    // Test database connection by counting users
    const userCount = await User.countDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully',
      userCount: userCount,
      database: 'migrant-healthcare'
    })
  } catch (error) {
    console.error('Database connection test failed:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
