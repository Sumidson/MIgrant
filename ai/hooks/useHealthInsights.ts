import { useState, useCallback, useEffect } from 'react';
import { HealthInsight, AIResponse } from '../types';
import { HealthInsightsService } from '../services/healthInsightsService';

export const useHealthInsights = (patientData?: any) => {
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insightsService = HealthInsightsService.getInstance();

  const generateInsights = useCallback(async (data?: any) => {
    const dataToAnalyze = data || patientData;
    if (!dataToAnalyze) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: AIResponse<HealthInsight[]> = await insightsService.generateInsights(dataToAnalyze);
      
      if (response.success && response.data) {
        setInsights(response.data);
      } else {
        setError(response.error || 'Insights generation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [patientData]);

  const clearInsights = useCallback(() => {
    setInsights([]);
    setError(null);
  }, []);

  // Auto-generate insights when patientData changes
  useEffect(() => {
    if (patientData) {
      generateInsights();
    }
  }, [patientData, generateInsights]);

  return {
    insights,
    isLoading,
    error,
    generateInsights,
    clearInsights
  };
};
