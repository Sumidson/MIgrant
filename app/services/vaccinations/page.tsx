"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { 
  Shield,
  CheckCircle,
  Clock,
  Calendar,
  Syringe,
  AlertTriangle,
  Download,
  Printer,
  Plus,
  User,
  FileText,
  Bell,
  TrendingUp,
  Activity,
  Heart,
  Award,
  X
} from 'lucide-react';

interface VaccineDose {
  doseNumber: number;
  dateAdministered: string;
  location: string;
  administeredBy: string;
  lotNumber: string;
  nextDueDays?: number;
}

interface VaccineRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  dosesTaken: number;
  totalDoses: number;
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming';
  nextDoseDate?: string;
  lastDoseDate?: string;
  doses: VaccineDose[];
  priority: 'high' | 'medium' | 'low';
  ageRecommendation: string;
  sideEffects?: string[];
}

interface PatientInfo {
  name: string;
  patientId: string;
  dateOfBirth: string;
  bloodGroup: string;
  allergies: string[];
}

export default function VaccinationRecordsPage() {
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineRecord | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  const patientInfo: PatientInfo = {
    name: "John Smith",
    patientId: "PT-2025-001",
    dateOfBirth: "1988-03-15",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Eggs"]
  };

  const vaccineRecords: VaccineRecord[] = [
    {
      id: 'covid19',
      name: 'COVID-19 Vaccine',
      category: 'Viral',
      description: 'mRNA vaccine for COVID-19 prevention',
      dosesTaken: 2,
      totalDoses: 3,
      status: 'in-progress',
      lastDoseDate: '2025-07-10',
      nextDoseDate: '2025-10-10',
      priority: 'high',
      ageRecommendation: 'All ages 6 months+',
      doses: [
        {
          doseNumber: 1,
          dateAdministered: '2025-04-10',
          location: 'Kochi Medical Center',
          administeredBy: 'Dr. Sarah Johnson',
          lotNumber: 'COV2025041001',
          nextDueDays: 91
        },
        {
          doseNumber: 2,
          dateAdministered: '2025-07-10',
          location: 'Kochi Medical Center',
          administeredBy: 'Dr. Michael Brown',
          lotNumber: 'COV2025071002',
          nextDueDays: 183
        }
      ],
      sideEffects: ['Mild arm pain', 'Fatigue for 24 hours']
    },
    {
      id: 'hepatitisb',
      name: 'Hepatitis B Vaccine',
      category: 'Viral',
      description: 'Vaccine to prevent Hepatitis B infection',
      dosesTaken: 3,
      totalDoses: 3,
      status: 'completed',
      lastDoseDate: '2024-12-05',
      priority: 'medium',
      ageRecommendation: 'All ages',
      doses: [
        {
          doseNumber: 1,
          dateAdministered: '2024-06-05',
          location: 'Community Health Center',
          administeredBy: 'Nurse Mary Wilson',
          lotNumber: 'HEP2024060501'
        },
        {
          doseNumber: 2,
          dateAdministered: '2024-09-05',
          location: 'Community Health Center',
          administeredBy: 'Nurse Mary Wilson',
          lotNumber: 'HEP2024090502'
        },
        {
          doseNumber: 3,
          dateAdministered: '2024-12-05',
          location: 'Community Health Center',
          administeredBy: 'Dr. Emily Davis',
          lotNumber: 'HEP2024120503'
        }
      ]
    },
    {
      id: 'influenza',
      name: 'Influenza Vaccine',
      category: 'Viral',
      description: 'Annual flu vaccine for seasonal protection',
      dosesTaken: 0,
      totalDoses: 1,
      status: 'upcoming',
      nextDoseDate: '2025-11-01',
      priority: 'medium',
      ageRecommendation: 'All ages 6 months+',
      doses: []
    },
    {
      id: 'tetanus',
      name: 'Tetanus Vaccine',
      category: 'Bacterial',
      description: 'Tetanus toxoid vaccine for wound prevention',
      dosesTaken: 1,
      totalDoses: 1,
      status: 'overdue',
      lastDoseDate: '2020-05-15',
      nextDoseDate: '2025-05-15',
      priority: 'high',
      ageRecommendation: 'Every 10 years',
      doses: [
        {
          doseNumber: 1,
          dateAdministered: '2020-05-15',
          location: 'District Hospital',
          administeredBy: 'Dr. Robert Kumar',
          lotNumber: 'TET2020051501'
        }
      ]
    },
    {
      id: 'typhoid',
      name: 'Typhoid Vaccine',
      category: 'Bacterial',
      description: 'Vaccine for typhoid fever prevention',
      dosesTaken: 1,
      totalDoses: 1,
      status: 'completed',
      lastDoseDate: '2023-08-20',
      priority: 'low',
      ageRecommendation: 'Travel/high-risk areas',
      doses: [
        {
          doseNumber: 1,
          dateAdministered: '2023-08-20',
          location: 'Travel Clinic',
          administeredBy: 'Dr. Priya Nair',
          lotNumber: 'TYP2023082001'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'upcoming': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'overdue': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'in-progress': return <Clock className="w-5 h-5" />;
      case 'upcoming': return <Calendar className="w-5 h-5" />;
      case 'overdue': return <AlertTriangle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-rose-700 bg-rose-100';
      case 'medium': return 'text-amber-700 bg-amber-100';
      case 'low': return 'text-emerald-700 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateProgress = (dosesTaken: number, totalDoses: number) => {
    if (totalDoses === 0) return 0;
    return Math.round((dosesTaken / totalDoses) * 100);
  };

  const getDaysUntilNextDose = (nextDate: string) => {
    const today = new Date();
    const next = new Date(nextDate);
    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
  };

  const handleBookVaccination = () => {
    router.push('/services/vaccinations/booking');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-['Inter',system-ui,sans-serif]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 lg:px-8 py-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-md mr-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Vaccination Records</h1>
                  <p className="text-slate-600 text-lg">Track your immunization history and upcoming vaccines</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 text-blue-700 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium transition-all shadow-sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid md:grid-cols-4 gap-6 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Patient Name</p>
                  <p className="font-bold text-slate-800">{patientInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Patient ID</p>
                  <p className="font-bold text-slate-800">{patientInfo.patientId}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Date of Birth</p>
                  <p className="font-bold text-slate-800">{new Date(patientInfo.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600 font-medium">Blood Group</p>
                  <p className="font-bold text-slate-800">{patientInfo.bloodGroup}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                label: 'Total Vaccines', 
                value: vaccineRecords.length, 
                icon: <Shield className="w-6 h-6" />, 
                color: 'from-blue-600 to-blue-700',
                bgColor: 'from-blue-50 to-blue-100'
              },
              { 
                label: 'Completed', 
                value: vaccineRecords.filter(v => v.status === 'completed').length, 
                icon: <CheckCircle className="w-6 h-6" />, 
                color: 'from-emerald-600 to-emerald-700',
                bgColor: 'from-emerald-50 to-emerald-100'
              },
              { 
                label: 'In Progress', 
                value: vaccineRecords.filter(v => v.status === 'in-progress').length, 
                icon: <Clock className="w-6 h-6" />, 
                color: 'from-slate-600 to-slate-700',
                bgColor: 'from-slate-50 to-slate-100'
              },
              { 
                label: 'Overdue', 
                value: vaccineRecords.filter(v => v.status === 'overdue').length, 
                icon: <AlertTriangle className="w-6 h-6" />, 
                color: 'from-rose-600 to-rose-700',
                bgColor: 'from-rose-50 to-rose-100'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-slate-700 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-slate-200 mb-8">
            <div className="flex border-b border-slate-200">
              {[
                { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
                { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
                { id: 'history', label: 'History', icon: <FileText className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Vaccination List */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                      <h3 className="text-xl font-bold text-slate-800">Your Vaccines</h3>
                      <p className="text-slate-600">Click on any vaccine for detailed information</p>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {vaccineRecords.map((vaccine, index) => {
                        const progress = calculateProgress(vaccine.dosesTaken, vaccine.totalDoses);
                        const daysUntilNext = vaccine.nextDoseDate ? getDaysUntilNextDose(vaccine.nextDoseDate) : null;
                        
                        return (
                          <motion.div
                            key={vaccine.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 hover:bg-blue-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedVaccine(vaccine)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
                                  <Syringe className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-slate-800">{vaccine.name}</h4>
                                  <p className="text-slate-600 text-sm">{vaccine.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(vaccine.priority)}`}>
                                  {vaccine.priority.toUpperCase()}
                                </span>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vaccine.status)}`}>
                                  {getStatusIcon(vaccine.status)}
                                  <span className="ml-2 capitalize">{vaccine.status.replace('-', ' ')}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-600">
                                  Doses: {vaccine.dosesTaken} of {vaccine.totalDoses}
                                </span>
                                <span className="text-sm font-medium text-slate-600">{progress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                                  style={{width: `${progress}%`}}
                                ></div>
                              </div>
                            </div>

                            {vaccine.nextDoseDate && (
                              <div className="flex items-center text-sm">
                                {daysUntilNext !== null && (
                                  <>
                                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                                    <span className={`${
                                      daysUntilNext < 0 ? 'text-rose-700 font-medium' : 
                                      daysUntilNext <= 30 ? 'text-amber-700 font-medium' : 
                                      'text-slate-600'
                                    }`}>
                                      Next dose: {new Date(vaccine.nextDoseDate).toLocaleDateString()}
                                      {daysUntilNext < 0 && ` (${Math.abs(daysUntilNext)} days overdue)`}
                                      {daysUntilNext >= 0 && ` (${daysUntilNext} days remaining)`}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="p-6 border-t border-slate-200 bg-slate-50">
                      <motion.button
                        onClick={handleBookVaccination}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                      >
                        <Syringe className="w-5 h-5" />
                        <span>Book Vaccination Appointment</span>
                        <Calendar className="w-5 h-5" />
                      </motion.button>
                      <p className="text-center text-slate-600 text-sm mt-3">
                        Schedule your next vaccination at a convenient time and location
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar - Upcoming & Alerts */}
                <div className="space-y-6">
                  {/* Upcoming Vaccines */}
                  <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-amber-600" />
                      Upcoming Vaccines
                    </h3>
                    <div className="space-y-3">
                      {vaccineRecords
                        .filter(v => v.nextDoseDate && getDaysUntilNextDose(v.nextDoseDate) >= 0)
                        .sort((a, b) => getDaysUntilNextDose(a.nextDoseDate!) - getDaysUntilNextDose(b.nextDoseDate!))
                        .slice(0, 3)
                        .map((vaccine) => {
                          const days = getDaysUntilNextDose(vaccine.nextDoseDate!);
                          return (
                            <div key={vaccine.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-slate-800 text-sm">{vaccine.name}</p>
                                  <p className="text-xs text-slate-600">Dose {vaccine.dosesTaken + 1} of {vaccine.totalDoses}</p>
                                </div>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                  {days} days
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Overdue Vaccines */}
                  {vaccineRecords.filter(v => v.status === 'overdue').length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-rose-600" />
                        Overdue Vaccines
                      </h3>
                      <div className="space-y-3">
                        {vaccineRecords
                          .filter(v => v.status === 'overdue')
                          .map((vaccine) => (
                            <div key={vaccine.id} className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-rose-800 text-sm">{vaccine.name}</p>
                                  <p className="text-xs text-rose-700">
                                    Due: {vaccine.nextDoseDate && new Date(vaccine.nextDoseDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <span className="text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full">
                                  Overdue
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Patient Allergies */}
                  <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                      Known Allergies
                    </h3>
                    <div className="space-y-2">
                      {patientInfo.allergies.map((allergy, index) => (
                        <span key={index} className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Other tabs content here */}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}