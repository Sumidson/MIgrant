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

  // Patient information
  const patientInfo: PatientInfo = {
    name: "John Smith",
    patientId: "PT-2025-001",
    dateOfBirth: "1988-03-15",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Eggs"]
  };

  // Vaccination records
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
      case 'in-progress': return 'text-slate-700 bg-slate-100 border-slate-200';
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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 font-['Inter',system-ui,sans-serif]">
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
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-stone-600 rounded-2xl flex items-center justify-center shadow-md mr-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Vaccination Records</h1>
                  <p className="text-slate-700 text-lg">Track your immunization history and upcoming vaccines</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid md:grid-cols-4 gap-6 p-6 bg-gradient-to-r from-slate-100 to-stone-100 rounded-2xl border border-slate-200">
              <div className="flex items-center">
                <User className="w-5 h-5 text-slate-700 mr-3" />
                <div>
                  <p className="text-sm text-slate-700 font-medium">Patient Name</p>
                  <p className="font-bold text-slate-800">{patientInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-slate-700 mr-3" />
                <div>
                  <p className="text-sm text-slate-700 font-medium">Patient ID</p>
                  <p className="font-bold text-slate-800">{patientInfo.patientId}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-slate-700 mr-3" />
                <div>
                  <p className="text-sm text-slate-700 font-medium">Date of Birth</p>
                  <p className="font-bold text-slate-800">{new Date(patientInfo.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-slate-700 mr-3" />
                <div>
                  <p className="text-sm text-slate-700 font-medium">Blood Group</p>
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
                color: 'from-slate-600 to-slate-700',
                bgColor: 'from-slate-50 to-slate-100'
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
                color: 'from-amber-600 to-amber-700',
                bgColor: 'from-amber-50 to-amber-100'
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
                      ? 'text-slate-700 border-b-2 border-slate-700 bg-slate-100'
                      : 'text-slate-700 hover:text-slate-800 hover:bg-slate-50'
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
                      <p className="text-slate-700">Click on any vaccine for detailed information</p>
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
                            className="p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedVaccine(vaccine)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-stone-100 rounded-xl flex items-center justify-center mr-4">
                                  <Syringe className="w-6 h-6 text-slate-700" />
                                </div>
                                <div>
                                  <h4 className="text-lg font-bold text-slate-800">{vaccine.name}</h4>
                                  <p className="text-slate-700 text-sm">{vaccine.description}</p>
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
                            
                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">
                                  Doses: {vaccine.dosesTaken} of {vaccine.totalDoses}
                                </span>
                                <span className="text-sm font-medium text-slate-700">{progress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-slate-600 to-stone-600 h-2 rounded-full transition-all duration-500"
                                  style={{width: `${progress}%`}}
                                ></div>
                              </div>
                            </div>

                            {/* Next Dose Info */}
                            {vaccine.nextDoseDate && (
                              <div className="flex items-center text-sm">
                                {daysUntilNext !== null && (
                                  <>
                                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                                    <span className={`${
                                      daysUntilNext < 0 ? 'text-rose-700 font-medium' : 
                                      daysUntilNext <= 30 ? 'text-amber-700 font-medium' : 
                                      'text-slate-700'
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

                    {/* Book Vaccination Button */}
                    <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-100 to-stone-100">
                      <motion.button
                        onClick={handleBookVaccination}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-slate-700 to-stone-700 hover:from-slate-800 hover:to-stone-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-md hover:shadow-md flex items-center justify-center space-x-3"
                      >
                        <Syringe className="w-5 h-5" />
                        <span>Book Vaccination Appointment</span>
                        <Calendar className="w-5 h-5" />
                      </motion.button>
                      <p className="text-center text-slate-700 text-sm mt-3">
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
                            <div key={vaccine.id} className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-slate-800 text-sm">{vaccine.name}</p>
                                  <p className="text-xs text-slate-700">Dose {vaccine.dosesTaken + 1} of {vaccine.totalDoses}</p>
                                </div>
                                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
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
                                  <p className="font-medium text-slate-800 text-sm">{vaccine.name}</p>
                                  <p className="text-xs text-slate-700">
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

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Vaccination Schedule</h3>
                <div className="space-y-6">
                  {vaccineRecords
                    .filter(v => v.nextDoseDate)
                    .sort((a, b) => new Date(a.nextDoseDate!).getTime() - new Date(b.nextDoseDate!).getTime())
                    .map((vaccine, index) => {
                      const days = getDaysUntilNextDose(vaccine.nextDoseDate!);
                      return (
                        <div key={vaccine.id} className="flex items-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-slate-100 to-stone-100 rounded-xl flex items-center justify-center mr-6">
                            <Calendar className="w-8 h-8 text-slate-700" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-lg font-bold text-slate-800 mb-1">{vaccine.name}</h4>
                            <p className="text-slate-700 mb-2">Dose {vaccine.dosesTaken + 1} of {vaccine.totalDoses}</p>
                            <p className="text-sm text-slate-600">Due: {new Date(vaccine.nextDoseDate!).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-4 py-2 rounded-lg font-medium text-sm ${
                              days < 0 ? 'bg-rose-100 text-rose-800' :
                              days <= 30 ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days remaining`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Vaccination History</h3>
                <div className="space-y-8">
                  {vaccineRecords.map((vaccine) => (
                    <div key={vaccine.id} className="border-l-4 border-slate-300 pl-6">
                      <h4 className="text-lg font-bold text-slate-800 mb-3">{vaccine.name}</h4>
                      <div className="space-y-3">
                        {vaccine.doses.map((dose, index) => (
                          <div key={index} className="bg-slate-50 rounded-lg p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-slate-700 mb-1">Dose {dose.doseNumber}</p>
                                <p className="font-medium text-slate-800">{new Date(dose.dateAdministered).toLocaleDateString()}</p>
                                <p className="text-sm text-slate-700">{dose.location}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-700 mb-1">Administered by</p>
                                <p className="font-medium text-slate-800">{dose.administeredBy}</p>
                                <p className="text-sm text-slate-700">Lot: {dose.lotNumber}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Detailed Vaccine Modal */}
          {selectedVaccine && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-slate-200"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-slate-100 to-stone-100 rounded-2xl flex items-center justify-center mr-4">
                        <Syringe className="w-8 w-8 text-slate-700" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">{selectedVaccine.name}</h2>
                        <p className="text-slate-700">{selectedVaccine.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedVaccine(null)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-slate-600" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Vaccine Information */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Vaccine Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-700">Category:</span>
                            <span className="font-medium text-slate-800">{selectedVaccine.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Priority:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedVaccine.priority)}`}>
                              {selectedVaccine.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Age Recommendation:</span>
                            <span className="font-medium text-slate-800">{selectedVaccine.ageRecommendation}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3">Progress</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-700">Doses Completed:</span>
                            <span className="font-medium text-slate-800">{selectedVaccine.dosesTaken} of {selectedVaccine.totalDoses}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-slate-600 to-stone-600 h-3 rounded-full"
                              style={{width: `${calculateProgress(selectedVaccine.dosesTaken, selectedVaccine.totalDoses)}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {selectedVaccine.sideEffects && (
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 mb-3">Reported Side Effects</h3>
                          <div className="space-y-2">
                            {selectedVaccine.sideEffects.map((effect, index) => (
                              <div key={index} className="flex items-center">
                                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
                                <span className="text-slate-700 text-sm">{effect}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dose History */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-3">Dose History</h3>
                      <div className="space-y-4">
                        {selectedVaccine.doses.map((dose, index) => (
                          <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-slate-800">Dose {dose.doseNumber}</span>
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="text-slate-700">Date: <span className="font-medium text-slate-800">{new Date(dose.dateAdministered).toLocaleDateString()}</span></p>
                              <p className="text-slate-700">Location: <span className="font-medium text-slate-800">{dose.location}</span></p>
                              <p className="text-slate-700">Provider: <span className="font-medium text-slate-800">{dose.administeredBy}</span></p>
                              <p className="text-slate-700">Lot Number: <span className="font-medium text-slate-800">{dose.lotNumber}</span></p>
                            </div>
                          </div>
                        ))}
                        
                        {selectedVaccine.dosesTaken < selectedVaccine.totalDoses && (
                          <div className="bg-slate-100 rounded-lg p-4 border border-slate-200 border-dashed">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-slate-800">Next Dose {selectedVaccine.dosesTaken + 1}</span>
                              <Clock className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className="text-slate-700">Scheduled: <span className="font-medium text-slate-800">
                                {selectedVaccine.nextDoseDate ? new Date(selectedVaccine.nextDoseDate).toLocaleDateString() : 'Not scheduled'}
                              </span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
