"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar'; // Added Navbar import
import {
  FileText,
  Download,
  Printer,
  User,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Ruler,
  Eye,
  Brain,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

interface TestResult {
  category: string;
  tests: Array<{
    name: string;
    value: string;
    unit: string;
    normalRange: string;
    status: 'normal' | 'high' | 'low' | 'critical';
  }>;
}

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  patientId: string;
  reportDate: string;
  doctorName: string;
  testDate: string;
}

const HealthReportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const patientInfo: PatientInfo = {
    name: "John Smith",
    age: 35,
    gender: "Male",
    patientId: "PT-2025-001234",
    reportDate: "September 18, 2025",
    doctorName: "Dr. Sarah Johnson",
    testDate: "September 15, 2025"
  };

  const vitalSigns: HealthMetric[] = [
    {
      name: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      normalRange: "120/80",
      status: "normal",
      trend: "stable",
      icon: <Heart className="w-6 h-6" />
    },
    {
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      normalRange: "60-100",
      status: "normal",
      trend: "stable",
      icon: <Activity className="w-6 h-6" />
    },
    {
      name: "Temperature",
      value: "98.6",
      unit: "°F",
      normalRange: "97.8-99.1",
      status: "normal",
      trend: "stable",
      icon: <Thermometer className="w-6 h-6" />
    },
    {
      name: "Weight",
      value: "75",
      unit: "kg",
      normalRange: "65-85",
      status: "normal",
      trend: "up",
      icon: <Weight className="w-6 h-6" />
    }
  ];

  const testResults: TestResult[] = [
    {
      category: "Blood Chemistry",
      tests: [
        { name: "Glucose", value: "95", unit: "mg/dL", normalRange: "70-99", status: "normal" },
        { name: "Cholesterol", value: "180", unit: "mg/dL", normalRange: "<200", status: "normal" },
        { name: "HDL", value: "45", unit: "mg/dL", normalRange: ">40", status: "normal" },
        { name: "LDL", value: "110", unit: "mg/dL", normalRange: "<100", status: "high" },
        { name: "Triglycerides", value: "150", unit: "mg/dL", normalRange: "<150", status: "normal" }
      ]
    },
    {
      category: "Complete Blood Count",
      tests: [
        { name: "Hemoglobin", value: "14.5", unit: "g/dL", normalRange: "13.8-17.2", status: "normal" },
        { name: "White Blood Cells", value: "7.2", unit: "×10³/μL", normalRange: "4.5-11.0", status: "normal" },
        { name: "Red Blood Cells", value: "4.8", unit: "×10⁶/μL", normalRange: "4.7-6.1", status: "normal" },
        { name: "Platelets", value: "280", unit: "×10³/μL", normalRange: "150-450", status: "normal" }
      ]
    },
    {
      category: "Liver Function",
      tests: [
        { name: "ALT", value: "25", unit: "U/L", normalRange: "7-56", status: "normal" },
        { name: "AST", value: "22", unit: "U/L", normalRange: "10-40", status: "normal" },
        { name: "Bilirubin", value: "0.8", unit: "mg/dL", normalRange: "0.3-1.2", status: "normal" }
      ]
    }
  ];

  const recommendations = [
    {
      type: "diet",
      title: "Dietary Recommendations",
      items: [
        "Reduce saturated fat intake to lower LDL cholesterol",
        "Increase fiber-rich foods like oats and legumes",
        "Include omega-3 fatty acids from fish twice a week"
      ]
    },
    {
      type: "exercise",
      title: "Exercise Plan",
      items: [
        "30 minutes of moderate aerobic exercise 5 days a week",
        "Strength training exercises 2 days a week",
        "Regular walking or cycling for cardiovascular health"
      ]
    },
    {
      type: "followup",
      title: "Follow-up Care",
      items: [
        "Repeat lipid panel in 3 months",
        "Schedule annual physical examination",
        "Monitor blood pressure at home weekly"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'high': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'low': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'critical': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'high': case 'low': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-emerald-600" />;
      default: return <Minus className="w-4 h-4 text-slate-500" />;
    }
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('PDF download functionality would be implemented here');
  };

  return (
    <>
      <Navbar /> {/* Added Navbar component */}
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">Health Report</h1>
                  <p className="text-slate-600">Comprehensive health analysis and recommendations</p>
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </motion.button>
              </div>
            </div>

            {/* Patient Information */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
              <div className="flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Patient Name</p>
                  <p className="font-semibold text-slate-800">{patientInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Age / Gender</p>
                  <p className="font-semibold text-slate-800">{patientInfo.age} / {patientInfo.gender}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Patient ID</p>
                  <p className="font-semibold text-slate-800">{patientInfo.patientId}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-600">Report Date</p>
                  <p className="font-semibold text-slate-800">{patientInfo.reportDate}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
            <div className="flex border-b border-slate-200">
              {[
                { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> },
                { id: 'vitals', label: 'Vital Signs', icon: <Heart className="w-4 h-4" /> },
                { id: 'tests', label: 'Test Results', icon: <FileText className="w-4 h-4" /> },
                { id: 'recommendations', label: 'Recommendations', icon: <Shield className="w-4 h-4" /> }
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

          {/* Content Sections */}
          <motion.div variants={itemVariants}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Health Summary Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vitalSigns.map((vital, index) => (
                    <motion.div
                      key={vital.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-blue-600">{vital.icon}</div>
                        {getTrendIcon(vital.trend)}
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{vital.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-slate-800">{vital.value}</span>
                        <span className="ml-2 text-sm text-slate-600">{vital.unit}</span>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-3 border ${getStatusColor(vital.status)}`}>
                        {getStatusIcon(vital.status)}
                        <span className="ml-1 capitalize">{vital.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Insights */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Health Summary</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                      <p className="font-semibold text-emerald-800">Overall Health</p>
                      <p className="text-sm text-emerald-700">Good condition</p>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-2" />
                      <p className="font-semibold text-amber-800">Areas to Monitor</p>
                      <p className="text-sm text-amber-700">1 metric elevated</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Calendar className="w-12 h-12 text-blue-700 mx-auto mb-2" />
                      <p className="font-semibold text-blue-800">Next Checkup</p>
                      <p className="text-sm text-blue-700">In 3 months</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vital Signs Tab */}
            {activeTab === 'vitals' && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Vital Signs History</h3>
                <div className="space-y-6">
                  {vitalSigns.map((vital, index) => (
                    <motion.div
                      key={vital.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-blue-600 mr-4">{vital.icon}</div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{vital.name}</h4>
                            <p className="text-sm text-slate-600">Normal range: {vital.normalRange}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-slate-800 mr-2">{vital.value}</span>
                            <span className="text-slate-600">{vital.unit}</span>
                            {getTrendIcon(vital.trend)}
                          </div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 border ${getStatusColor(vital.status)}`}>
                            {getStatusIcon(vital.status)}
                            <span className="ml-1 capitalize">{vital.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Results Tab */}
            {activeTab === 'tests' && (
              <div className="space-y-6">
                {testResults.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-slate-200"
                  >
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{category.category}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">Test Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">Result</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">Normal Range</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.tests.map((test, testIndex) => (
                            <motion.tr
                              key={test.name}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: (categoryIndex * 0.2) + (testIndex * 0.05) }}
                              className="border-b border-slate-100 hover:bg-blue-50"
                            >
                              <td className="py-3 px-4 font-medium text-slate-800">{test.name}</td>
                              <td className="py-3 px-4">
                                <span className="font-semibold text-slate-800">{test.value}</span>
                                <span className="ml-1 text-slate-600">{test.unit}</span>
                              </td>
                              <td className="py-3 px-4 text-slate-600">{test.normalRange}</td>
                              <td className="py-3 px-4">
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                                  {getStatusIcon(test.status)}
                                  <span className="ml-1 capitalize">{test.status}</span>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="space-y-6">
                {recommendations.map((section, index) => (
                  <motion.div
                    key={section.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-slate-200"
                  >
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (index * 0.2) + (itemIndex * 0.1) }}
                          className="flex items-start"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* Doctor's Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-6 border-l-4 border-blue-600"
                >
                  <h4 className="font-bold text-slate-800 mb-2">Doctor&apos;s Note</h4>
                  <p className="text-slate-700 mb-4">
                    Overall health status is good with minor elevation in LDL cholesterol.
                    Implementing the recommended dietary changes and exercise routine should help
                    bring levels back to optimal range. Continue current medications as prescribed.
                  </p>
                  <div className="flex items-center text-sm text-slate-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{patientInfo.doctorName}</span>
                    <span className="mx-2">•</span>
                    <span>{patientInfo.testDate}</span>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-8 bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <div className="text-center text-sm text-slate-600">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>Healthcare Center • 123 Medical Ave, Health District</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1.5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1.5" />
                  <span>reports@healthcare.com</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">This report is confidential and intended for the patient and authorized healthcare providers only.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default HealthReportPage;