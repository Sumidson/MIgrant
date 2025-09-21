import { ChatMessage, AIResponse } from '../types';
import { GEMINI_CONFIG, SYSTEM_PROMPTS } from '../config/gemini';

export class ChatService {
  private static instance: ChatService;
  private messages: ChatMessage[] = [];

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async sendMessage(message: string, context?: Record<string, unknown>): Promise<AIResponse<ChatMessage>> {
    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        timestamp: new Date(),
        type: 'text'
      };

      this.messages.push(userMessage);

      // Call backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.message) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          role: 'assistant',
          timestamp: new Date(),
          type: 'text'
        };

        this.messages.push(aiMessage);

        return {
          success: true,
          data: aiMessage
        };
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat service error:', error);
      // Fallback to local processing
      return this.processMessageLocally(message, context);
    }
  }

  private async processMessageLocally(message: string, context?: Record<string, unknown>): Promise<AIResponse<ChatMessage>> {
    try {
      const response = await this.processMessage(message, context);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      this.messages.push(aiMessage);

      return {
        success: true,
        data: aiMessage
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async processMessage(message: string, context?: Record<string, unknown>): Promise<string> {
    try {
      // Call Gemini AI API
      const response = await this.callGeminiAPI(message, context);
      return response;
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to rule-based responses if API fails
      return this.getFallbackResponse(message);
    }
  }

  private async callGeminiAPI(message: string, context?: Record<string, unknown>): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${message}`
            }
          ]
        }
      ],
      generationConfig: GEMINI_CONFIG.DEFAULT_CONFIG,
      safetySettings: GEMINI_CONFIG.SAFETY_SETTINGS
    };

    const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  }

  private buildSystemPrompt(context?: Record<string, unknown>): string {
    let prompt = SYSTEM_PROMPTS.CHAT_ASSISTANT;

    if (context) {
      if (context.userType === 'admin') {
        prompt += '\n\nYou are currently assisting an admin user who manages the healthcare system. You can provide more detailed administrative guidance and system information.';
      } else if (context.userType === 'patient') {
        prompt += '\n\nYou are currently assisting a patient. Focus on their health concerns and provide supportive guidance.';
      } else if (context.patientId) {
        prompt += `\n\nYou are currently assisting with patient ID: ${context.patientId}. You can reference their medical history and provide personalized guidance.`;
      }
    }

    return prompt;
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Health-related responses
    if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('ache')) {
      return this.getHealthResponse(message);
    }

    // Appointment-related responses
    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
      return this.getAppointmentResponse(message);
    }

    // General medical queries
    if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug')) {
      return this.getMedicationResponse(message);
    }

    // Emergency responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
      return this.getEmergencyResponse(message);
    }

    // Default response
    return this.getDefaultResponse(message);
  }

  private getHealthResponse(_message: string): string {
    const responses = [
      "I understand you're experiencing some symptoms. For proper medical evaluation, I recommend scheduling an appointment with a healthcare provider. In the meantime, please monitor your symptoms and seek immediate medical attention if they worsen.",
      "Your symptoms are important to track. I suggest keeping a symptom diary and consulting with a medical professional for proper diagnosis and treatment.",
      "I can help you understand your symptoms better, but remember that only a qualified healthcare provider can provide a proper diagnosis. Would you like me to help you find nearby medical centers?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getAppointmentResponse(_message: string): string {
    return "I can help you schedule an appointment! You can book appointments through our online portal or by calling our helpline. Would you like me to show you available time slots or help you find a suitable medical center?";
  }

  private getMedicationResponse(_message: string): string {
    return "For medication-related queries, it's important to consult with a healthcare provider or pharmacist. They can provide accurate information about dosages, interactions, and side effects. Never self-medicate without professional guidance.";
  }

  private getEmergencyResponse(_message: string): string {
    return "🚨 If this is a medical emergency, please call emergency services immediately at 108 or visit the nearest emergency room. For non-emergency urgent care, I can help you find nearby medical facilities.";
  }

  private getDefaultResponse(_message: string): string {
    return "I'm here to help with your healthcare needs. You can ask me about symptoms, appointments, medications, or general health questions. How can I assist you today?";
  }

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  clearMessages(): void {
    this.messages = [];
  }
}
