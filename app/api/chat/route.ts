import { NextRequest, NextResponse } from 'next/server';

// Gemini AI Configuration
const GEMINI_API_KEY = 'AIzaSyADlGVj94QGHvrA774e305kkFFZ5ROY3Ls';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface ChatRequest {
  message: string;
  context?: {
    userType?: 'admin' | 'patient' | 'public';
    patientId?: string;
    patientName?: string;
    page?: string;
  };
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  let body: ChatRequest = { message: '' };
  
  try {
    body = await request.json();
    const { message, context } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build system prompt based on context
    const systemPrompt = buildSystemPrompt(context);

    // Call Gemini AI API
    const aiResponse = await callGeminiAPI(message, systemPrompt);

    return NextResponse.json({
      success: true,
      message: aiResponse
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return fallback response
    const fallbackResponse = getFallbackResponse(body?.message || 'Hello');
    
    return NextResponse.json({
      success: true,
      message: fallbackResponse
    });
  }
}

async function callGeminiAPI(message: string, systemPrompt: string): Promise<string> {
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
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
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

function buildSystemPrompt(context?: ChatRequest['context']): string {
  const basePrompt = `You are an AI health assistant for MigrantCare, a healthcare platform for migrant workers in Kerala, India. You provide helpful, accurate, and empathetic health guidance while always emphasizing the importance of consulting with qualified healthcare professionals.

Key guidelines:
1. Always prioritize patient safety and recommend professional medical consultation
2. Provide general health information and guidance
3. Be empathetic and understanding of migrant workers' unique challenges
4. Suggest appropriate healthcare resources and services
5. Never provide specific medical diagnoses or treatment recommendations
6. Always encourage seeking professional medical help for serious concerns
7. Be culturally sensitive and aware of language barriers
8. Provide information in simple, clear language`;

  if (context) {
    if (context.userType === 'admin') {
      return `${basePrompt}\n\nYou are currently assisting an admin user who manages the healthcare system. You can provide more detailed administrative guidance and system information.`;
    } else if (context.userType === 'patient') {
      return `${basePrompt}\n\nYou are currently assisting a patient. Focus on their health concerns and provide supportive guidance.`;
    } else if (context.patientId) {
      return `${basePrompt}\n\nYou are currently assisting with patient ID: ${context.patientId}. You can reference their medical history and provide personalized guidance.`;
    }
  }

  return basePrompt;
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Health-related responses
  if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('ache')) {
    return "I understand you're experiencing some symptoms. For proper medical evaluation, I recommend scheduling an appointment with a healthcare provider. In the meantime, please monitor your symptoms and seek immediate medical attention if they worsen.";
  }

  // Appointment-related responses
  if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('book')) {
    return "I can help you schedule an appointment! You can book appointments through our online portal or by calling our helpline. Would you like me to show you available time slots or help you find a suitable medical center?";
  }

  // General medical queries
  if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug')) {
    return "For medication-related queries, it's important to consult with a healthcare provider or pharmacist. They can provide accurate information about dosages, interactions, and side effects. Never self-medicate without professional guidance.";
  }

  // Emergency responses
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('help')) {
    return "🚨 If this is a medical emergency, please call emergency services immediately at 108 or visit the nearest emergency room. For non-emergency urgent care, I can help you find nearby medical facilities.";
  }

  // Default response
  return "I'm here to help with your healthcare needs. You can ask me about symptoms, appointments, medications, or general health questions. How can I assist you today?";
}
