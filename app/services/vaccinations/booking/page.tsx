"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import { 
  Calendar,
  Clock,
  MapPin,
  Syringe,
  CheckCircle,
  User,
  Phone,
  Mail,
  ArrowRight,
  AlertCircle,
  Building,
  Heart,
  Shield,
  FileText,
  X
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  availableVaccines: string[];
  rating: number;
  distance: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  maxBookings: number;
  currentBookings: number;
}

interface BookingForm {
  date: string;
  time: string;
  hospital: string;
  vaccineType: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
}

export default function VaccinationBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    date: '',
    time: '',
    hospital: '',
    vaccineType: '',
    patientName: 'John Smith',
    patientPhone: '+91 98765 43210',
    patientEmail: 'john.smith@email.com',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedHospitalDetails, setSelectedHospitalDetails] = useState<Hospital | null>(null);

  const hospitals: Hospital[] = [
    {
      id: 'kochi-general',
      name: 'Kochi General Hospital',
      address: 'Marine Drive, Ernakulam, Kochi - 682031',
      phone: '+91 484 2668171',
      availableVaccines: ['COVID-19', 'Influenza', 'Hepatitis B', 'Tetanus'],
      rating: 4.8,
      distance: '2.5 km'
    },
    {
      id: 'thiruvananthapuram-medical',
      name: 'Thiruvananthapuram Medical Center',
      address: 'Medical College Road, Thiruvananthapuram - 695011',
      phone: '+91 471 2448212',
      availableVaccines: ['COVID-19', 'Influenza', 'Typhoid', 'Hepatitis A'],
      rating: 4.6,
      distance: '5.2 km'
    },
    {
      id: 'alappuzha-district',
      name: 'Alappuzha District Hospital',
      address: 'CSMH Road, Alappuzha - 688013',
      phone: '+91 477 2251056',
      availableVaccines: ['COVID-19', 'Tetanus', 'Hepatitis B'],
      rating: 4.4,
      distance: '8.1 km'
    },
    {
      id: 'kozhikode-health',
      name: 'Kozhikode Health Clinic',
      address: 'Mavoor Road, Kozhikode - 673004',
      phone: '+91 495 2721201',
      availableVaccines: ['COVID-19', 'Influenza', 'Typhoid', 'Tetanus'],
      rating: 4.7,
      distance: '12.3 km'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true, maxBookings: 10, currentBookings: 3 },
    { time: '09:30 AM', available: true, maxBookings: 10, currentBookings: 7 },
    { time: '10:00 AM', available: true, maxBookings: 10, currentBookings: 5 },
    { time: '10:30 AM', available: false, maxBookings: 10, currentBookings: 10 },
    { time: '11:00 AM', available: true, maxBookings: 10, currentBookings: 2 },
    { time: '11:30 AM', available: true, maxBookings: 10, currentBookings: 4 },
    { time: '02:00 PM', available: true, maxBookings: 10, currentBookings: 6 },
    { time: '02:30 PM', available: true, maxBookings: 10, currentBookings: 8 },
    { time: '03:00 PM', available: true, maxBookings: 10, currentBookings: 1 },
    { time: '03:30 PM', available: true, maxBookings: 10, currentBookings: 9 },
    { time: '04:00 PM', available: true, maxBookings: 10, currentBookings: 3 },
    { time: '04:30 PM', available: true, maxBookings: 10, currentBookings: 5 }
  ];

  const vaccineTypes = [
    'COVID-19 Vaccine',
    'Influenza Vaccine',
    'Hepatitis B Vaccine',
    'Tetanus Vaccine',
    'Typhoid Vaccine',
    'Hepatitis A Vaccine'
  ];

  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHospitalSelect = (hospitalId: string) => {
    const hospital = hospitals.find(h => h.id === hospitalId);
    setSelectedHospitalDetails(hospital || null);
    handleInputChange('hospital', hospitalId);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return bookingForm.date && bookingForm.time && bookingForm.vaccineType;
      case 2:
        return bookingForm.hospital;
      case 3:
        return bookingForm.patientName && bookingForm.patientPhone && bookingForm.patientEmail;
      default:
        return false;
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

  // Success state with elegant colors
  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border border-slate-100"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
            <p className="text-slate-600 text-lg mb-8">
              Your vaccination appointment has been successfully scheduled.
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Appointment Details:</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-slate-600 mr-3" />
                  <span className="text-slate-700">{new Date(bookingForm.date).toLocaleDateString()} at {bookingForm.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-slate-600 mr-3" />
                  <span className="text-slate-700">{selectedHospitalDetails?.name}</span>
                </div>
                <div className="flex items-center">
                  <Syringe className="w-5 h-5 text-slate-600 mr-3" />
                  <span className="text-slate-700">{bookingForm.vaccineType}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
              >
                Print Confirmation
              </button>
              <button 
                onClick={() => {setIsSubmitted(false); setCurrentStep(1);}}
                className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                Book Another Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

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
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-600 to-stone-600 rounded-2xl shadow-lg mb-6">
              <Syringe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Book Vaccination Appointment</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Schedule your vaccination appointment at your preferred time and location
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-center">
              <div className="flex items-center space-x-8">
                {[
                  { step: 1, title: 'Date & Vaccine', icon: <Calendar className="w-5 h-5" /> },
                  { step: 2, title: 'Location', icon: <MapPin className="w-5 h-5" /> },
                  { step: 3, title: 'Confirmation', icon: <CheckCircle className="w-5 h-5" /> }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div className={`flex flex-col items-center ${index < 2 ? 'mr-8' : ''}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-colors ${
                        currentStep >= item.step 
                          ? 'bg-slate-700 text-white shadow-lg' 
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {currentStep > item.step ? <CheckCircle className="w-5 h-5" /> : item.icon}
                      </div>
                      <span className={`text-sm font-medium mt-2 ${
                        currentStep >= item.step ? 'text-slate-700' : 'text-slate-500'
                      }`}>
                        {item.title}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 ${
                        currentStep > item.step ? 'bg-slate-700' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            
            {/* Step 1: Date, Time & Vaccine Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Select Date, Time & Vaccine Type</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Date and Vaccine Selection */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={bookingForm.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Vaccine Type *
                      </label>
                      <select
                        value={bookingForm.vaccineType}
                        onChange={(e) => handleInputChange('vaccineType', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors appearance-none"
                        required
                      >
                        <option value="">Select vaccine type</option>
                        {vaccineTypes.map((vaccine) => (
                          <option key={vaccine} value={vaccine}>{vaccine}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Available Time Slots *
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => handleInputChange('time', slot.time)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            bookingForm.time === slot.time
                              ? 'border-slate-700 bg-slate-100 text-slate-800'
                              : slot.available
                              ? 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                              : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Clock className="w-4 h-4 mb-1" />
                            <span>{slot.time}</span>
                            <span className="text-xs mt-1">
                              {slot.available ? `${slot.maxBookings - slot.currentBookings} slots left` : 'Full'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Hospital Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Select Healthcare Facility</h2>
                
                <div className="grid gap-6">
                  {hospitals.map((hospital) => (
                    <motion.div
                      key={hospital.id}
                      whileHover={{ y: -2 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                        bookingForm.hospital === hospital.id
                          ? 'border-slate-700 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                      onClick={() => handleHospitalSelect(hospital.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-slate-100 to-stone-100 rounded-xl flex items-center justify-center">
                            <Building className="w-6 h-6 text-slate-600" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{hospital.name}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center text-slate-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="text-sm">{hospital.address}</span>
                              </div>
                              <div className="flex items-center text-slate-600">
                                <Phone className="w-4 h-4 mr-2" />
                                <span className="text-sm">{hospital.phone}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <span className="text-slate-500 mr-1">★</span>
                                  <span className="text-sm font-medium">{hospital.rating}</span>
                                </div>
                                <span className="text-sm text-slate-500">{hospital.distance} away</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-600 mb-2">Available Vaccines:</div>
                          <div className="flex flex-wrap gap-1">
                            {hospital.availableVaccines.slice(0, 3).map((vaccine) => (
                              <span key={vaccine} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                                {vaccine}
                              </span>
                            ))}
                            {hospital.availableVaccines.length > 3 && (
                              <span className="text-xs text-slate-500">+{hospital.availableVaccines.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Patient Information & Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Confirm Your Details</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Patient Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Patient Information</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={bookingForm.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.patientPhone}
                        onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={bookingForm.patientEmail}
                        onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={bookingForm.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-slate-600 transition-colors resize-none"
                        placeholder="Any special requirements or notes..."
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Appointment Summary</h3>
                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-slate-600 mr-3" />
                        <div>
                          <p className="font-medium text-slate-900">Date & Time</p>
                          <p className="text-sm text-slate-600">
                            {bookingForm.date ? new Date(bookingForm.date).toLocaleDateString() : 'Not selected'} at {bookingForm.time || 'Not selected'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Syringe className="w-5 h-5 text-slate-600 mr-3" />
                        <div>
                          <p className="font-medium text-slate-900">Vaccine Type</p>
                          <p className="text-sm text-slate-600">{bookingForm.vaccineType || 'Not selected'}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-slate-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-slate-900">Healthcare Facility</p>
                          <p className="text-sm text-slate-600">
                            {selectedHospitalDetails?.name || 'Not selected'}
                          </p>
                          {selectedHospitalDetails && (
                            <p className="text-xs text-slate-500 mt-1">
                              {selectedHospitalDetails.address}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex items-center text-slate-700">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Free of Charge</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Government sponsored vaccination program
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  currentStep === 1
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-600 text-white hover:bg-slate-700'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentStep >= step ? 'bg-slate-700' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center ${
                    isStepValid(currentStep)
                      ? 'bg-slate-700 text-white hover:bg-slate-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-colors flex items-center ${
                    isStepValid(currentStep)
                      ? 'bg-slate-700 text-white hover:bg-slate-800'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Booking
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
