// AI Types and Interfaces
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'warning' | 'info';
}

export interface SymptomAnalysis {
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedConditions: {
    condition: string;
    probability: number;
    description: string;
  }[];
  recommendations: string[];
  urgency: 'routine' | 'urgent' | 'emergency';
}

export interface HealthInsight {
  id: string;
  type: 'trend' | 'alert' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'vitals' | 'medication' | 'appointment' | 'lifestyle';
  timestamp: Date;
  actionable: boolean;
  actionText?: string;
}

export interface AppointmentSuggestion {
  id: string;
  suggestedTime: Date;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number; // in minutes
  doctorType?: string;
  location?: string;
}

export interface AIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
