'use client'
import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, Heart, Activity } from 'lucide-react';
import { useSymptomAnalysis } from '../hooks/useSymptomAnalysis';

interface SymptomAnalyzerProps {
  patientAge?: number;
  patientGender?: string;
  onAnalysisComplete?: (analysis: any) => void;
}

export default function SymptomAnalyzer({ patientAge, patientGender, onAnalysisComplete }: SymptomAnalyzerProps) {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const { analysis, isLoading, error, analyzeSymptoms, clearAnalysis } = useSymptomAnalysis();

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Nausea', 'Dizziness', 'Fatigue',
    'Chest Pain', 'Shortness of Breath', 'Stomach Pain', 'Back Pain',
    'Joint Pain', 'Rash', 'Sore Throat', 'Runny Nose', 'Body Aches'
  ];

  const addSymptom = (symptom: string) => {
    if (symptom.trim() && !symptoms.includes(symptom.trim())) {
      const newSymptoms = [...symptoms, symptom.trim()];
      setSymptoms(newSymptoms);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(s => s !== symptomToRemove));
  };

  const handleAnalyze = async () => {
    if (symptoms.length === 0) return;
    await analyzeSymptoms(symptoms, patientAge, patientGender);
    if (analysis && onAnalysisComplete) {
      onAnalysisComplete(analysis);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'urgent': return <Clock className="h-5 w-5 text-orange-600" />;
      case 'routine': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Activity className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-slate-900">Symptom Analysis</h2>
      </div>

      {/* Symptom Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Describe your symptoms
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            placeholder="Enter a symptom..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addSymptom(currentSymptom)}
          />
          <button
            onClick={() => addSymptom(currentSymptom)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Common Symptoms */}
        <div className="mt-3">
          <p className="text-sm text-slate-600 mb-2">Common symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => addSymptom(symptom)}
                className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Symptoms */}
        {symptoms.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700 mb-2">Selected symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {symptom}
                  <button
                    onClick={() => removeSymptom(symptom)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleAnalyze}
          disabled={symptoms.length === 0 || isLoading}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Analyze Symptoms
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Severity and Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Severity Level</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(analysis.severity)}`}>
                {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Urgency</h3>
              <div className="flex items-center space-x-2">
                {getUrgencyIcon(analysis.urgency)}
                <span className="text-sm font-medium text-slate-700">
                  {analysis.urgency.charAt(0).toUpperCase() + analysis.urgency.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Suggested Conditions */}
          {analysis.suggestedConditions.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Possible Conditions</h3>
              <div className="space-y-2">
                {analysis.suggestedConditions.map((condition, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="font-medium text-slate-900">{condition.condition}</p>
                      <p className="text-sm text-slate-600">{condition.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        {Math.round(condition.probability * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Clear Analysis */}
      {analysis && (
        <div className="mt-4 text-center">
          <button
            onClick={clearAnalysis}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Clear Analysis
          </button>
        </div>
      )}
    </div>
  );
}
