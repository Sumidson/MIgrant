'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  Users,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Shield,
  ArrowLeft,
  SortAsc,
  SortDesc,
  RefreshCw
} from 'lucide-react'

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  workerId: string;
  company: string;
  location: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'Active' | 'Critical' | 'Stable' | 'Inactive';
  condition: string;
  contactNumber: string;
  email: string;
  bloodGroup: string;
  emergencyContact: string;
}

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const itemsPerPage = 10

  // Mock data - replace with real API
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Rahul Kumar Singh',
        age: 28,
        gender: 'Male',
        workerId: 'MW-2025-001',
        company: 'Tech Solutions Pvt Ltd',
        location: 'Kochi',
        lastVisit: '2025-09-20',
        nextAppointment: '2025-10-20',
        status: 'Stable',
        condition: 'Routine Checkup',
        contactNumber: '+91 98765 43210',
        email: 'rahul.singh@email.com',
        bloodGroup: 'O+',
        emergencyContact: '+91 98765 43200'
      },
      {
        id: '2',
        name: 'Amit Sharma',
        age: 34,
        gender: 'Male',
        workerId: 'MW-2025-002',
        company: 'Construction Corp',
        location: 'Thiruvananthapuram',
        lastVisit: '2025-09-19',
        nextAppointment: '2025-09-26',
        status: 'Critical',
        condition: 'Hypertension',
        contactNumber: '+91 98765 43211',
        email: 'amit.sharma@email.com',
        bloodGroup: 'B+',
        emergencyContact: '+91 98765 43201'
      },
      // Add more mock patients...
      {
        id: '3',
        name: 'Suresh Babu',
        age: 31,
        gender: 'Male',
        workerId: 'MW-2025-003',
        company: 'Manufacturing Ltd',
        location: 'Kozhikode',
        lastVisit: '2025-09-18',
        nextAppointment: '2025-10-18',
        status: 'Active',
        condition: 'Diabetes Follow-up',
        contactNumber: '+91 98765 43212',
        email: 'suresh.babu@email.com',
        bloodGroup: 'A+',
        emergencyContact: '+91 98765 43202'
      },
      {
        id: '4',
        name: 'Mohammad Ali',
        age: 26,
        gender: 'Male',
        workerId: 'MW-2025-004',
        company: 'Service Industries',
        location: 'Thrissur',
        lastVisit: '2025-09-17',
        nextAppointment: '2025-10-17',
        status: 'Stable',
        condition: 'Vaccination',
        contactNumber: '+91 98765 43213',
        email: 'mohammad.ali@email.com',
        bloodGroup: 'AB+',
        emergencyContact: '+91 98765 43203'
      }
    ]

    setTimeout(() => {
      setPatients(mockPatients)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200'
      case 'Active': return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'Stable': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Inactive': return 'text-slate-700 bg-slate-50 border-slate-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || patient.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const aValue = a[sortBy as keyof Patient]
    const bValue = b[sortBy as keyof Patient]
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage)
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-slate-600">Loading patient records...</p>
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Patient Records</h1>
                  <p className="text-xs text-slate-500">Comprehensive patient management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, Worker ID, or company..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="stable">Stable</option>
                  <option value="critical">Critical</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                Showing {paginatedPatients.length} of {filteredPatients.length} patients
              </span>
              <button
                onClick={() => setIsLoading(true)}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Patient Details</span>
                      {sortBy === 'name' && (
                        sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all"
                    onClick={() => handleSort('workerId')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Worker ID</span>
                      {sortBy === 'workerId' && (
                        sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Company & Location</th>
                  <th 
                    className="text-left py-4 px-6 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all"
                    onClick={() => handleSort('lastVisit')}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Last Visit</span>
                      {sortBy === 'lastVisit' && (
                        sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-all"
                    onClick={() => router.push(`/admin/patients/${patient.id}`)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-100 to-emerald-100 p-2 rounded-xl">
                          <Users className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{patient.name}</p>
                          <p className="text-sm text-slate-600">{patient.age} years • {patient.gender} • {patient.bloodGroup}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {patient.workerId}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900">{patient.company}</p>
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {patient.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-slate-900">{patient.lastVisit}</p>
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Next: {patient.nextAppointment}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                        <p className="text-xs text-slate-600 mt-1">{patient.condition}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 text-slate-400 mr-2" />
                          <span className="text-slate-600">{patient.contactNumber}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FileText className="h-3 w-3 text-slate-400 mr-2" />
                          <span className="text-slate-600 truncate">{patient.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/admin/patients/${patient.id}`)
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
