'use client'
import { useState } from 'react'
import { 
  Shield,
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
  FileText
} from 'lucide-react'

interface FormData {
  // Step 1: Basic Info
  name: string;
  phoneNumber: string;
  email: string;
  
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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneNumber: '',
    email: '',
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
      case 1:
        return !!(formData.name.trim() && formData.phoneNumber.trim())
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
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields.')
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Signup data:', formData)
      setIsLoading(false)
      setCurrentStep(5) // Success step
    }, 2000)
  }

  const handleBackToHome = () => {
    window.location.href = '/'
  }

  const handleLoginRedirect = () => {
    window.location.href = '/auth/login'
  }

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h2>
        <p className="text-slate-600">Let&apos;s start with your basic details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your email (optional)"
            />
          </div>
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
            <input
              type="text"
              value={formData.aadharNumber}
              onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your Aadhar number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hometown <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={formData.hometown}
              onChange={(e) => handleInputChange('hometown', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your hometown"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hometown Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea
              value={formData.hometownAddress}
              onChange={(e) => handleInputChange('hometownAddress', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none"
              placeholder="Enter your hometown address"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Kerala Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea
              value={formData.keralaAddress}
              onChange={(e) => handleInputChange('keralaAddress', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none"
              placeholder="Enter your current address in Kerala"
              required
            />
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
            <input
              type="text"
              value={formData.nomineeName}
              onChange={(e) => handleInputChange('nomineeName', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter nominee's full name"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nominee Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="tel"
              value={formData.nomineePhone}
              onChange={(e) => handleInputChange('nomineePhone', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter nominee's phone number"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nominee Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea
              value={formData.nomineeAddress}
              onChange={(e) => handleInputChange('nomineeAddress', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px] resize-none"
              placeholder="Enter nominee's complete address"
              required
            />
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
            <textarea
              value={formData.illnesses}
              onChange={(e) => handleInputChange('illnesses', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none"
              placeholder="List any current illnesses or health conditions"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Allergies <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none"
              placeholder="List any known allergies"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Current Medications <span className="text-slate-400">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <textarea
              value={formData.currentMedications}
              onChange={(e) => handleInputChange('currentMedications', e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[80px] resize-none"
              placeholder="List any medications you're currently taking"
            />
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
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Sign In to Your Account
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="mb-6 flex items-center text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Patient Registration
            </h1>
            <p className="text-slate-600">Join MigrantCare for quality healthcare</p>
          </div>

          {/* Progress Bar */}
          {currentStep <= totalSteps && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm font-medium text-slate-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
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
                    className="flex items-center px-6 py-3 text-slate-600 border border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold transition-all"
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
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-top-transparent mr-2"></div>
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
                  className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
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
  )
}
