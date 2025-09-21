import { NextRequest, NextResponse } from 'next/server';

// Gemini AI Configuration
const GEMINI_API_KEY = 'AIzaSyADlGVj94QGHvrA774e305kkFFZ5ROY3Ls';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface SymptomAnalysisRequest {
  symptoms: string[];
  patientAge?: number;
  patientGender?: string;
}

interface SymptomAnalysisResponse {
  success: boolean;
  data?: {
    symptoms: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    suggestedConditions: {
      condition: string;
      probability: number;
      description: string;
    }[];
    recommendations: string[];
    urgency: 'routine' | 'urgent' | 'emergency';
  };
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SymptomAnalysisResponse>> {
  let body: SymptomAnalysisRequest = { symptoms: [] };
  
  try {
    body = await request.json();
    const { symptoms, patientAge, patientGender } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Symptoms array is required' },
        { status: 400 }
      );
    }

    // Call Gemini AI API for symptom analysis
    const analysis = await analyzeSymptomsWithAI(symptoms, patientAge, patientGender);

    return NextResponse.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('Symptom analysis API error:', error);
    
    // Return fallback analysis
    const fallbackAnalysis = getFallbackAnalysis(body.symptoms, body.patientAge, body.patientGender);
    
    return NextResponse.json({
      success: true,
      data: fallbackAnalysis
    });
  }
}

async function analyzeSymptomsWithAI(symptoms: string[], patientAge?: number, patientGender?: string) {
  const prompt = buildSymptomAnalysisPrompt(symptoms, patientAge, patientGender);
  
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
      temperature: 0.3, // Lower temperature for more consistent medical analysis
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
    return parseAIResponse(aiResponse, symptoms);
  } else {
    throw new Error('Invalid response format from Gemini API');
  }
}

function buildSymptomAnalysisPrompt(symptoms: string[], patientAge?: number, patientGender?: string): string {
  const ageGenderInfo = patientAge && patientGender ? `Patient: ${patientAge} years old, ${patientGender}` : 'Patient information not provided';
  
  return `You are a medical AI assistant for MigrantCare, a healthcare platform for migrant workers in Kerala, India. Analyze the following symptoms and provide a structured response.

${ageGenderInfo}
Symptoms: ${symptoms.join(', ')}

Please provide your analysis in the following JSON format:
{
  "severity": "low|medium|high|critical",
  "suggestedConditions": [
    {
      "condition": "condition name",
      "probability": 0.0-1.0,
      "description": "brief description"
    }
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2"
  ],
  "urgency": "routine|urgent|emergency"
}

Important guidelines:
1. Always prioritize patient safety
2. Be conservative with severity and urgency assessments
3. Never provide specific medical diagnoses
4. Always recommend professional medical consultation
5. Consider the context of migrant workers who may have limited healthcare access
6. Provide practical, actionable recommendations
7. If symptoms suggest emergency, set urgency to "emergency"
8. Be culturally sensitive and consider language barriers

Respond only with valid JSON, no additional text.`;
}

function parseAIResponse(aiResponse: string, symptoms: string[]) {
  try {
    // Clean the response to extract JSON
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      symptoms,
      severity: parsed.severity || 'medium',
      suggestedConditions: parsed.suggestedConditions || [],
      recommendations: parsed.recommendations || ['Consult with a healthcare professional'],
      urgency: parsed.urgency || 'routine'
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    // Return a safe fallback
    return {
      symptoms,
      severity: 'medium',
      suggestedConditions: [{
        condition: 'General Health Concern',
        probability: 0.5,
        description: 'Symptoms require professional medical evaluation'
      }],
      recommendations: [
        'Consult with a healthcare professional',
        'Monitor symptoms closely',
        'Seek immediate medical attention if symptoms worsen'
      ],
      urgency: 'routine'
    };
  }
}

function getFallbackAnalysis(symptoms: string[], patientAge?: number, patientGender?: string) {
  const symptomKeywords = symptoms.join(' ').toLowerCase();
  
  // Determine severity based on symptoms
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (symptomKeywords.includes('severe') || symptomKeywords.includes('emergency')) {
    severity = 'critical';
  } else if (symptomKeywords.includes('pain') || symptomKeywords.includes('fever')) {
    severity = 'high';
  } else if (symptomKeywords.includes('ache') || symptomKeywords.includes('discomfort')) {
    severity = 'medium';
  }

  // Generate basic recommendations
  const recommendations = [
    'Consult with a healthcare professional',
    'Monitor symptoms closely',
    'Keep a symptom diary',
    'Seek immediate medical attention if symptoms worsen'
  ];

  return {
    symptoms,
    severity,
    suggestedConditions: [{
      condition: 'General Health Concern',
      probability: 0.5,
      description: 'Symptoms require professional medical evaluation'
    }],
    recommendations,
    urgency: (severity === 'critical' ? 'emergency' : severity === 'high' ? 'urgent' : 'routine') as 'routine' | 'urgent' | 'emergency'
  };
}
