'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/navbar'
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
  const router = useRouter()

  // Updated services array with elegant colors
  const services: Service[] = [
    {
      title: 'Register Worker',
      subtitle: 'Complete health registration',
      icon: UserCheck,
      color: 'bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200',
      iconColor: 'text-slate-700 bg-white shadow-sm',
      href: '/auth/signup'
    },
    {
      title: 'Health Records',
      subtitle: 'Access medical history',
      icon: FileText,
      color: 'bg-gradient-to-br from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-200 border border-stone-200',
      iconColor: 'text-stone-700 bg-white shadow-sm',
      href: '/services/vaccinations'
    },
    {
      title: 'Medical Centers',
      subtitle: 'Find nearby facilities',
      icon: Building,
      color: 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200',
      iconColor: 'text-gray-700 bg-white shadow-sm',
      href: '/centers/find'
    },
    {
      title: 'Health Workers',
      subtitle: 'Connect with professionals',
      icon: Users,
      color: 'bg-gradient-to-br from-zinc-50 to-zinc-100 hover:from-zinc-100 hover:to-zinc-200 border border-zinc-200',
      iconColor: 'text-zinc-700 bg-white shadow-sm',
      href: '/callback'
    }
  ]

  // Updated quick actions with proper routes
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

  // Updated stats with elegant colors
  const stats: Stat[] = [
    { number: '15,000+', label: 'Registered Workers', icon: Users, color: 'from-slate-600 via-slate-700 to-slate-800' },
    { number: '50,000+', label: 'Health Records', icon: FileText, color: 'from-stone-600 via-stone-700 to-stone-800' },
    { number: '14', label: 'Districts Covered', icon: MapPin, color: 'from-gray-600 via-gray-700 to-gray-800' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: 'from-zinc-600 via-zinc-700 to-zinc-800' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLinkClick = (href: string) => {
    console.log('Navigating to:', href)
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-stone-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-200/20 to-stone-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/20 to-zinc-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in-50 slide-in-from-left-5">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-slate-100 to-stone-100 text-slate-700 px-4 py-2 rounded-full text-xs font-semibold flex items-center shadow-sm border border-slate-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Government of Kerala Initiative
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Healthcare for <br/>
                <span className="bg-gradient-to-r from-slate-700 via-stone-700 to-gray-700 bg-clip-text text-transparent">Migrant Workers</span><br />
                <span className="bg-gradient-to-r from-zinc-700 to-slate-700 bg-clip-text text-transparent">Today & Always</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                Comprehensive digital health record management ensuring quality healthcare 
                access for Kerala&apos;s migrant workforce with AI-powered insights.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => handleLinkClick('/auth/signup')}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-700 to-stone-700 text-white rounded-2xl hover:from-slate-800 hover:to-stone-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
                <button 
                  onClick={() => handleLinkClick('/demo')}
                  className="flex items-center justify-center px-6 py-3 text-slate-700 border-2 border-slate-300 rounded-2xl hover:bg-slate-50 font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Enhanced Search Bar */}
              <form 
                onSubmit={handleSearch}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-200 max-w-2xl"
              >
                <div className="flex items-center">
                  <div className="bg-slate-100 p-2 rounded-xl mr-3">
                    <Search className="h-4 w-4 text-slate-600" />
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
                    className="bg-gradient-to-r from-slate-700 to-stone-700 text-white px-6 py-2 rounded-xl hover:from-slate-800 hover:to-stone-800 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative animate-in fade-in-50 slide-in-from-right-5">
              <div className="relative">
                <div className="w-full h-80 lg:h-[400px] bg-gradient-to-br from-slate-100 via-stone-100 to-gray-100 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>
                  <div className="text-center relative z-10">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6">
                      <Stethoscope className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Professional Healthcare</h3>
                    <p className="text-slate-600 text-base">Quality care for everyone</p>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl animate-pulse">
                    <Heart className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="absolute top-12 right-10 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl animate-pulse delay-500">
                    <Shield className="h-6 w-6 text-stone-600" />
                  </div>
                  <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl animate-pulse delay-1000">
                    <Activity className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl animate-pulse delay-700">
                    <Plus className="h-6 w-6 text-zinc-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Core <span className="bg-gradient-to-r from-slate-700 to-stone-700 bg-clip-text text-transparent">Services</span>
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
                      <div className={`p-3 rounded-2xl ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm mb-4">{service.subtitle}</p>
                    <div className="flex items-center text-slate-700 font-semibold group-hover:translate-x-2 transition-transform text-sm">
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
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100 h-full hover:-translate-y-2 duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-stone-100 rounded-2xl flex items-center justify-center group-hover:from-slate-200 group-hover:to-stone-200 transition-all group-hover:scale-110 duration-300 shadow-sm">
                      <Icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors text-center">
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

      {/* Stats Section - Elegant and Simple */}
      <section className="bg-gradient-to-br from-slate-800 via-stone-800 to-gray-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="text-stone-300">Impact</span> in Numbers
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

      {/* Special Programs Banner - Elegant and Simple */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-stone-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-stone-700 via-slate-700 to-gray-800 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                  SPECIAL HEALTH<br />
                  COVERAGE PROGRAM<br />
                  <span className="text-stone-300">FOR WORKERS</span>
                </h2>
                <p className="text-slate-200 text-lg mb-8 leading-relaxed">
                  Comprehensive health insurance and wellness programs designed specifically 
                  for Kerala&apos;s migrant workforce community with 24/7 support.
                </p>
                <button 
                  onClick={() => handleLinkClick('/services/coverage')}
                  className="bg-white text-stone-700 px-8 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-lg transform hover:scale-105"
                >
                  Learn More About Coverage
                </button>
              </div>
              <div className="relative">
                <div className="w-full h-64 lg:h-80 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-6">
                      <Activity className="h-20 w-20 text-white mx-auto" />
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
                <div className="bg-gradient-to-br from-slate-700 to-stone-700 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MigrantCare</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Leading digital health solutions for migrant workers in Kerala. 
                Ensuring accessible, quality healthcare for all.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Phone, href: 'tel:1800-102-9797' },
                  { icon: MapPin, href: '#locations' },
                  { icon: Clock, href: '#hours' }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.href)}
                      className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-slate-700 hover:to-stone-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  )
                })}
              </div>
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
                      className="block text-slate-400 hover:text-white transition-colors w-full text-left hover:translate-x-1 transform duration-200 text-sm"
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
                  <Star className="h-4 w-4 mr-1 text-slate-400" />
                  Government of Kerala Initiative
                </span>
                <span className="text-slate-400 text-sm">Problem Statement #25083</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
