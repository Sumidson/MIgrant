import { NextRequest, NextResponse } from 'next/server'
import { connectDB, User } from '@/lib/database'
import { verifyAuth } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const userData = await User.findById(user.userId).select('-password')
    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: userData
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
