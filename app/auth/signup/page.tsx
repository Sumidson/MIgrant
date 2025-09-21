'use client'
import { useState } from 'react'
import Navbar from '@/components/navbar'

import { 
  User,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Home,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  UserPlus,
  Heart,
  FileText,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

interface FormData {
  // Step 1: Basic Info
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2: Identity & Address
  aadharNumber: string;
  hometown: string;
  hometownAddress: string;
  keralaAddress: string;

  // Step 3: Nominee Details
  nomineeName: string;
  nomineePhone: string;
  nomineeAddress: string;

  // Step 4: Health Info
  illnesses: string;
  allergies: string;
  currentMedications: string;
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadharNumber: '',
    hometown: '',
    hometownAddress: '',
    keralaAddress: '',
    nomineeName: '',
    nomineePhone: '',
    nomineeAddress: '',
    illnesses: '',
    allergies: '',
    currentMedications: ''
  })

  const totalSteps = 4

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: {
        const minLen = 6 // Changed from 8 to 6 to match backend
        const basicOk = !!(formData.name.trim() && formData.phoneNumber.trim())
        const passOk = formData.password.length >= minLen
        const matchOk = formData.password === formData.confirmPassword
        return basicOk && passOk && matchOk
      }
      case 2:
        return !!(formData.aadharNumber.trim() && formData.hometown.trim() && 
                  formData.hometownAddress.trim() && formData.keralaAddress.trim())
      case 3:
        return !!(formData.nomineeName.trim() && formData.nomineePhone.trim() && 
                  formData.nomineeAddress.trim())
      case 4:
        return true // Health info can be optional
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    } else {
      alert('Please fill in all required fields before proceeding.')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debug validation
    console.log('Current step:', currentStep)
    console.log('Form data:', formData)
    console.log('Validation result:', validateStep(currentStep))
    
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)
    
    try {
      // Prepare data for backend API - only send fields that backend expects
      const signupData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email || undefined, // Only send if provided
        phone: formData.phoneNumber,
        password: formData.password,
        aadharNumber: formData.aadharNumber
      }

      // Call backend API
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/auth/register`
      console.log('Calling API:', apiUrl)
      console.log('Request data:', signupData)
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError)
        data = { message: 'Invalid response from server' }
      }
      
      console.log('Response status:', response.status)
      console.log('Response data:', data)

      if (response.ok) {
        // Registration successful
        console.log('Registration successful:', data)
        setCurrentStep(5) // Success step
      } else {
        // Registration failed
        console.error('Registration failed:', data)
        console.error('Response status:', response.status)
        console.error('Response headers:', response.headers)
        
        // Handle different error response formats
        let errorMessage = 'Registration failed. Please try again.'
        
        if (data && typeof data === 'object') {
          if (data.message) {
            errorMessage = data.message
          } else if (data.errors && Array.isArray(data.errors)) {
            errorMessage = data.errors.map((e: { message: string }) => e.message).join(', ')
          } else if (data.error) {
            errorMessage = data.error
          }
        } else if (typeof data === 'string') {
          errorMessage = data
        }
        
        // Add status-specific error messages
        if (response.status === 400) {
          errorMessage = 'Invalid data provided. Please check your information and try again.'
        } else if (response.status === 409) {
          errorMessage = 'An account with this email or phone number already exists.'
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        }
        
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Registration error:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : 'Unknown'
      })
      
      let errorMessage = 'Network error. Please try again.'
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please check if the backend server is running on http://localhost:5000'
      } else if (error instanceof Error) {
        errorMessage = `Network error: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToHome = () => {
    window.location.href = '/'
  }

  const handleLoginRedirect = () => {
    window.location.href = '/auth/login'
  }

  // Derived password helper / errors
  const passwordTooShort = formData.password.length > 0 && formData.password.length < 6
  const passwordMismatch = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword

  // Step 1: Basic Information + Password
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h2>
        <p className="text-slate-600">Let&apos;s start with account and contact details</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your phone number"
              required
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your email (optional)"
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Create Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full bg-white border-2 rounded-2xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 transition-all ${
                passwordTooShort ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="At least 6 characters"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {passwordTooShort && (
            <p className="text-xs text-red-600 mt-1">Use at least 6 characters.</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full bg-white border-2 rounded-2xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 transition-all ${
                passwordMismatch ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-blue-500 focus:border-blue-500'
              }`}
              placeholder="Re-enter your password"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirmPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {passwordMismatch && (
            <p className="text-xs text-red-600 mt-1">Passwords do not match.</p>
          )}
        </div>
      </div>
    </div>
  )

  // Step 2: Identity & Address
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Identity & Address</h2>
        <p className="text-slate-600">Your identification and address details</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Aadhar Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="text" value={formData.aadharNumber} onChange={(e) => handleInputChange('aadharNumber', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter your Aadhar number" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hometown <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="text" value={formData.hometown} onChange={(e) => handleInputChange('hometown', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter your hometown" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hometown Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.hometownAddress} onChange={(e) => handleInputChange('hometownAddress', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none" placeholder="Enter your hometown address" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kerala Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.keralaAddress} onChange={(e) => handleInputChange('keralaAddress', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none" placeholder="Enter your current address in Kerala" required />
          </div>
        </div>
      </div>
    </div>
  )

  // Step 3: Nominee Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Nominee Details</h2>
        <p className="text-slate-600">Emergency contact and nominee information</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nominee Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="text" value={formData.nomineeName} onChange={(e) => handleInputChange('nomineeName', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter nominee's full name" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nominee Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="tel" value={formData.nomineePhone} onChange={(e) => handleInputChange('nomineePhone', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter nominee's phone number" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nominee Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.nomineeAddress} onChange={(e) => handleInputChange('nomineeAddress', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] resize-none" placeholder="Enter nominee's complete address" required />
          </div>
        </div>
      </div>
    </div>
  )

  // Step 4: Health Information
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Health Information</h2>
        <p className="text-slate-600">Your medical history and current health status</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Current Illnesses <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.illnesses} onChange={(e) => handleInputChange('illnesses', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none" placeholder="List any current illnesses or health conditions" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Allergies <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.allergies} onChange={(e) => handleInputChange('allergies', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none" placeholder="List any known allergies" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Current Medications <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea value={formData.currentMedications} onChange={(e) => handleInputChange('currentMedications', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none" placeholder="List any medications you're currently taking" />
          </div>
        </div>
      </div>
    </div>
  )

  // Success Step
  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-full">
          <CheckCircle className="h-16 w-16 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-slate-900">Registration Successful!</h2>
      <p className="text-lg text-slate-600 max-w-md mx-auto">
        Your account has been created successfully. You can now access healthcare services through MigrantCare.
      </p>
      <button
        onClick={handleLoginRedirect}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Sign In to Your Account
      </button>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          {/* Main Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Patient Registration
              </h1>
              <p className="text-slate-600">Join MigrantCare for quality healthcare</p>
            </div>

            {/* Progress Bar */}
            {currentStep <= totalSteps && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Step {currentStep} of {totalSteps}</span>
                  <span className="text-sm font-medium text-blue-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderSuccess()}

              {/* Navigation Buttons */}
              {currentStep <= totalSteps && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-6 py-3 text-blue-600 border border-blue-300 rounded-2xl hover:bg-blue-50 font-semibold transition-all"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl hover:from-blue-700 hover:to-teal-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>

            {/* Login Link */}
            {currentStep <= totalSteps && (
              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Already have an account?{' '}
                  <button
                    onClick={handleLoginRedirect}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            )}
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

