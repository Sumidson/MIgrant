import { NextRequest, NextResponse } from 'next/server';

// Gemini AI Configuration
const GEMINI_API_KEY = 'AIzaSyADlGVj94QGHvrA774e305kkFFZ5ROY3Ls';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface HealthInsightsRequest {
  patientData: {
    vitals?: any[];
    appointments?: any[];
    medications?: string[];
  };
}

interface HealthInsight {
  id: string;
  type: 'trend' | 'alert' | 'recommendation' | 'achievement';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'vitals' | 'medication' | 'appointment' | 'lifestyle';
  timestamp: string;
  actionable: boolean;
  actionText?: string;
}

interface HealthInsightsResponse {
  success: boolean;
  data?: HealthInsight[];
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<HealthInsightsResponse>> {
  try {
    const body: HealthInsightsRequest = await request.json();
    const { patientData } = body;

    if (!patientData) {
      return NextResponse.json(
        { success: false, error: 'Patient data is required' },
        { status: 400 }
      );
    }

    // Call Gemini AI API for health insights
    const insights = await generateInsightsWithAI(patientData);

    return NextResponse.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error('Health insights API error:', error);
    
    // Return fallback insights
    const fallbackInsights = getFallbackInsights();
    
    return NextResponse.json({
      success: true,
      data: fallbackInsights
    });
  }
}

async function generateInsightsWithAI(patientData: any): Promise<HealthInsight[]> {
  const prompt = buildInsightsPrompt(patientData);
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.4, // Moderate temperature for balanced insights
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
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
    const aiResponse = data.candidates[0].content.parts[0].text;
    return parseInsightsResponse(aiResponse);
  } else {
    throw new Error('Invalid response format from Gemini API');
  }
}

function buildInsightsPrompt(patientData: any): string {
  const vitalsInfo = patientData.vitals ? `Vitals: ${JSON.stringify(patientData.vitals)}` : 'No vital signs data';
  const appointmentsInfo = patientData.appointments ? `Appointments: ${JSON.stringify(patientData.appointments)}` : 'No appointment data';
  const medicationsInfo = patientData.medications ? `Medications: ${JSON.stringify(patientData.medications)}` : 'No medication data';
  
  return `You are a medical AI assistant for MigrantCare, a healthcare platform for migrant workers in Kerala, India. Analyze the following patient data and generate health insights.

Patient Data:
${vitalsInfo}
${appointmentsInfo}
${medicationsInfo}

Please provide health insights in the following JSON format:
[
  {
    "id": "unique-id",
    "type": "trend|alert|recommendation|achievement",
    "title": "Insight title",
    "description": "Detailed description",
    "priority": "low|medium|high",
    "category": "vitals|medication|appointment|lifestyle",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "actionable": true|false,
    "actionText": "Action button text (optional)"
  }
]

Guidelines:
1. Generate 3-5 relevant insights based on the data
2. Focus on trends, patterns, and actionable recommendations
3. Be conservative with alerts - only flag genuine concerns
4. Consider the context of migrant workers with limited healthcare access
5. Provide practical, culturally sensitive advice
6. Always encourage professional medical consultation for serious concerns
7. Include both positive achievements and areas for improvement
8. Make insights specific and actionable

Respond only with valid JSON array, no additional text.`;
}

function parseInsightsResponse(aiResponse: string): HealthInsight[] {
  try {
    // Clean the response to extract JSON
    const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON array found in AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate and format the insights
    return parsed.map((insight: any, index: number) => ({
      id: insight.id || `ai-insight-${Date.now()}-${index}`,
      type: insight.type || 'recommendation',
      title: insight.title || 'Health Insight',
      description: insight.description || 'No description available',
      priority: insight.priority || 'medium',
      category: insight.category || 'lifestyle',
      timestamp: insight.timestamp || new Date().toISOString(),
      actionable: insight.actionable || false,
      actionText: insight.actionText
    }));
  } catch (error) {
    console.error('Failed to parse AI insights response:', error);
    // Return a safe fallback
    return [{
      id: `fallback-insight-${Date.now()}`,
      type: 'recommendation',
      title: 'Health Monitoring',
      description: 'Continue regular health monitoring and consult with healthcare professionals as needed.',
      priority: 'low',
      category: 'lifestyle',
      timestamp: new Date().toISOString(),
      actionable: true,
      actionText: 'Learn More'
    }];
  }
}

function getFallbackInsights(): HealthInsight[] {
  return [
    {
      id: `fallback-insight-${Date.now()}`,
      type: 'recommendation',
      title: 'Regular Health Checkups',
      description: 'Schedule regular health checkups to maintain good health and catch any issues early.',
      priority: 'medium',
      category: 'appointment',
      timestamp: new Date().toISOString(),
      actionable: true,
      actionText: 'Schedule Checkup'
    },
    {
      id: `fallback-insight-${Date.now() + 1}`,
      type: 'achievement',
      title: 'Health Monitoring',
      description: 'Keep track of your health metrics and maintain a healthy lifestyle.',
      priority: 'low',
      category: 'lifestyle',
      timestamp: new Date().toISOString(),
      actionable: false
    }
  ];
}
