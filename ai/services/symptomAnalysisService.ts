import { SymptomAnalysis, AIResponse } from '../types';

export class SymptomAnalysisService {
  private static instance: SymptomAnalysisService;

  static getInstance(): SymptomAnalysisService {
    if (!SymptomAnalysisService.instance) {
      SymptomAnalysisService.instance = new SymptomAnalysisService();
    }
    return SymptomAnalysisService.instance;
  }

  async analyzeSymptoms(symptoms: string[], patientAge?: number, gender?: string): Promise<AIResponse<SymptomAnalysis>> {
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysis = this.performSymptomAnalysis(symptoms, patientAge, gender);

      return {
        success: true,
        data: analysis
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed'
      };
    }
  }

  private performSymptomAnalysis(symptoms: string[], patientAge?: number, gender?: string): SymptomAnalysis {
    const symptomKeywords = symptoms.join(' ').toLowerCase();
    
    // Determine severity based on symptoms
    const severity = this.calculateSeverity(symptomKeywords);
    
    // Generate suggested conditions
    const suggestedConditions = this.generateConditionSuggestions(symptomKeywords, patientAge, gender);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(symptomKeywords, severity);
    
    // Determine urgency
    const urgency = this.determineUrgency(severity, symptomKeywords);

    return {
      symptoms,
      severity,
      suggestedConditions,
      recommendations,
      urgency
    };
  }

  private calculateSeverity(symptomKeywords: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalKeywords = ['severe', 'intense', 'unbearable', 'emergency', 'chest pain', 'difficulty breathing', 'loss of consciousness'];
    const highKeywords = ['severe', 'persistent', 'fever', 'nausea', 'vomiting', 'dizziness'];
    const mediumKeywords = ['moderate', 'mild', 'ache', 'pain', 'discomfort'];

    if (criticalKeywords.some(keyword => symptomKeywords.includes(keyword))) {
      return 'critical';
    }
    if (highKeywords.some(keyword => symptomKeywords.includes(keyword))) {
      return 'high';
    }
    if (mediumKeywords.some(keyword => symptomKeywords.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  private generateConditionSuggestions(symptomKeywords: string, patientAge?: number, gender?: string) {
    const conditions = [];

    // Common condition patterns
    if (symptomKeywords.includes('headache') && symptomKeywords.includes('fever')) {
      conditions.push({
        condition: 'Viral Infection',
        probability: 0.7,
        description: 'Common viral infection causing headache and fever'
      });
    }

    if (symptomKeywords.includes('chest pain') || symptomKeywords.includes('chest discomfort')) {
      conditions.push({
        condition: 'Cardiovascular Issue',
        probability: 0.6,
        description: 'Chest pain may indicate heart-related conditions'
      });
    }

    if (symptomKeywords.includes('stomach') && symptomKeywords.includes('nausea')) {
      conditions.push({
        condition: 'Gastrointestinal Issue',
        probability: 0.8,
        description: 'Stomach-related symptoms suggesting digestive issues'
      });
    }

    if (symptomKeywords.includes('cough') && symptomKeywords.includes('cold')) {
      conditions.push({
        condition: 'Respiratory Infection',
        probability: 0.75,
        description: 'Upper respiratory tract infection'
      });
    }

    // Default condition if no specific pattern matches
    if (conditions.length === 0) {
      conditions.push({
        condition: 'General Health Concern',
        probability: 0.5,
        description: 'Symptoms require further evaluation by a healthcare professional'
      });
    }

    return conditions;
  }

  private generateRecommendations(symptomKeywords: string, severity: string): string[] {
    const recommendations = [];

    if (severity === 'critical') {
      recommendations.push('Seek immediate medical attention');
      recommendations.push('Call emergency services if symptoms worsen');
    } else if (severity === 'high') {
      recommendations.push('Schedule an urgent appointment with a healthcare provider');
      recommendations.push('Monitor symptoms closely');
    } else {
      recommendations.push('Consider scheduling a routine checkup');
      recommendations.push('Monitor symptoms and note any changes');
    }

    // Specific recommendations based on symptoms
    if (symptomKeywords.includes('fever')) {
      recommendations.push('Stay hydrated and rest');
      recommendations.push('Monitor temperature regularly');
    }

    if (symptomKeywords.includes('pain')) {
      recommendations.push('Apply appropriate pain relief measures');
      recommendations.push('Avoid activities that worsen the pain');
    }

    recommendations.push('Keep a symptom diary for your healthcare provider');
    recommendations.push('Don\'t self-diagnose - consult a medical professional');

    return recommendations;
  }

  private determineUrgency(severity: string, symptomKeywords: string): 'routine' | 'urgent' | 'emergency' {
    if (severity === 'critical' || symptomKeywords.includes('emergency')) {
      return 'emergency';
    }
    if (severity === 'high' || symptomKeywords.includes('urgent')) {
      return 'urgent';
    }
    return 'routine';
  }
}
