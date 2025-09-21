'use client'
import { useState } from 'react'
import { 
  Bot, 
  Brain, 
  Heart, 
  Calendar, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  MessageCircle,
  Activity,
  FileText,
  Users
} from 'lucide-react'
import AIChatWidget from '@/ai/components/AIChatWidget'
import SymptomAnalyzer from '@/ai/components/SymptomAnalyzer'
import HealthInsightsPanel from '@/ai/components/HealthInsightsPanel'

export default function AIServicesPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState<'chat' | 'symptoms' | 'insights'>('chat')

  const aiFeatures = [
    {
      icon: MessageCircle,
      title: 'AI Health Assistant',
      description: 'Get instant answers to your health questions with our intelligent chatbot',
      features: ['24/7 availability', 'Multi-language support', 'Context-aware responses', 'Emergency guidance'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Brain,
      title: 'Symptom Analysis',
      description: 'AI-powered preliminary analysis of your symptoms with condition suggestions',
      features: ['Symptom tracking', 'Severity assessment', 'Condition suggestions', 'Urgency recommendations'],
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: TrendingUp,
      title: 'Health Insights',
      description: 'Personalized health insights and recommendations based on your data',
      features: ['Trend analysis', 'Health alerts', 'Lifestyle recommendations', 'Progress tracking'],
      color: 'from-green-500 to-green-700'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-optimized appointment scheduling and healthcare management',
      features: ['Appointment suggestions', 'Schedule optimization', 'Reminder system', 'Resource allocation'],
      color: 'from-orange-500 to-orange-700'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Enhanced Patient Care',
      description: 'AI assists healthcare providers in making better decisions and improving patient outcomes'
    },
    {
      icon: Users,
      title: 'Accessible Healthcare',
      description: 'Makes quality healthcare more accessible to migrant workers and their families'
    },
    {
      icon: Activity,
      title: 'Proactive Health Management',
      description: 'Early detection and prevention through continuous health monitoring and analysis'
    },
    {
      icon: FileText,
      title: 'Streamlined Documentation',
      description: 'Automated health record management and intelligent data organization'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
                <Bot className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              AI-Powered Healthcare Services
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our intelligent AI systems designed specifically for migrant workers and their families
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 py-12">
        {/* AI Features Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Our AI Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all">
                  <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Try Our AI Features
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Demo Tabs */}
            <div className="border-b border-slate-200">
              <nav className="flex">
                {[
                  { key: 'chat', label: 'AI Chat Assistant', icon: MessageCircle },
                  { key: 'symptoms', label: 'Symptom Analyzer', icon: Brain },
                  { key: 'insights', label: 'Health Insights', icon: TrendingUp }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveDemo(tab.key as any)}
                      className={`flex items-center px-6 py-4 border-b-2 font-medium transition-all ${
                        activeDemo === tab.key
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Demo Content */}
            <div className="p-6">
              {activeDemo === 'chat' && (
                <div className="text-center py-12">
                  <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Health Assistant</h3>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    Our AI assistant can help you with health questions, appointment scheduling, 
                    medication reminders, and general healthcare guidance.
                  </p>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Chatting
                  </button>
                </div>
              )}

              {activeDemo === 'symptoms' && (
                <div>
                  <SymptomAnalyzer 
                    patientAge={30}
                    patientGender="Male"
                  />
                </div>
              )}

              {activeDemo === 'insights' && (
                <div>
                  <HealthInsightsPanel 
                    patientData={{
                      vitals: [
                        { bloodPressure: '135/85', weight: 70, date: '2025-09-20' },
                        { bloodPressure: '130/80', weight: 69, date: '2025-08-15' }
                      ],
                      appointments: [
                        { date: '2025-09-20', type: 'checkup' },
                        { date: '2025-08-15', type: 'consultation' }
                      ],
                      medications: ['Amlodipine 5mg', 'Multivitamin']
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Choose AI-Enhanced Healthcare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-2xl w-fit mx-auto mb-4">
                    <Icon className="h-12 w-12 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience AI Healthcare?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of migrant workers who are already benefiting from our AI-powered healthcare services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg"
              >
                Try AI Assistant
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Learn More
                <ArrowRight className="h-4 w-4 inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={{ userType: 'public', page: 'ai-services' }}
      />
    </div>
  )
}
