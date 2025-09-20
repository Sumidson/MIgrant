'use client'
import { useState, useMemo } from 'react'
import Navbar from '@/components/navbar'
import { 
  Shield,
  LifeBuoy,
  Ticket,
  PlusCircle,
  Search,
  ChevronDown,
  Clock,
  CheckCircle,
  Loader,
  MessageSquare,
  ArrowRight,
  User,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react'




// --- TypeScript Interfaces ---
type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: TicketStatus;
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// --- Mock Data ---
const initialTickets: Ticket[] = [
  { id: 'TKT-001', subject: 'Cannot access my health records', category: 'Technical Support', status: 'In Progress', lastUpdated: '2025-09-20', priority: 'High' },
  { id: 'TKT-002', subject: 'Question about vaccination schedule', category: 'Medical Inquiry', status: 'Resolved', lastUpdated: '2025-09-19', priority: 'Medium' },
  { id: 'TKT-003', subject: 'Difficulty updating my address', category: 'Registration Help', status: 'Open', lastUpdated: '2025-09-21', priority: 'Low' },
  { id: 'TKT-004', subject: 'Login password reset not working', category: 'Technical Support', status: 'Open', lastUpdated: '2025-09-21', priority: 'High' },
];

const faqs: FAQ[] = [
  { category: 'Registration', question: 'How do I register for MigrantCare?', answer: 'You can register through our online portal by clicking the "Sign Up" button. You will need your Aadhar card and basic personal information.' },
  { category: 'Registration', question: 'What documents do I need to register?', answer: 'A valid Aadhar card, proof of current address in Kerala, and a passport-sized photograph are required for registration.' },
  { category: 'Health Records', question: 'How can I view my health records?', answer: 'Once logged in, navigate to the "Health Records" section from your patient dashboard to view all your medical history.' },
  { category: 'Health Records', question: 'Are my health records secure?', answer: 'Yes, all your data is protected with end-to-end encryption and is compliant with industry-standard security protocols.' },
  { category: 'Appointments', question: 'How do I book a vaccination appointment?', answer: 'Go to the "Book Vaccination" page, select your preferred date, time, and the nearest health center from the available options.' },
  { category: 'Appointments', question: 'Can I reschedule an appointment?', answer: 'Yes, you can reschedule an existing appointment from your dashboard up to 24 hours before the scheduled time.' },
];

export default function HelpDeskPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'newTicket' | 'faq'>('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [newTicket, setNewTicket] = useState({ subject: '', category: '', priority: 'Medium', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBackToHome = () => {
    window.location.href = '/';
  }

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.category || !newTicket.description) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newTicketData: Ticket = {
        id: `TKT-00${tickets.length + 1}`,
        subject: newTicket.subject,
        category: newTicket.category,
        priority: newTicket.priority as 'High' | 'Medium' | 'Low',
        status: 'Open',
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setTickets([newTicketData, ...tickets]);
      setIsSubmitting(false);
      setNewTicket({ subject: '', category: '', priority: 'Medium', description: '' });
      setActiveTab('dashboard');
    }, 1500);
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-amber-100 text-amber-800';
      case 'Resolved': return 'bg-emerald-100 text-emerald-800';
      case 'Closed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'border-rose-500 text-rose-600 bg-rose-50';
      case 'Medium': return 'border-amber-500 text-amber-600 bg-amber-50';
      case 'Low': return 'border-slate-500 text-slate-600 bg-slate-50';
      default: return 'border-slate-500 text-slate-600 bg-slate-50';
    }
  };

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-slate-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Ticket className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Support Tickets</h3>
                <p className="text-slate-500 mb-4">You haven't submitted any support tickets yet.</p>
                <button 
                  onClick={() => setActiveTab('newTicket')}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
                >
                  Create Your First Ticket
                </button>
              </div>
            ) : (
              tickets.map(ticket => (
                <div key={ticket.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">{ticket.subject}</h3>
                      <div className="flex flex-wrap items-center text-sm text-slate-600 gap-4">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          ID: {ticket.id}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {ticket.category}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(ticket.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border-2 ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );
      case 'newTicket':
        return (
          <form onSubmit={handleTicketSubmit} className="space-y-6">
             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Create New Support Ticket</h2>
               <p className="text-slate-600">Describe your issue and we'll help you resolve it quickly.</p>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject <span className="text-red-500">*</span></label>
                <input type="text" value={newTicket.subject} onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})} className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required placeholder="Brief description of your issue" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
                <select value={newTicket.category} onChange={(e) => setNewTicket({...newTicket, category: e.target.value})} className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="">Select a category</option>
                  <option>Technical Support</option>
                  <option>Medical Inquiry</option>
                  <option>Registration Help</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Priority Level</label>
               <div className="grid grid-cols-3 gap-3">
                 {['Low', 'Medium', 'High'].map((priority) => (
                   <label key={priority} className="relative cursor-pointer">
                     <input 
                       type="radio" 
                       name="priority" 
                       value={priority}
                       checked={newTicket.priority === priority}
                       onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                       className="sr-only peer"
                     />
                     <div className={`p-4 text-center border-2 rounded-2xl transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 ${
                       priority === 'High' ? 'hover:border-red-300' : 
                       priority === 'Medium' ? 'hover:border-amber-300' : 
                       'hover:border-slate-300'
                     } border-slate-200`}>
                       <span className="font-semibold text-slate-700">{priority}</span>
                     </div>
                   </label>
                 ))}
               </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea value={newTicket.description} onChange={(e) => setNewTicket({...newTicket, description: e.target.value})} rows={5} className="w-full bg-white border-2 border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required  placeholder="Please provide detailed information..."/>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
               <button 
                 type="button"
                 onClick={() => setActiveTab('dashboard')}
                 className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
               >
                 <ArrowLeft className="h-4 w-4 mr-2" />
                 Back to Dashboard
               </button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md disabled:opacity-50">
                {isSubmitting ? <Loader className="animate-spin w-5 h-5 mr-2" /> : <Ticket className="w-5 h-5 mr-2" />}
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        );
      case 'faq':
        return (
          <div>
            <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
               <p className="text-slate-600">Find quick answers to common questions about MigrantCare services.</p>
             </div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <details key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 group hover:border-blue-300 transition-colors">
                  <summary className="font-semibold text-slate-800 cursor-pointer flex justify-between items-center">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-slate-600 mt-2 pt-2 border-t border-slate-100">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Header */}
        <section className="bg-white py-20 text-center">
          <div className="container mx-auto px-4">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-2xl mb-4">
              <LifeBuoy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Help & Support Center</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're here to help. Find answers to your questions, submit a ticket, or contact us directly.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-100 p-2 rounded-xl flex justify-center space-x-2 mb-8">
                <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 font-semibold rounded-lg flex items-center transition-colors ${activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 hover:bg-white/50 hover:text-blue-600'}`}>
                  <Ticket className="w-5 h-5 mr-2" /> My Tickets
                </button>
                <button onClick={() => setActiveTab('newTicket')} className={`px-6 py-3 font-semibold rounded-lg flex items-center transition-colors ${activeTab === 'newTicket' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 hover:bg-white/50 hover:text-blue-600'}`}>
                  <PlusCircle className="w-5 h-5 mr-2" /> New Ticket
                </button>
                <button onClick={() => setActiveTab('faq')} className={`px-6 py-3 font-semibold rounded-lg flex items-center transition-colors ${activeTab === 'faq' ? 'bg-white text-blue-600 shadow' : 'text-slate-600 hover:bg-white/50 hover:text-blue-600'}`}>
                  <MessageSquare className="w-5 h-5 mr-2" /> FAQs
                </button>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

