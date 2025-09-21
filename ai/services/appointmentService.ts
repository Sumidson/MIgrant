import { AppointmentSuggestion, AIResponse } from '../types';

export class AppointmentService {
  private static instance: AppointmentService;

  static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  async suggestAppointments(patientData: any, preferences?: any): Promise<AIResponse<AppointmentSuggestion[]>> {
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const suggestions = this.generateAppointmentSuggestions(patientData, preferences);

      return {
        success: true,
        data: suggestions
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Appointment suggestions failed'
      };
    }
  }

  private generateAppointmentSuggestions(patientData: any, preferences?: any): AppointmentSuggestion[] {
    const suggestions: AppointmentSuggestion[] = [];

    // Check if patient needs routine checkup
    if (this.needsRoutineCheckup(patientData)) {
      suggestions.push({
        id: `routine-${Date.now()}`,
        suggestedTime: this.getNextAvailableTime(7), // 7 days from now
        reason: 'Routine health checkup recommended',
        priority: 'medium',
        estimatedDuration: 30,
        doctorType: 'General Practitioner'
      });
    }

    // Check for follow-up appointments
    if (this.needsFollowUp(patientData)) {
      suggestions.push({
        id: `followup-${Date.now()}`,
        suggestedTime: this.getNextAvailableTime(14), // 14 days from now
        reason: 'Follow-up appointment for ongoing treatment',
        priority: 'high',
        estimatedDuration: 45,
        doctorType: 'Specialist'
      });
    }

    // Check for vaccination reminders
    if (this.needsVaccination(patientData)) {
      suggestions.push({
        id: `vaccination-${Date.now()}`,
        suggestedTime: this.getNextAvailableTime(3), // 3 days from now
        reason: 'Vaccination due',
        priority: 'medium',
        estimatedDuration: 15,
        doctorType: 'Nurse'
      });
    }

    // Check for urgent care needs
    if (this.needsUrgentCare(patientData)) {
      suggestions.push({
        id: `urgent-${Date.now()}`,
        suggestedTime: this.getNextAvailableTime(1), // 1 day from now
        reason: 'Urgent medical attention required',
        priority: 'high',
        estimatedDuration: 60,
        doctorType: 'Emergency Medicine'
      });
    }

    return suggestions;
  }

  private needsRoutineCheckup(patientData: any): boolean {
    if (!patientData.lastVisit) return true;
    
    const lastVisit = new Date(patientData.lastVisit);
    const daysSinceLastVisit = (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceLastVisit > 365; // More than a year
  }

  private needsFollowUp(patientData: any): boolean {
    if (!patientData.medicalRecords) return false;
    
    const recentRecords = patientData.medicalRecords.filter((record: any) => 
      new Date(record.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    
    return recentRecords.some((record: any) => 
      record.status === 'Follow-up Required' || 
      record.type === 'Consultation'
    );
  }

  private needsVaccination(patientData: any): boolean {
    if (!patientData.vaccinations) return false;
    
    const lastVaccination = patientData.vaccinations[0];
    if (!lastVaccination) return true;
    
    const lastVaccinationDate = new Date(lastVaccination.date);
    const daysSinceLastVaccination = (Date.now() - lastVaccinationDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceLastVaccination > 180; // More than 6 months
  }

  private needsUrgentCare(patientData: any): boolean {
    if (!patientData.symptoms) return false;
    
    const urgentSymptoms = ['severe pain', 'difficulty breathing', 'chest pain', 'high fever'];
    const symptomText = patientData.symptoms.join(' ').toLowerCase();
    
    return urgentSymptoms.some(symptom => symptomText.includes(symptom));
  }

  private getNextAvailableTime(daysFromNow: number): Date {
    const now = new Date();
    const suggestedDate = new Date(now.getTime() + daysFromNow * 24 * 60 * 60 * 1000);
    
    // Set to a reasonable time (9 AM)
    suggestedDate.setHours(9, 0, 0, 0);
    
    return suggestedDate;
  }

  async optimizeSchedule(appointments: any[]): Promise<AIResponse<any>> {
    try {
      // Simulate AI optimization
      await new Promise(resolve => setTimeout(resolve, 500));

      const optimized = this.performScheduleOptimization(appointments);

      return {
        success: true,
        data: optimized
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Schedule optimization failed'
      };
    }
  }

  private performScheduleOptimization(appointments: any[]): any {
    // Simple optimization: sort by priority and suggest time slots
    const sorted = appointments.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return {
      optimizedSchedule: sorted,
      suggestions: [
        'Consider grouping similar appointments together',
        'Schedule high-priority appointments in the morning',
        'Allow buffer time between appointments'
      ]
    };
  }
}
