'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Building,
  Heart,
  Activity,
  FileText,
  Download,
  Edit,
  Plus,
  Shield,
  AlertTriangle,
  Clock,
  Stethoscope,
  Pill,
  TestTube,
  UserCheck,
  Users,
  Bot
} from 'lucide-react'
import AIChatWidget from '@/ai/components/AIChatWidget'
import SymptomAnalyzer from '@/ai/components/SymptomAnalyzer'
import HealthInsightsPanel from '@/ai/components/HealthInsightsPanel'

interface PatientDetails {
  id: string;
  name: string;
  age: number;
  gender: string;
  dateOfBirth: string;
  workerId: string;
  company: string;
  location: string;
  address: string;
  contactNumber: string;
  email: string;
  emergencyContact: string;
  bloodGroup: string;
  status: 'Active' | 'Critical' | 'Stable' | 'Inactive';
  registrationDate: string;
  lastVisit: string;
  nextAppointment: string;
  currentCondition: string;
  allergies: string[];
  chronicConditions: string[];
}

interface MedicalRecord {
  id: string;
  date: string;
  type: 'Consultation' | 'Lab Test' | 'Vaccination' | 'Checkup' | 'Emergency';
  description: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  status: 'Completed' | 'Pending' | 'Follow-up Required';
}

interface VitalSigns {
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  bmi: number;
}

