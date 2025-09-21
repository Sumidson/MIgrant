import { useState, useCallback } from 'react';
import { SymptomAnalysis, AIResponse } from '../types';
import { SymptomAnalysisService } from '../services/symptomAnalysisService';

export const useSymptomAnalysis = () => {
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const symptomService = SymptomAnalysisService.getInstance();

  const analyzeSymptoms = useCallback(async (symptoms: string[], patientAge?: number, gender?: string) => {
    if (!symptoms.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: AIResponse<SymptomAnalysis> = await symptomService.analyzeSymptoms(symptoms, patientAge, gender);
      
      if (response.success && response.data) {
        setAnalysis(response.data);
      } else {
        setError(response.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    analysis,
    isLoading,
    error,
    analyzeSymptoms,
    clearAnalysis
  };
};
