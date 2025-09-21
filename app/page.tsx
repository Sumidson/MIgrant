'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/navbar'
import LoadingLogo from '../components/loading'
import { 
  Search,
  Users,
  UserCheck,
  Heart,
  FileText,
  Shield,
  Phone,
  MapPin,
  Clock,
  Building,
  CheckCircle,
  Stethoscope,
  Activity,
  ArrowRight,
  PlayCircle,
  Plus,
  Star
} from 'lucide-react'
import AIChatWidget from '@/ai/components/AIChatWidget'

// TypeScript interfaces (unchanged)
interface Service {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  href: string;
}

interface QuickAction {
  title: string;
  icon: React.ElementType;
  description: string;
  href: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Show loading for 1.5 seconds

    return () => clearTimeout(timer)
  }, [])

  // Updated services array with the new "Trustworthy & Professional" color palette
  const services: Service[] = [
    {
      title: 'Register Worker',
      subtitle: 'Complete health registration',
      icon: UserCheck,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200',
      iconColor: 'text-blue-700 bg-white shadow-sm',
      href: '/auth/signup'
    },
    {
      title: 'Health Records',
      subtitle: 'Access medical history',
      icon: FileText,
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200',
      iconColor: 'text-emerald-700 bg-white shadow-sm',
      href: '/services/vaccinations'
    },
    {
      title: 'Medical Centers',
      subtitle: 'Find nearby facilities',
      icon: Building,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200',
      iconColor: 'text-blue-700 bg-white shadow-sm',
      href: '/centers/find'
    },
    {
      title: 'Health Workers',
      subtitle: 'Connect with professionals',
      icon: Users,
      color: 'bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border border-emerald-200',
      iconColor: 'text-emerald-700 bg-white shadow-sm',
      href: '/callback'
    }
  ]

  // Quick actions remain visually consistent but could be styled further if needed
  const quickActions: QuickAction[] = [
    {
      title: 'Health Checkups',
      icon: Heart,
      description: 'Schedule comprehensive health examinations',
      href: '/services/checkups'
    },
    {
      title: 'Vaccination Records',
      icon: Shield,
      description: 'Track immunization history and schedule',
      href: '/services/vaccinations'
    },
    {
      title: 'Emergency Services',
      icon: Phone,
      description: '24/7 emergency medical assistance',
      href: '/services/emergency'
    },
    {
      title: 'Health Reports',
      icon: FileText,
      description: 'Access and download medical reports',
      href: '/services/reports'
    }
  ]

  // Updated stats with the new color palette
  const stats: Stat[] = [
    { number: '15,000+', label: 'Registered Workers', icon: Users, color: 'from-blue-600 via-blue-700 to-blue-800' },
    { number: '50,000+', label: 'Health Records', icon: FileText, color: 'from-emerald-600 via-emerald-700 to-emerald-800' },
    { number: '14', label: 'Districts Covered', icon: MapPin, color: 'from-blue-600 via-blue-700 to-blue-800' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: 'from-emerald-600 via-emerald-700 to-emerald-800' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLinkClick = (href: string) => {
    router.push(href)
  }

  // Show loading screen during initial load
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingLogo />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in-50 slide-in-from-left-5">
              <div className="flex items-center mb-6">
                <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center shadow-sm border border-slate-200">
                  <CheckCircle className="h-3 w-3 mr-1.5 text-emerald-500" />
                  Government of Kerala Initiative
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Healthcare for <br/>
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 bg-clip-text text-transparent">Migrant Workers</span><br />
                <span className="bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">Today & Always</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Comprehensive digital health record management ensuring quality healthcare 
                access for Kerala&apos;s migrant workforce with AI-powered insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => handleLinkClick('/auth/signup')}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-900 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
                <button 
                  onClick={() => handleLinkClick('/demo')}
                  className="flex items-center justify-center px-6 py-3 text-blue-700 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Enhanced Search Bar */}
              <form 
                onSubmit={handleSearch}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200 max-w-2xl flex items-center"
              >
                <div className="p-2 mr-2">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search health workers, specialties, centers..."
                  className="flex-1 outline-none text-slate-700 text-base bg-transparent placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-blue-900 font-semibold transition-all shadow-md"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Hero Image/Illustration with Colorful Floating Elements */}
            <div className="relative animate-in fade-in-50 slide-in-from-right-5">
              <div className="relative">
                <div className="w-full h-80 lg:h-[400px] bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6">
                      <Stethoscope className="h-16 w-16 text-blue-700 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Professional Healthcare</h3>
                    <p className="text-slate-600 text-base">Quality care for everyone</p>
                  </div>
                  
                  {/* Colorful Floating Elements */}
                  <div className="absolute top-8 left-8 bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-xl animate-pulse hover:scale-110 transition-transform duration-300">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-12 right-10 bg-gradient-to-br from-teal-500 to-teal-600 p-3 rounded-2xl shadow-xl animate-pulse delay-500 hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-10 left-10 bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-2xl shadow-xl animate-pulse delay-1000 hover:scale-110 transition-transform duration-300">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-8 right-8 bg-gradient-to-br from-blue-400 to-blue-500 p-3 rounded-2xl shadow-xl animate-pulse delay-700 hover:scale-110 transition-transform duration-300">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Core <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare solutions designed specifically for migrant workers across Kerala
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => handleLinkClick(service.href)}
                >
                  <div className={`${service.color} rounded-2xl p-6 transition-all h-full hover:-translate-y-2 duration-300 shadow-sm hover:shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm mb-4">{service.subtitle}</p>
                    <div className="flex items-center text-blue-700 font-semibold group-hover:translate-x-1 transition-transform text-sm">
                      Learn More 
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What We Can Help You With
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive health services tailored for migrant workers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => handleLinkClick(action.href)}
                >
                  <div className="bg-slate-50/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100 h-full hover:-translate-y-2 duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-emerald-200 transition-all group-hover:scale-110 duration-300 shadow-sm">
                      <Icon className="h-6 w-6 text-blue-700" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-800 transition-colors text-center">
                      {action.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-center text-sm">{action.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-blue-900 via-gray-900 to-black py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="text-emerald-300">Impact</span> in Numbers
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Making a measurable difference in migrant worker healthcare across Kerala
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-300 font-semibold">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Special Programs Banner */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  SPECIAL HEALTH<br />
                  COVERAGE PROGRAM<br />
                  <span className="text-emerald-300">FOR WORKERS</span>
                </h2>
                <p className="text-slate-200 text-lg mb-8 leading-relaxed">
                  Comprehensive health insurance and wellness programs designed specifically 
                  for Kerala&apos;s migrant workforce community with 24/7 support.
                </p>
                <button 
                  onClick={() => handleLinkClick('/services/coverage')}
                  className="bg-white text-blue-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg transform hover:scale-105"
                >
                  Learn More About Coverage
                </button>
              </div>
              <div className="relative">
                <div className="w-full h-64 lg:h-80 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-6">
                      <Shield className="h-20 w-20 text-white mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Complete Health Coverage</h3>
                    <p className="text-slate-200">Protecting our workforce every day</p>
                  </div>
                </div>
              </div>
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
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MigrantCare</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Leading digital health solutions for migrant workers in Kerala. 
                Ensuring accessible, quality healthcare for all.
              </p>
            </div>
            
            {[
              {
                title: 'Services',
                links: [
                  { name: 'Health Registration', href: '/auth/signup' },
                  { name: 'Medical Records', href: '/services/vaccinations' },
                  { name: 'Health Checkups', href: '/services/checkups' },
                  { name: 'Emergency Care', href: '/services/emergency' }
                ]
              },
              {
                title: 'Quick Links',
                links: [
                  { name: 'Find Health Center', href: '/services/centers' },
                  { name: 'Book Appointment', href: '/services/vaccinations/booking' },
                  { name: 'Health Reports', href: '/services/reports' },
                  { name: 'Contact Support', href: '/services/callback' }
                ]
              },
              {
                title: 'Contact Info',
                links: [
                  { name: 'Helpline: 1800-102-9797', href: 'tel:1800-102-9797' },
                  { name: 'Emergency: 108', href: 'tel:108' },
                  { name: 'Kerala, India', href: '#' },
                  { name: 'Help Center', href: '/help' }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <button
                      key={linkIndex}
                      onClick={() => handleLinkClick(link.href)}
                      className="block text-slate-400 hover:text-emerald-300 transition-colors w-full text-left hover:translate-x-1 transform duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
              <p className="mb-4 md:mb-0">
                &copy; 2025 MigrantCare. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm">
                  <Star className="h-4 w-4 mr-1.5 text-slate-500" />
                  Government of Kerala Initiative
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Health Assistant - Always visible floating button */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={{ userType: 'public', page: 'home' }}
      />
    </div>
  )
}
