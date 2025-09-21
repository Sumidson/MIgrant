import { HealthInsight, AIResponse } from '../types';

export class HealthInsightsService {
  private static instance: HealthInsightsService;

  static getInstance(): HealthInsightsService {
    if (!HealthInsightsService.instance) {
      HealthInsightsService.instance = new HealthInsightsService();
    }
    return HealthInsightsService.instance;
  }

  async generateInsights(patientData: any): Promise<AIResponse<HealthInsight[]>> {
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const insights = this.analyzePatientData(patientData);

      return {
        success: true,
        data: insights
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Insights generation failed'
      };
    }
  }

  private analyzePatientData(patientData: any): HealthInsight[] {
    const insights: HealthInsight[] = [];

    // Analyze vital signs trends
    if (patientData.vitals) {
      const vitalInsights = this.analyzeVitalSigns(patientData.vitals);
      insights.push(...vitalInsights);
    }

    // Analyze appointment patterns
    if (patientData.appointments) {
      const appointmentInsights = this.analyzeAppointmentPatterns(patientData.appointments);
      insights.push(...appointmentInsights);
    }

    // Analyze medication adherence
    if (patientData.medications) {
      const medicationInsights = this.analyzeMedicationAdherence(patientData.medications);
      insights.push(...medicationInsights);
    }

    // Generate lifestyle recommendations
    const lifestyleInsights = this.generateLifestyleRecommendations(patientData);
    insights.push(...lifestyleInsights);

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private analyzeVitalSigns(vitals: any[]): HealthInsight[] {
    const insights: HealthInsight[] = [];

    if (vitals.length < 2) return insights;

    const latest = vitals[0];
    const previous = vitals[1];

    // Blood pressure analysis
    if (latest.bloodPressure && previous.bloodPressure) {
      const [currentSystolic, currentDiastolic] = latest.bloodPressure.split('/').map(Number);
      const [prevSystolic, prevDiastolic] = previous.bloodPressure.split('/').map(Number);

      if (currentSystolic > 140 || currentDiastolic > 90) {
        insights.push({
          id: `bp-high-${Date.now()}`,
          type: 'alert',
          title: 'High Blood Pressure Detected',
          description: `Your blood pressure is ${latest.bloodPressure}, which is above normal range. Please consult your doctor.`,
          priority: 'high',
          category: 'vitals',
          timestamp: new Date(),
          actionable: true,
          actionText: 'Schedule BP Check'
        });
      } else if (currentSystolic < prevSystolic - 10) {
        insights.push({
          id: `bp-improvement-${Date.now()}`,
          type: 'achievement',
          title: 'Blood Pressure Improvement',
          description: 'Great! Your blood pressure has improved compared to your last reading.',
          priority: 'low',
          category: 'vitals',
          timestamp: new Date(),
          actionable: false
        });
      }
    }

    // Weight analysis
    if (latest.weight && previous.weight) {
      const weightChange = latest.weight - previous.weight;
      if (Math.abs(weightChange) > 2) {
        insights.push({
          id: `weight-change-${Date.now()}`,
          type: 'trend',
          title: 'Significant Weight Change',
          description: `Your weight has changed by ${weightChange > 0 ? '+' : ''}${weightChange}kg since your last visit.`,
          priority: 'medium',
          category: 'vitals',
          timestamp: new Date(),
          actionable: true,
          actionText: 'Discuss with Doctor'
        });
      }
    }

    return insights;
  }

  private analyzeAppointmentPatterns(appointments: any[]): HealthInsight[] {
    const insights: HealthInsight[] = [];

    if (appointments.length === 0) return insights;

    const recentAppointments = appointments.filter(apt => 
      new Date(apt.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (recentAppointments.length > 3) {
      insights.push({
        id: `frequent-visits-${Date.now()}`,
        type: 'trend',
        title: 'Frequent Medical Visits',
        description: 'You\'ve had multiple appointments recently. Consider discussing a comprehensive health plan with your doctor.',
        priority: 'medium',
        category: 'appointment',
        timestamp: new Date(),
        actionable: true,
        actionText: 'Schedule Review'
      });
    }

    return insights;
  }

  private analyzeMedicationAdherence(medications: any[]): HealthInsight[] {
    const insights: HealthInsight[] = [];

    medications.forEach(med => {
      if (med.adherence && med.adherence < 80) {
        insights.push({
          id: `med-adherence-${med.id}`,
          type: 'alert',
          title: 'Medication Adherence Alert',
          description: `Your adherence to ${med.name} is ${med.adherence}%. Consistent medication is important for effective treatment.`,
          priority: 'high',
          category: 'medication',
          timestamp: new Date(),
          actionable: true,
          actionText: 'Set Reminders'
        });
      }
    });

    return insights;
  }

  private generateLifestyleRecommendations(patientData: any): HealthInsight[] {
    const insights: HealthInsight[] = [];

    // General health recommendations
    insights.push({
      id: `lifestyle-general-${Date.now()}`,
      type: 'recommendation',
      title: 'Maintain Healthy Lifestyle',
      description: 'Continue following a balanced diet, regular exercise, and adequate sleep for optimal health.',
      priority: 'low',
      category: 'lifestyle',
      timestamp: new Date(),
      actionable: true,
      actionText: 'View Health Tips'
    });

    // Seasonal recommendations
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 5 && currentMonth <= 8) { // Summer months
      insights.push({
        id: `summer-health-${Date.now()}`,
        type: 'recommendation',
        title: 'Summer Health Tips',
        description: 'Stay hydrated, use sunscreen, and be cautious of heat-related illnesses during summer months.',
        priority: 'low',
        category: 'lifestyle',
        timestamp: new Date(),
        actionable: true,
        actionText: 'Learn More'
      });
    }

    return insights;
  }
}
