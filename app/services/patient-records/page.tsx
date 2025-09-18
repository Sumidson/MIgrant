"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText,
  User,
  Calendar,
  Phone,
  Mail,
  Download,
  Printer,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Stethoscope,
  X,
  Droplets,
  Shield,
  Zap,
  TrendingUp,
  Pill,
  AlertTriangle,
  MapPin,
  Settings,
  Bell,
  ChevronRight,
  Eye
} from 'lucide-react';

interface CurrentProblem {
  problem: string;
  value: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  lastUpdated: string;
}

interface PatientData {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  pastTreatments: string[];
  accidents: string[];
  allergies: string[];
  allergicToMedicine: string[];
  chronicDiseases: string[];
  currentProblems: CurrentProblem[];
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  nextAppointment: string;
  condition: string;
  status: 'active' | 'inactive' | 'critical';
  doctor: string;
  emergencyContact: string;
  profileImage: string;
}

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDetails, setShowFullDetails] = useState(false);

  // This would typically come from authentication/session
  const patientData: PatientData = {
    id: '1',
    patientId: 'PT-2025-001',
    name: 'John Smith',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    pastTreatments: [
      'Appendectomy (2020) - Laparoscopic removal',
      'Knee surgery (2018) - Arthroscopic meniscus repair', 
      'Dental root canal (2022) - Molar treatment',
      'Physical therapy (2019) - Post-surgery rehabilitation'
    ],
    accidents: [
      'Minor car accident (2018) - Bruised ribs, no fractures',
      'Workplace fall (2019) - Sprained ankle, 2 weeks recovery'
    ],
    allergies: ['Pollen (seasonal)', 'Dust mites', 'Pet dander'],
    allergicToMedicine: ['Penicillin (severe reaction)', 'Aspirin (stomach irritation)', 'Sulfa drugs (rash)'],
    chronicDiseases: ['Hypertension (Stage 1)', 'Mild asthma'],
    currentProblems: [
      { problem: 'Blood Pressure', value: '145/95 mmHg', status: 'high', lastUpdated: '2025-09-15' },
      { problem: 'Blood Sugar (Fasting)', value: '110 mg/dL', status: 'normal', lastUpdated: '2025-09-15' },
      { problem: 'Total Cholesterol', value: '220 mg/dL', status: 'high', lastUpdated: '2025-09-10' },
      { problem: 'HDL Cholesterol', value: '45 mg/dL', status: 'normal', lastUpdated: '2025-09-10' },
      { problem: 'LDL Cholesterol', value: '150 mg/dL', status: 'high', lastUpdated: '2025-09-10' },
      { problem: 'Weight', value: '85 kg', status: 'normal', lastUpdated: '2025-09-15' },
      { problem: 'Heart Rate', value: '78 bpm', status: 'normal', lastUpdated: '2025-09-15' }
    ],
    phone: '+91 98765 43210',
    email: 'john.smith@email.com',
    address: '123 Main Street, Kochi, Kerala 682001',
    lastVisit: '2025-09-15',
    nextAppointment: '2025-10-15',
    condition: 'Hypertension Management',
    status: 'active',
    doctor: 'Dr. Sarah Johnson',
    emergencyContact: 'Jane Smith (Wife) - +91 98765 43211',
    profileImage: '/api/placeholder/150/150'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'critical': case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'high': case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <TrendingUp className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Header Section - Patient Profile */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                  {patientData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <div className={`w-6 h-6 rounded-full border-2 border-white ${
                    patientData.status === 'active' ? 'bg-green-500' : 
                    patientData.status === 'critical' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{patientData.name}</h1>
                <p className="text-gray-600 text-lg">Patient ID: {patientData.patientId}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600 mr-4">{patientData.age} years old</span>
                  <span className="text-sm text-gray-600 mr-4">{patientData.gender}</span>
                  <span className="inline-flex items-center text-sm font-medium text-red-600">
                    <Droplets className="w-4 h-4 mr-1" />
                    {patientData.bloodGroup}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </motion.button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium">Current Status</p>
                  <p className="text-lg font-bold text-green-800 capitalize">{patientData.status}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium">Next Appointment</p>
                  <p className="text-lg font-bold text-blue-800">
                    {new Date(patientData.nextAppointment).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium">Assigned Doctor</p>
                  <p className="text-lg font-bold text-purple-800">{patientData.doctor}</p>
                </div>
                <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700 font-medium">Health Issues</p>
                  <p className="text-lg font-bold text-orange-800">{patientData.currentProblems.filter(p => p.status !== 'normal').length}</p>
                </div>
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Health Overview', icon: <Activity className="w-4 h-4" /> },
              { id: 'vitals', label: 'Current Vitals', icon: <Heart className="w-4 h-4" /> },
              { id: 'history', label: 'Medical History', icon: <FileText className="w-4 h-4" /> },
              { id: 'allergies', label: 'Allergies & Warnings', icon: <Shield className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Current Health Status */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Current Health Status</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {patientData.currentProblems.slice(0, 6).map((problem, index) => (
                    <motion.div
                      key={problem.problem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{problem.problem}</h4>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(problem.status)}`}>
                          {getStatusIcon(problem.status)}
                          <span className="ml-1 capitalize">{problem.status}</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{problem.value}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Last updated: {new Date(problem.lastUpdated).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Summary */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Chronic Conditions</h3>
                  <div className="space-y-3">
                    {patientData.chronicDiseases.map((disease, index) => (
                      <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                        <Heart className="w-5 h-5 text-red-600 mr-3" />
                        <span className="font-medium text-red-800">{disease}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-blue-800">Last Visit</p>
                        <p className="text-sm text-blue-600">{new Date(patientData.lastVisit).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Bell className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-green-800">Upcoming Appointment</p>
                        <p className="text-sm text-green-600">{new Date(patientData.nextAppointment).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vitals Tab */}
          {activeTab === 'vitals' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Current Vital Signs</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {patientData.currentProblems.map((problem, index) => (
                  <motion.div
                    key={problem.problem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">{problem.problem}</h4>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(problem.status)}`}>
                        {getStatusIcon(problem.status)}
                        <span className="ml-1 capitalize">{problem.status}</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{problem.value}</p>
                    <p className="text-sm text-gray-500">
                      Updated: {new Date(problem.lastUpdated).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-8">
              {/* Past Treatments */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Past Treatments</h3>
                <div className="space-y-4">
                  {patientData.pastTreatments.map((treatment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <span className="text-green-800">{treatment}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Accident History */}
              {patientData.accidents.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Accident History</h3>
                  <div className="space-y-4">
                    {patientData.accidents.map((accident, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-200"
                      >
                        <Zap className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                        <span className="text-orange-800">{accident}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Allergies Tab */}
          {activeTab === 'allergies' && (
            <div className="space-y-8">
              {/* Medicine Allergies */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Pill className="w-6 h-6 mr-2 text-red-600" />
                  Medicine Allergies - CRITICAL
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {patientData.allergicToMedicine.map((medicine, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="font-semibold text-red-800">{medicine}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* General Allergies */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-yellow-600" />
                  General Allergies
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {patientData.allergies.map((allergy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-yellow-800">{allergy}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contact Information Footer */}
        <motion.div variants={itemVariants} className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{patientData.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{patientData.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Emergency Contact</p>
                <p className="font-semibold text-gray-800">{patientData.emergencyContact}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
