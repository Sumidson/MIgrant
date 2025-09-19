'use client'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import { 
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  UserCog,
  User,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

export default function LoginPage() {
  const [userType, setUserType] = useState<'admin' | 'patient' | ''>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userOptions = [
    {
      value: 'admin',
      label: 'Admin',
      icon: UserCog,
      description: 'Healthcare Administrator'
    },
    {
      value: 'patient',
      label: 'Patient',
      icon: User,
      description: 'Migrant Worker'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userType || !email || !password) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', { userType, email, password })
      setIsLoading(false)
      // Handle navigation based on userType
      if (userType === 'admin') {
        console.log('Redirecting to admin dashboard...')
        // window.location.href = '/admin/dashboard'
      } else {
        console.log('Redirecting to patient dashboard...')
        // window.location.href = '/patient/dashboard'
      }
    }, 2000)
  }

  const handleBackToHome = () => {
    window.location.href = '/'
  }

  const handleSignupRedirect = () => {
    window.location.href = '/auth/signup'
  }

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setIsDropdownOpen(false)
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

        {/* Click outside handler */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={handleClickOutside}
          ></div>
        )}

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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Select User Type
                </label>
                <div className="relative z-20">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-white border-2 rounded-2xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                      userType 
                        ? 'border-slate-300 text-slate-900' 
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {userType ? (
                          <>
                            {userType === 'admin' ? (
                              <UserCog className="h-5 w-5 mr-3 text-blue-700" />
                            ) : (
                              <User className="h-5 w-5 mr-3 text-emerald-600" />
                            )}
                            <div>
                              <span className="font-medium">
                                {userType === 'admin' ? 'Admin' : 'Patient'}
                              </span>
                              <p className="text-xs text-slate-500">
                                {userType === 'admin' ? 'Healthcare Administrator' : 'Migrant Worker'}
                              </p>
                            </div>
                          </>
                        ) : (
                          <span>Choose your account type</span>
                        )}
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-slate-400 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 animate-in fade-in-0 zoom-in-95">
                      {userOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setUserType(option.value as 'admin' | 'patient')
                              setIsDropdownOpen(false)
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                              userType === option.value ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <Icon className={`h-5 w-5 mr-3 ${
                                option.value === 'admin' ? 'text-blue-700' : 'text-emerald-600'
                              }`} />
                              <div>
                                <div className="font-medium text-slate-900">{option.label}</div>
                                <div className="text-xs text-slate-500">{option.description}</div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
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
                  onClick={() => console.log('Navigate to forgot password')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !userType || !email || !password}
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
    </>
  )
}