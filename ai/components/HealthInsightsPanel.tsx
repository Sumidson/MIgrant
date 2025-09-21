'use client'
import { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  Heart, 
  Calendar, 
  Pill, 
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useHealthInsights } from '../hooks/useHealthInsights';

interface HealthInsightsPanelProps {
  patientData?: any;
  className?: string;
}

export default function HealthInsightsPanel({ patientData, className = '' }: HealthInsightsPanelProps) {
  const { insights, isLoading, error, generateInsights } = useHealthInsights(patientData);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-5 w-5" />;
      case 'alert': return <AlertTriangle className="h-5 w-5" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5" />;
      case 'achievement': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitals': return <Heart className="h-4 w-4" />;
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'lifestyle': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-slate-500 bg-slate-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trend': return 'text-blue-600';
      case 'alert': return 'text-red-600';
      case 'recommendation': return 'text-purple-600';
      case 'achievement': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {} as Record<string, any[]>);

  if (isLoading) {
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${className}`}>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Health Insights</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${className}`}>
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Health Insights</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Health Insights</h2>
        </div>
        <button
          onClick={() => generateInsights(patientData)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Refresh
        </button>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No insights available. Complete more health activities to generate insights.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedInsights).map(([category, categoryInsights]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                {getCategoryIcon(category)}
                <h3 className="font-semibold text-slate-900 capitalize">{category} Insights</h3>
              </div>
              
              {categoryInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`border-l-4 rounded-r-xl p-4 ${getPriorityColor(insight.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`flex-shrink-0 ${getTypeColor(insight.type)}`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-slate-700 mb-2">{insight.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span className="capitalize">{insight.type}</span>
                          <span className="capitalize">{insight.priority} priority</span>
                          <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {insight.actionable && (
                      <div className="flex items-center space-x-2">
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                          {insight.actionText || 'Take Action'}
                        </button>
                        <button
                          onClick={() => setExpandedInsight(
                            expandedInsight === insight.id ? null : insight.id
                          )}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {expandedInsight === insight.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {expandedInsight === insight.id && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-slate-600">
                          Additional details and recommendations for this insight will be displayed here.
                        </p>
                        {insight.actionable && (
                          <div className="mt-2 flex space-x-2">
                            <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                              Mark as Read
                            </button>
                            <button className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded-full hover:bg-slate-300 transition-colors">
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
