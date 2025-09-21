'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import LoadingLogo from '@/components/loading'
import { 
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import AIChatWidget from '@/ai/components/AIChatWidget'

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const loginIdentifier = loginMethod === 'email' ? email : phoneNumber
    
    if (!loginIdentifier || !password) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    
    try {
      // Call backend API for login
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [loginMethod]: loginIdentifier,
          password: password
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Login successful:', data)
        
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        
        // Redirect based on user role from backend response
        if (data.user?.role === 'admin') {
          window.location.href = '/auth/admin/dashboard'
        } else {
          window.location.href = '/dashboard'
        }
      } else {
        console.error('Login failed:', data)
        alert(data.message || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    window.location.href = '/'
  }

  const handleSignupRedirect = () => {
    window.location.href = '/auth/signup'
  }

  // Show loading screen while page loads
  if (pageLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
          <LoadingLogo />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-4 rounded-2xl shadow-md">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600">Sign in to MigrantCare</p>
            </div>

            {/* Login Method Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Choose Login Method
              </label>
              <div className="bg-slate-100 rounded-2xl p-1 flex">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('email')
                    setEmail('')
                    setPhoneNumber('')
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center ${
                    loginMethod === 'email'
                      ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('phone')
                    setEmail('')
                    setPhoneNumber('')
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center ${
                    loginMethod === 'phone'
                      ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Phone Field */}
              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        // Allow only numbers and limit to 10 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                        setPhoneNumber(value)
                      }}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your 10-digit mobile number (without +91)
                  </p>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => window.location.href = '/auth/forgot-password'}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!email && !phoneNumber) || !password}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl py-3 font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign in
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don&apos;t have an account?{' '}
                <button
                  onClick={handleSignupRedirect}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Secure Login</p>
                <p className="text-xs text-slate-500">
                  Your data is protected with end-to-end encryption
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>&copy; 2025 MigrantCare - Kerala Government Initiative</p>
          </div>
        </div>
      </div>

      {/* AI Health Assistant */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={{ userType: 'public', page: 'login' }}
      />
    </>
  )
}