export default function PatientDetails() {
  const router = useRouter()
  const { id } = useParams()
  const [patient, setPatient] = useState<PatientDetails | null>(null)
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [vitals, setVitals] = useState<VitalSigns[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'medical' | 'vitals' | 'documents' | 'ai-analysis'>('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    // Mock data - replace with real API calls
    const mockPatient: PatientDetails = {
      id: id as string,
      name: 'Rahul Kumar Singh',
      age: 28,
      gender: 'Male',
      dateOfBirth: '1997-03-15',
      workerId: 'MW-2025-001',
      company: 'Tech Solutions Pvt Ltd',
      location: 'Kochi',
      address: '123 Workers Colony, Kochi, Kerala - 682001',
      contactNumber: '+91 98765 43210',
      email: 'rahul.singh@email.com',
      emergencyContact: '+91 98765 43200',
      bloodGroup: 'O+',
      status: 'Stable',
      registrationDate: '2025-01-15',
      lastVisit: '2025-09-20',
      nextAppointment: '2025-10-20',
      currentCondition: 'Routine Health Monitoring',
      allergies: ['Penicillin', 'Dust mites'],
      chronicConditions: ['Mild Hypertension']
    }

    const mockMedicalRecords: MedicalRecord[] = [
      {
        id: '1',
        date: '2025-09-20',
        type: 'Consultation',
        description: 'Routine health checkup and blood pressure monitoring',
        doctor: 'Dr. Priya Nair',
        diagnosis: 'Mild elevation in blood pressure, otherwise healthy',
        treatment: 'Lifestyle modifications, diet counseling',
        medications: ['Amlodipine 5mg', 'Multivitamin'],
        notes: 'Patient advised to reduce salt intake and increase physical activity',
        status: 'Completed'
      },
      {
        id: '2',
        date: '2025-08-15',
        type: 'Lab Test',
        description: 'Complete Blood Count, Lipid Profile, Blood Sugar',
        doctor: 'Dr. Suresh Kumar',
        diagnosis: 'All parameters within normal range',
        treatment: 'Continue current lifestyle',
        medications: [],
        notes: 'Annual health screening completed successfully',
        status: 'Completed'
      },
      {
        id: '3',
        date: '2025-07-10',
        type: 'Vaccination',
        description: 'Hepatitis B booster dose',
        doctor: 'Nurse Sarah Thomas',
        diagnosis: 'Vaccination administered successfully',
        treatment: 'Monitor for any adverse reactions',
        medications: ['Hepatitis B vaccine'],
        notes: 'No immediate adverse reactions observed',
        status: 'Completed'
      }
    ]

    const mockVitals: VitalSigns[] = [
      {
        date: '2025-09-20',
        bloodPressure: '135/85',
        heartRate: 72,
        temperature: 98.6,
        weight: 70,
        height: 175,
        bmi: 22.9
      },
      {
        date: '2025-08-15',
        bloodPressure: '130/80',
        heartRate: 68,
        temperature: 98.4,
        weight: 69,
        height: 175,
        bmi: 22.5
      }
    ]

    setTimeout(() => {
      setPatient(mockPatient)
      setMedicalRecords(mockMedicalRecords)
      setVitals(mockVitals)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-700 bg-red-50 border-red-200'
      case 'Active': return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'Stable': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Inactive': return 'text-slate-700 bg-slate-50 border-slate-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'Emergency': return 'text-red-700 bg-red-50 border-red-200'
      case 'Lab Test': return 'text-purple-700 bg-purple-50 border-purple-200'
      case 'Vaccination': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'Consultation': return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'Checkup': return 'text-orange-700 bg-orange-50 border-orange-200'
      default: return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-slate-600">Loading patient details...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Patient Not Found</h2>
          <p className="text-slate-600 mb-4">The requested patient record could not be found.</p>
          <button
            onClick={() => router.push('/admin/patients')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Patients List
          </button>
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
                onClick={() => router.push('/admin/patients')}
                className="flex items-center px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patients
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                  <p className="text-xs text-slate-500">Patient ID: {patient.workerId}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </button>
              <button className="flex items-center px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                <Download className="h-4 w-4 mr-2" />
                Export Record
              </button>
              <button className="flex items-center px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Edit className="h-4 w-4 mr-2" />
                Edit Patient
              </button>
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Patient Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Patient Photo & Basic Info */}
            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-br from-blue-100 to-emerald-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                <User className="h-12 w-12 text-blue-700" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{patient.name}</h2>
              <div className="space-y-1 text-sm text-slate-600">
                <p>{patient.age} years • {patient.gender}</p>
                <p>Blood Group: <span className="font-semibold text-slate-800">{patient.bloodGroup}</span></p>
                <div className="pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">{patient.contactNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">{patient.email}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-slate-400 mr-3 mt-0.5" />
                  <span className="text-slate-700">{patient.address}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">Emergency: {patient.emergencyContact}</span>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Work Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700 font-mono bg-slate-100 px-2 py-1 rounded">{patient.workerId}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">{patient.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">{patient.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">Registered: {patient.registrationDate}</span>
                </div>
              </div>
            </div>

            {/* Health Summary */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Health Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                  <span className="text-slate-700">Next: {patient.nextAppointment}</span>
                </div>
                <div className="flex items-start">
                  <Heart className="h-4 w-4 text-slate-400 mr-3 mt-0.5" />
                  <span className="text-slate-700">{patient.currentCondition}</span>
                </div>
                {patient.allergies.length > 0 && (
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-400 mr-3 mt-0.5" />
                    <div>
                      <span className="text-slate-700 font-medium">Allergies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patient.allergies.map((allergy, index) => (
                          <span key={index} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-200">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: Activity },
                { key: 'medical', label: 'Medical Records', icon: FileText },
                { key: 'vitals', label: 'Vital Signs', icon: Heart },
                { key: 'ai-analysis', label: 'AI Analysis', icon: Bot },
                { key: 'documents', label: 'Documents', icon: Download }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'overview' | 'medical' | 'vitals' | 'ai-analysis' | 'documents')}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-all ${
                      activeTab === tab.key
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {medicalRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="bg-white p-2 rounded-lg mr-3">
                              {record.type === 'Consultation' && <Stethoscope className="h-4 w-4 text-blue-600" />}
                              {record.type === 'Lab Test' && <TestTube className="h-4 w-4 text-purple-600" />}
                              {record.type === 'Vaccination' && <Shield className="h-4 w-4 text-emerald-600" />}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{record.type}</h4>
                              <p className="text-sm text-slate-600">{record.date}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRecordTypeColor(record.type)}`}>
                            {record.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{record.description}</p>
                        <p className="text-xs text-slate-600">Dr. {record.doctor}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Metrics */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Latest Health Metrics</h3>
                  {vitals.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <Heart className="h-5 w-5 text-red-600" />
                          <span className="text-xs text-red-600 font-medium">{vitals[0].date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">{vitals[0].bloodPressure}</h4>
                        <p className="text-sm text-red-700">Blood Pressure</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <span className="text-xs text-blue-600 font-medium">{vitals[0].date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">{vitals[0].heartRate} BPM</h4>
                        <p className="text-sm text-blue-700">Heart Rate</p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                        <div className="flex items-center justify-between mb-2">
                          <User className="h-5 w-5 text-emerald-600" />
                          <span className="text-xs text-emerald-600 font-medium">{vitals[0].date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">{vitals[0].weight} kg</h4>
                        <p className="text-sm text-emerald-700">Weight</p>
                      </div>

                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <Activity className="h-5 w-5 text-orange-600" />
                          <span className="text-xs text-orange-600 font-medium">{vitals[0].date}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">{vitals[0].bmi}</h4>
                        <p className="text-sm text-orange-700">BMI</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Analysis Tab */}
            {activeTab === 'ai-analysis' && (
              <div className="space-y-6">
                <SymptomAnalyzer 
                  patientAge={patient.age}
                  patientGender={patient.gender}
                />
                <HealthInsightsPanel 
                  patientData={{
                    vitals,
                    appointments: medicalRecords,
                    medications: medicalRecords.flatMap(r => r.medications)
                  }}
                />
              </div>
            )}

            {/* Medical Records Tab */}
            {activeTab === 'medical' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Complete Medical History</h3>
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Record
                  </button>
                </div>
                
                <div className="space-y-6">
                  {medicalRecords.map((record) => (
                    <div key={record.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-white p-3 rounded-xl mr-4 shadow-sm">
                            {record.type === 'Consultation' && <Stethoscope className="h-6 w-6 text-blue-600" />}
                            {record.type === 'Lab Test' && <TestTube className="h-6 w-6 text-purple-600" />}
                            {record.type === 'Vaccination' && <Shield className="h-6 w-6 text-emerald-600" />}
                            {record.type === 'Checkup' && <Heart className="h-6 w-6 text-orange-600" />}
                            {record.type === 'Emergency' && <AlertTriangle className="h-6 w-6 text-red-600" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{record.type}</h4>
                            <p className="text-slate-600">{record.date} • Dr. {record.doctor}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRecordTypeColor(record.type)}`}>
                          {record.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-2">Description & Diagnosis</h5>
                          <p className="text-slate-700 mb-3">{record.description}</p>
                          <p className="text-slate-800 font-medium">{record.diagnosis}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-slate-900 mb-2">Treatment & Medications</h5>
                          <p className="text-slate-700 mb-3">{record.treatment}</p>
                          {record.medications.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-slate-800 mb-2">Prescribed Medications:</p>
                              <div className="flex flex-wrap gap-2">
                                {record.medications.map((med, index) => (
                                  <span key={index} className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-300">
                                    <Pill className="h-3 w-3 inline mr-1" />
                                    {med}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {record.notes && (
                        <div className="mt-4 pt-4 border-t border-slate-300">
                          <h5 className="font-semibold text-slate-900 mb-2">Additional Notes</h5>
                          <p className="text-slate-700 italic">{record.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vitals Tab */}
            {activeTab === 'vitals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Vital Signs History</h3>
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Record New Vitals
                  </button>
                </div>

                <div className="space-y-6">
                  {vitals.map((vital, index) => (
                    <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-slate-900 text-lg">{vital.date}</h4>
                        <span className="text-sm text-slate-600">Recorded by medical staff</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Heart className="h-5 w-5 text-red-600" />
                            <span className="text-xs text-slate-500">mmHg</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.bloodPressure}</h5>
                          <p className="text-sm text-slate-600">Blood Pressure</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            <span className="text-xs text-slate-500">BPM</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.heartRate}</h5>
                          <p className="text-sm text-slate-600">Heart Rate</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Activity className="h-5 w-5 text-orange-600" />
                            <span className="text-xs text-slate-500">°F</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.temperature}</h5>
                          <p className="text-sm text-slate-600">Temperature</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <User className="h-5 w-5 text-emerald-600" />
                            <span className="text-xs text-slate-500">kg</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.weight}</h5>
                          <p className="text-sm text-slate-600">Weight</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <User className="h-5 w-5 text-purple-600" />
                            <span className="text-xs text-slate-500">cm</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.height}</h5>
                          <p className="text-sm text-slate-600">Height</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Activity className="h-5 w-5 text-teal-600" />
                            <span className="text-xs text-slate-500">kg/m²</span>
                          </div>
                          <h5 className="font-bold text-slate-900 text-lg">{vital.bmi}</h5>
                          <p className="text-sm text-slate-600">BMI</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Medical Documents</h3>
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Lab Reports - Sept 2025', type: 'PDF', size: '2.3 MB', date: '2025-09-20' },
                    { name: 'X-Ray Chest', type: 'JPG', size: '1.8 MB', date: '2025-08-15' },
                    { name: 'Vaccination Certificate', type: 'PDF', size: '756 KB', date: '2025-07-10' },
                    { name: 'Health Card Copy', type: 'PDF', size: '1.2 MB', date: '2025-01-15' },
                    { name: 'Insurance Documents', type: 'PDF', size: '3.1 MB', date: '2025-01-15' },
                    { name: 'Emergency Contact Form', type: 'PDF', size: '445 KB', date: '2025-01-15' }
                  ].map((doc, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded">{doc.type}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2">{doc.name}</h4>
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{doc.size}</span>
                        <span>{doc.date}</span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-all">
                          View
                        </button>
                        <button className="flex-1 bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm hover:bg-slate-300 transition-all">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        context={{ userType: 'admin', patientId: patient.id, patientName: patient.name }}
      />
    </div>
  )
}
