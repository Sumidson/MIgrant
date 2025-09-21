'use client'
import { useState } from 'react';
import { Bot, TestTube, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

export default function APITestPage() {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsLoading(true);
    try {
      const result = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: { success: true, data: result }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const testAPIStatus = async () => {
    const response = await fetch('/api/status');
    return await response.json();
  };

  const testChatAPI = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Hello, I have a headache. What should I do?',
        context: { userType: 'patient' }
      })
    });
    return await response.json();
  };

  const testSymptomAnalysis = async () => {
    const response = await fetch('/api/symptoms/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symptoms: ['headache', 'fever'],
        patientAge: 30,
        patientGender: 'Male'
      })
    });
    return await response.json();
  };

  const testHealthInsights = async () => {
    const response = await fetch('/api/insights/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientData: {
          vitals: [
            { bloodPressure: '135/85', weight: 70, date: '2025-01-20' }
          ],
          appointments: [
            { date: '2025-01-20', type: 'checkup' }
          ],
          medications: ['Amlodipine 5mg']
        }
      })
    });
    return await response.json();
  };

  const runAllTests = async () => {
    await runTest('API Status', testAPIStatus);
    await runTest('Chat API', testChatAPI);
    await runTest('Symptom Analysis', testSymptomAnalysis);
    await runTest('Health Insights', testHealthInsights);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-4 rounded-2xl shadow-lg">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI API Test Suite</h1>
            <p className="text-slate-600">Test the MigrantCare AI backend APIs</p>
          </div>

          <div className="space-y-6">
            {/* Test Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => runTest('API Status', testAPIStatus)}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                API Status
              </button>

              <button
                onClick={() => runTest('Chat API', testChatAPI)}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                <Bot className="h-5 w-5 mr-2" />
                Chat API
              </button>

              <button
                onClick={() => runTest('Symptom Analysis', testSymptomAnalysis)}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all"
              >
                <TestTube className="h-5 w-5 mr-2" />
                Symptoms
              </button>

              <button
                onClick={() => runTest('Health Insights', testHealthInsights)}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 disabled:opacity-50 transition-all"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Insights
              </button>
            </div>

            {/* Run All Tests Button */}
            <div className="text-center">
              <button
                onClick={runAllTests}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 transition-all shadow-lg"
              >
                {isLoading ? 'Running Tests...' : 'Run All Tests'}
              </button>
            </div>

            {/* Test Results */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Test Results</h2>
              
              {Object.entries(testResults).map(([testName, result]) => (
                <div key={testName} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 capitalize">
                      {testName.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="flex items-center">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    {result.success ? (
                      <div>
                        <p className="text-green-600 font-medium mb-2">✅ Test Passed</p>
                        <pre className="bg-white p-3 rounded-lg border text-xs overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-600 font-medium mb-2">❌ Test Failed</p>
                        <p className="text-red-600 text-sm">{result.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {Object.keys(testResults).length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <Bot className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p>No tests run yet. Click a test button above to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
