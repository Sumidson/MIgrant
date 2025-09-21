'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Calendar,
  Search,
  Bell,
  Settings,
  LogOut,
  Shield,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  MoreVertical,
  UserCheck,
  Phone,
  Bot
} from 'lucide-react'
import AIChatWidget from '@/ai/components/AIChatWidget'
import HealthInsightsPanel from '@/ai/components/HealthInsightsPanel'

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  workerId: string;
  lastVisit: string;
  status: 'Active' | 'Critical' | 'Stable';
  condition: string;
  contactNumber: string;
}

interface DashboardStats {
  totalPatients: number;
  activeWorkers: number;
  todayAppointments: number;
  criticalCases: number;
  newRegistrations: number;
  completedCheckups: number;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const router = useRouter()

  // Mock data - replace with real API calls
  const [stats] = useState<DashboardStats>({
    totalPatients: 15420,
    activeWorkers: 12890,
    todayAppointments: 247,
    criticalCases: 12,
    newRegistrations: 89,
    completedCheckups: 156
  })

  const [recentPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Rahul Kumar Singh',
      age: 28,
      gender: 'Male',
      workerId: 'MW-2025-001',
      lastVisit: '2025-09-20',
      status: 'Stable',
      condition: 'Routine Checkup',
      contactNumber: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Amit Sharma',
      age: 34,
      gender: 'Male',
      workerId: 'MW-2025-002',
      lastVisit: '2025-09-19',
      status: 'Critical',
      condition: 'Hypertension',
      contactNumber: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'Suresh Babu',
      age: 31,
      gender: 'Male',
      workerId: 'MW-2025-003',
      lastVisit: '2025-09-18',
      status: 'Active',
      condition: 'Diabetes Follow-up',
      contactNumber: '+91 98765 43212'
    },
    {
      id: '4',
      name: 'Mohammad Ali',
      age: 26,
      gender: 'Male',
      workerId: 'MW-2025-004',
      lastVisit: '2025-09-17',
      status: 'Stable',
      condition: 'Vaccination',
      contactNumber: '+91 98765 43213'
    }
  ])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    router.push('/auth/admin/login')
  }

  const handlePatientClick = (patientId: string) => {
    router.push(`/auth/admin/patients/${patientId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200'
      case 'Active': return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'Stable': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">MigrantCare Admin</h1>
                <p className="text-xs text-slate-500">Hospital Management Portal</p>
              </div>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Bot className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => router.push('/auth/admin/settings')}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.totalPatients.toLocaleString()}</h3>
            <p className="text-slate-600 text-sm font-medium">Total Patients</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-emerald-700" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.activeWorkers.toLocaleString()}</h3>
            <p className="text-slate-600 text-sm font-medium">Active Workers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-700" />
              </div>
              <Clock className="h-4 w-4 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.todayAppointments}</h3>
            <p className="text-slate-600 text-sm font-medium">Today&aposs Appointments</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-700" />
              </div>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.criticalCases}</h3>
            <p className="text-slate-600 text-sm font-medium">Critical Cases</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Plus className="h-6 w-6 text-purple-700" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.newRegistrations}</h3>
            <p className="text-slate-600 text-sm font-medium">New Today</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-teal-100 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-teal-700" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stats.completedCheckups}</h3>
            <p className="text-slate-600 text-sm font-medium">Checkups Done</p>
          </div>
        </div>

        {/* Health Insights */}
        <div className="mb-8">
          <HealthInsightsPanel 
            patientData={{
              vitals: [
                { bloodPressure: '135/85', weight: 70, date: '2025-09-20' },
                { bloodPressure: '130/80', weight: 69, date: '2025-08-15' }
              ],
              appointments: recentPatients.map(p => ({ date: p.lastVisit, type: 'checkup' })),
              medications: []
            }}
          />
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Recent Patient Records</h2>
                <p className="text-slate-600">Latest patient visits and health status</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => router.push('/auth/admin/patients')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Worker ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Visit</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Condition</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-all"
                      onClick={() => handlePatientClick(patient.id)}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-slate-900">{patient.name}</p>
                          <p className="text-sm text-slate-600">{patient.age} years • {patient.gender}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-slate-700">{patient.workerId}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-700">{patient.lastVisit}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-700">{patient.condition}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-slate-400 mr-2" />
                          <span className="text-sm text-slate-600">{patient.contactNumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePatientClick(patient.id)
                            }}
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle edit
                            }}
                            className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* AI Chat Widget */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={{ userType: 'admin', dashboard: true }}
      />
    </div>
  )
}
