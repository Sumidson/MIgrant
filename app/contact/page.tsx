"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageCircle,
  FileText,
  ArrowLeft,
  Shield,
  Heart,
  Activity,
  Star,
  CheckCircle,
  Building,
  Users,
  Globe,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  experience: string;
  description: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export default function ContactUs() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Arun Kumar",
      role: "Lead Healthcare Director",
      specialization: "Public Health & Policy",
      experience: "15+ Years",
      description: "Dedicated to improving healthcare access for migrant workers across Kerala.",
      image: "/team/doctor-arun.jpg",
      linkedin: "https://linkedin.com/in/arunkumar",
      twitter: "https://twitter.com/drarunkumar"
    },
    {
      name: "Priya Menon",
      role: "Digital Health Coordinator", 
      specialization: "Health Technology",
      experience: "8+ Years",
      description: "Expert in digital health solutions and patient care management systems.",
      image: "/team/priya-menon.jpg",
      linkedin: "https://linkedin.com/in/priyamenon"
    },
    {
      name: "Ravi Nair",
      role: "Community Outreach Manager",
      specialization: "Social Work & Community Health", 
      experience: "10+ Years",
      description: "Connecting migrant communities with essential healthcare services.",
      image: "/team/ravi-nair.jpg",
      linkedin: "https://linkedin.com/in/ravinair"
    },
    {
      name: "Dr. Lakshmi Pillai",
      role: "Clinical Operations Head",
      specialization: "Internal Medicine",
      experience: "12+ Years", 
      description: "Ensuring quality clinical care and health record management.",
      image: "/team/dr-lakshmi.jpg",
      linkedin: "https://linkedin.com/in/drlakshmi"
    },
    {
      name: "Suresh Babu",
      role: "Technical Lead",
      specialization: "Healthcare IT Systems",
      experience: "9+ Years",
      description: "Leading technical infrastructure for secure health data management.",
      image: "/team/suresh-babu.jpg",
      linkedin: "https://linkedin.com/in/sureshbabu"
    },
    {
      name: "Meera Joseph", 
      role: "Patient Support Specialist",
      specialization: "Patient Relations",
      experience: "6+ Years",
      description: "Providing compassionate support to patients and their families.",
      image: "/team/meera-joseph.jpg",
      linkedin: "https://linkedin.com/in/meerajoseph"
    }
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center py-24 px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Message Sent Successfully!</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Thank you for contacting MigrantCare. Our team will get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Send Another Message
              </button>
              <button
                onClick={handleBackToHome}
                className="block w-full text-blue-600 border border-blue-300 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Header Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={handleBackToHome}
            className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Get in <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to support Kerala&apos;s migrant workforce with comprehensive healthcare solutions.
              Reach out to our dedicated team for any assistance you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Our team is available to help you with healthcare registration, medical records, 
                  and any questions about our services.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone Support</h3>
                    <p className="text-slate-600">Helpline: <a href="tel:1800-102-9797" className="text-blue-600 hover:text-blue-800 font-semibold">1800-102-9797</a></p>
                    <p className="text-slate-600">Emergency: <a href="tel:108" className="text-red-600 hover:text-red-700 font-semibold">108</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-3 rounded-2xl shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Email Support</h3>
                    <p className="text-slate-600">General: <a href="mailto:info@migrantcare.kerala.gov.in" className="text-blue-600 hover:text-blue-800 font-semibold">info@migrantcare.kerala.gov.in</a></p>
                    <p className="text-slate-600">Support: <a href="mailto:support@migrantcare.kerala.gov.in" className="text-blue-600 hover:text-blue-800 font-semibold">support@migrantcare.kerala.gov.in</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-2xl shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Address</h3>
                    <p className="text-slate-600">
                      Kerala State Health Department<br />
                      Thiruvananthapuram, Kerala 695001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-3 rounded-2xl shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-slate-600">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                    <p className="text-emerald-600 font-semibold text-sm mt-1">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input type="text" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter your full name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter your email" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter your phone number" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Inquiry Type</label>
                    <select value={formData.inquiryType} onChange={(e) => handleInputChange('inquiryType', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                      <option value="">Select inquiry type</option>
                      <option value="registration">Health Registration</option>
                      <option value="medical-records">Medical Records</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="emergency">Emergency Support</option>
                      <option value="technical">Technical Support</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="text" value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Brief subject line" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <textarea required value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} rows={5} className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none" placeholder="Please describe your inquiry or concern in detail..."/>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl py-3 font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Send Message
                      <Send className="h-5 w-5 ml-2" />
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Dedicated Team</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our experienced professionals are committed to providing quality healthcare services 
              and support to Kerala&apos;s migrant worker community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-16 w-16 text-slate-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-slate-600 text-sm mb-2">{member.specialization}</p>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                    {member.experience}
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>

                  <div className="flex justify-center space-x-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors shadow-sm">
                        <Twitter className="h-4 w-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started with <span className="text-teal-300">MigrantCare?</span>
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join thousands of migrant workers who trust MigrantCare for their healthcare needs. 
              Register today and get access to comprehensive health services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/auth/signup')}
                className="bg-white text-blue-800 px-8 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-lg transform hover:scale-105"
              >
                Register Now
              </button>
              <button 
                onClick={() => router.push('/services')}
                className="border-2 border-white text-white px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-blue-800 transition-all shadow-lg transform hover:scale-105"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MigrantCare</span>
            </div>
            <p className="text-slate-400 mb-4">
              &copy; 2025 MigrantCare. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 text-slate-400">
              <span className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-1" />
                Government of Kerala Initiative
              </span>
              <span className="text-sm">Problem Statement #25083</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}