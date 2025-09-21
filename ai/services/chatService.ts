import { ChatMessage, AIResponse } from '../types';

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

      // Simulate AI processing
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

  private async processMessage(message: string, _context?: Record<string, unknown>): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

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
