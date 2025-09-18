'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Shield,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  AlertCircle,
  LogIn,
  UserPlus
} from 'lucide-react'

interface NavigationItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { title: string; href: string; }[];
}

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const navigationItems: NavigationItem[] = [
    {
      title: 'Health Centers',
      href: '/centers',
      hasDropdown: true,
      dropdownItems: [
        { title: 'Find Centers', href: '/centers/find' },
        { title: 'Register Center', href: '/centers/register' },
        { title: 'Center Directory', href: '/centers/directory' }
      ]
    },
    {
      title: 'Services',
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { title: 'Health Checkups', href: '/services/checkups' },
        { title: 'Vaccinations', href: '/services/vaccinations' },
        { title: 'Emergency Care', href: '/services/emergency' },
        { title: 'Patient Records', href: '/services/patient-records' }
      ]
    },
    {
      title: 'Health Programs',
      href: '/programs',
      hasDropdown: true,
      dropdownItems: [
        { title: 'Preventive Care', href: '/programs/preventive' },
        { title: 'Chronic Disease Management', href: '/programs/chronic' },
        { title: 'Mental Health', href: '/programs/mental' },
        { title: 'Book Health Checkup', href: '/programs/checkup' }
      ]
    }
  ]

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  const handleLinkClick = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-blue-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs text-slate-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center hover:text-blue-600 transition-colors cursor-pointer">
                <Phone className="h-3 w-3 mr-1" />
                1800-102-9797
              </span>
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Kerala, India
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="flex items-center text-red-500 font-medium cursor-pointer">
                <AlertCircle className="h-3 w-3 mr-1" />
                Emergency: 108
              </span>
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Help Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleLinkClick('/')}>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MigrantCare</h1>
              <p className="text-xs text-slate-600 font-medium">Kerala Government</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative dropdown-container">
                {item.hasDropdown ? (
                  <button 
                    className="flex items-center text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 text-sm"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    {item.title} 
                    <ChevronDown 
                      className={`ml-1 h-3 w-3 transition-transform ${
                        activeDropdown === item.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleLinkClick(item.href)}
                    className="text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 text-sm"
                  >
                    {item.title}
                  </button>
                )}
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.title && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-blue-100 py-2 animate-in fade-in-0 zoom-in-95">
                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={dropdownIndex}
                        onClick={() => handleLinkClick(dropdownItem.href)}
                        className="block w-full text-left px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg mx-2 text-sm"
                      >
                        {dropdownItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={() => handleLinkClick('/about')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 text-sm"
            >
              About Us
            </button>
            <button 
              onClick={() => handleLinkClick('/contact')}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 text-sm"
            >
              Contact Us
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleLinkClick('/callback')}
              className="hidden md:flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium transition-all shadow-sm hover:shadow-md text-sm"
            >
              <Phone className="h-3 w-3 mr-1" />
              Request Callback
            </button>
            
            {/* Login Button */}
            <button 
              onClick={() => handleLinkClick('/auth/login')}
              className="hidden md:flex items-center px-4 py-2 text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 font-medium transition-all shadow-sm hover:shadow-md text-sm"
            >
              <LogIn className="h-3 w-3 mr-1" />
              Login
            </button>
            
            {/* Sign Up Button */}
            <button 
              onClick={() => handleLinkClick('/auth/signup')}
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              <UserPlus className="h-3 w-3 mr-1" />
              Sign Up
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-blue-100 animate-in slide-in-from-top-5">
          <div className="container mx-auto px-4 py-3">
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <button 
                    onClick={() => handleLinkClick(item.href)}
                    className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors w-full text-left rounded-lg px-2 hover:bg-blue-50 text-sm"
                  >
                    {item.title}
                  </button>
                  {item.dropdownItems && (
                    <div className="ml-3 space-y-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <button
                          key={dropdownIndex}
                          onClick={() => handleLinkClick(dropdownItem.href)}
                          className="block text-slate-600 hover:text-blue-600 py-1 transition-colors w-full text-left rounded-lg px-2 hover:bg-blue-50 text-xs"
                        >
                          {dropdownItem.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => handleLinkClick('/about')}
                className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors w-full text-left rounded-lg px-2 hover:bg-blue-50 text-sm"
              >
                About Us
              </button>
              <button 
                onClick={() => handleLinkClick('/contact')}
                className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors w-full text-left rounded-lg px-2 hover:bg-blue-50 text-sm"
              >
                Contact Us
              </button>
              
              {/* Mobile Login/Signup */}
              <div className="border-t border-blue-100 pt-3 mt-3 space-y-2">
                <button 
                  onClick={() => handleLinkClick('/auth/login')}
                  className="flex items-center text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors w-full rounded-lg px-2 hover:bg-blue-50 text-sm"
                >
                  <LogIn className="h-3 w-3 mr-1" />
                  Login
                </button>
                <button 
                  onClick={() => handleLinkClick('/auth/signup')}
                  className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium py-2 transition-colors w-full rounded-lg px-2 hover:bg-emerald-50 text-sm"
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
