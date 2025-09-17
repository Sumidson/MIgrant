'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'


import { 
  Shield,
  Users,
  Heart,
  FileText,
  MapPin,
  CheckCircle,
  Target,
  Lightbulb,
  Award,
  TrendingUp,
  Globe,
  Smartphone,
  Database,
  Activity,
  AlertTriangle,
  ArrowRight,
  Star,
  Phone,
  Clock
} from 'lucide-react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('problem')

  const problemChallenges = [
    {
      icon: AlertTriangle,
      title: 'No Comprehensive Health Records',
      description: 'Migrant workers lack centralized health documentation, creating gaps in medical history.'
    },
    {
      icon: Users,
      title: 'Public Health Risk',
      description: 'Untracked health status poses infectious disease transmission risks to local communities.'
    },
    {
      icon: FileText,
      title: 'Healthcare Access Barriers',
      description: 'Difficulty accessing healthcare services due to lack of proper documentation.'
    },
    {
      icon: TrendingUp,
      title: 'Health Surveillance Gap',
      description: 'Insufficient monitoring and surveillance systems for migrant worker health status.'
    }
  ]

  const solutionFeatures = [
    {
      icon: Database,
      title: 'Centralized Health Records',
      description: 'Comprehensive digital database storing complete medical history and health data.'
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Insights',
      description: 'Smart analytics for disease prevention, health monitoring, and personalized care.'
    },
    {
      icon: Globe,
      title: 'Real-time Surveillance',
      description: 'Advanced health surveillance system for disease tracking and prevention.'
    },
    {
      icon: Shield,
      title: 'Secure & Accessible',
      description: 'HIPAA-compliant security with 24/7 accessibility across all districts.'
    }
  ]

  const impactStats = [
    { number: '15,000+', label: 'Migrant Workers Registered', icon: Users },
    { number: '14', label: 'Districts Covered', icon: MapPin },
    { number: '50,000+', label: 'Health Records Managed', icon: FileText },
    { number: '24/7', label: 'System Availability', icon: Clock }
  ]

  const sdgGoals = [
    { goal: 'SDG 3', title: 'Good Health and Well-being', description: 'Ensuring healthy lives and promoting well-being for all' },
    { goal: 'SDG 8', title: 'Decent Work', description: 'Promoting inclusive and sustainable economic growth' },
    { goal: 'SDG 10', title: 'Reduced Inequalities', description: 'Reducing inequalities in healthcare access' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold flex items-center shadow-lg border border-blue-200">
                <Award className="h-4 w-4 mr-2" />

              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MigrantCare</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed">
              Revolutionizing healthcare access for migrant workers in Kerala through 
              comprehensive digital health record management and AI-powered insights.
            </p>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                To create a sustainable, technology-driven solution that ensures comprehensive health record management, 
                prevents disease transmission, enhances public health surveillance, and provides equitable healthcare access 
                to Kerala&apos;s migrant workforce while supporting UN Sustainable Development Goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center mb-12 bg-gray-100 p-2 rounded-2xl">
              {[
                { id: 'problem', label: 'The Problem', icon: AlertTriangle },
                { id: 'solution', label: 'Our Solution', icon: Lightbulb },
                { id: 'impact', label: 'Impact & Results', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Problem Tab */}
            {activeTab === 'problem' && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-5">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    The Challenge We&apos;re Solving
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Kerala hosts a significant migrant population lacking comprehensive health record systems, 
                    creating serious public health risks and barriers to quality healthcare access.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {problemChallenges.map((challenge, index) => {
                    const Icon = challenge.icon
                    return (
                      <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                        <div className="flex items-start">
                          <div className="bg-red-100 p-3 rounded-xl mr-4 flex-shrink-0">
                            <Icon className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{challenge.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{challenge.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Problem Statement Context</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Government of Kerala Initiative</h4>
                      <p className="text-blue-100">Health Service Department addressing critical healthcare gaps in migrant worker populations.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">MedTech/BioTech/HealthTech Category</h4>
                      <p className="text-blue-100">Leveraging advanced technology solutions for comprehensive health management systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Solution Tab */}
            {activeTab === 'solution' && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-5">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Our Comprehensive Solution
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    MigrantCare provides a complete digital health ecosystem with AI-powered insights, 
                    real-time surveillance, and seamless healthcare access for migrant workers across Kerala.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {solutionFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-3 rounded-xl mr-4 flex-shrink-0">
                            <Icon className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Key Solution Components</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Digital Records</h4>
                      <p className="text-sm text-slate-600">Complete health documentation system</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">AI Analytics</h4>
                      <p className="text-sm text-slate-600">Predictive health insights and monitoring</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Public Health</h4>
                      <p className="text-sm text-slate-600">Disease surveillance and prevention</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Impact Tab */}
            {activeTab === 'impact' && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-5">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Measurable Impact & Results
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Our solution directly contributes to achieving UN Sustainable Development Goals 
                    while delivering tangible benefits to migrant workers and Kerala&apos;s healthcare system.
                  </p>
                </div>

                {/* Impact Statistics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {impactStats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900 mb-2">{stat.number}</div>
                        <div className="text-slate-600 font-medium">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>

                {/* SDG Goals */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                    Supporting UN Sustainable Development Goals
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {sdgGoals.map((sdg, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
                        <div className="bg-blue-600 text-white text-lg font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          {sdg.goal}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{sdg.title}</h4>
                        <p className="text-sm text-slate-600">{sdg.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Future Goals */}
                <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4 text-center">Our Vision for the Future</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="h-5 w-5 mr-2" />
                        Short-term Goals (2025-2026)
                      </h4>
                      <ul className="space-y-2 text-emerald-100">
                        <li>• Expand coverage to all 14 districts</li>
                        <li>• Integrate with existing healthcare systems</li>
                        <li>• Implement multilingual support</li>
                        <li>• Deploy mobile health units</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Long-term Vision (2027-2030)
                      </h4>
                      <ul className="space-y-2 text-emerald-100">
                        <li>• Replicate model across India</li>
                        <li>• Advanced AI health predictions</li>
                        <li>• Blockchain-secured health records</li>
                        <li>• International health data exchange</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us in Transforming Healthcare</h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of the solution that&apos;s making quality healthcare accessible to every migrant worker in Kerala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MigrantCare</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Leading digital health solutions for migrant workers in Kerala. 
                Ensuring accessible, quality healthcare for all.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-slate-400 hover:text-white transition-colors">Home</Link>
                <a href="/auth/login" className="block text-slate-400 hover:text-white transition-colors">Login</a>
                <a href="/auth/signup" className="block text-slate-400 hover:text-white transition-colors">Register</a>
                <a href="/services" className="block text-slate-400 hover:text-white transition-colors">Services</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Problem Statement</h4>
              <div className="space-y-2 text-slate-400">
                <p>ID: 25083</p>
                <p>Government of Kerala</p>
                <p>Health Service Department</p>
                <p>Smart India Hackathon 2025</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> 1800-102-9797</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> Emergency: 108</p>
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Kerala, India</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
              <p className="mb-4 md:mb-0">
                &copy; 2025 MigrantCare. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  Smart India Hackathon 2025
                </span>
                <span className="text-blue-400 text-sm">Problem Statement #25083</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
