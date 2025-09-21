# AI Services for MigrantCare

This folder contains AI-powered features for the MigrantCare healthcare platform, designed specifically for migrant workers and their families. The AI services are powered by Google's Gemini AI API for intelligent, context-aware responses.

## Features

### 1. AI Chat Assistant (`components/AIChatWidget.tsx`)
- 24/7 health consultation support
- Context-aware responses
- Multi-language support
- Emergency guidance
- Integrated across all pages

### 2. Symptom Analysis (`components/SymptomAnalyzer.tsx`)
- AI-powered preliminary symptom analysis
- Severity assessment
- Condition suggestions with probability scores
- Urgency recommendations
- Integration with patient data

### 3. Health Insights (`components/HealthInsightsPanel.tsx`)
- Personalized health trend analysis
- Proactive health alerts
- Lifestyle recommendations
- Progress tracking
- Medication adherence monitoring

### 4. Smart Appointment Scheduling (`services/appointmentService.ts`)
- AI-optimized appointment suggestions
- Schedule optimization
- Resource allocation
- Priority-based scheduling

## Services

### ChatService
- Handles AI chat interactions
- Context-aware message processing
- Response generation for different query types

### SymptomAnalysisService
- Analyzes patient symptoms
- Generates condition suggestions
- Provides urgency recommendations
- Creates treatment recommendations

### HealthInsightsService
- Generates personalized health insights
- Analyzes vital signs trends
- Monitors appointment patterns
- Tracks medication adherence

### AppointmentService
- Suggests optimal appointment times
- Optimizes scheduling
- Manages resource allocation

## Hooks

### useAIChat
- Manages chat state and interactions
- Handles message sending and receiving
- Provides loading and error states

### useSymptomAnalysis
- Manages symptom analysis workflow
- Handles analysis results
- Provides loading and error states

### useHealthInsights
- Manages health insights generation
- Auto-generates insights from patient data
- Provides loading and error states

## Integration

The AI components are integrated into:
- Admin Dashboard (`app/auth/admin/dashboard/page.tsx`)
- Patient Details Page (`app/auth/patients/[id]/page.tsx`)
- Main Homepage (`app/page.tsx`)
- Dedicated AI Services Page (`app/ai-services/page.tsx`)

## Usage

```tsx
import AIChatWidget from '@/ai/components/AIChatWidget'
import SymptomAnalyzer from '@/ai/components/SymptomAnalyzer'
import HealthInsightsPanel from '@/ai/components/HealthInsightsPanel'

// In your component
<AIChatWidget 
  isOpen={isChatOpen}
  onToggle={() => setIsChatOpen(!isChatOpen)}
  context={{ userType: 'admin', patientId: '123' }}
/>

<SymptomAnalyzer 
  patientAge={30}
  patientGender="Male"
  onAnalysisComplete={(analysis) => console.log(analysis)}
/>

<HealthInsightsPanel 
  patientData={patientData}
/>
```

## Gemini AI Integration

The AI services are powered by Google's Gemini AI API with the following features:

### Configuration (`config/gemini.ts`)
- Centralized API key and configuration management
- Custom system prompts for different use cases
- Safety settings for medical content
- Optimized generation parameters

### API Features
- **Real-time AI responses** using Gemini Pro model
- **Context-aware conversations** with user type detection
- **Medical safety filters** to prevent harmful content
- **Fallback mechanisms** for API failures
- **Structured JSON responses** for symptom analysis and insights

### Safety & Compliance
- Medical content safety filters
- Conservative health recommendations
- Professional medical consultation emphasis
- Cultural sensitivity for migrant workers
- No specific medical diagnoses provided

## Testing

Run the Gemini integration test:
```typescript
import { testGeminiIntegration } from '@/ai/test/gemini-test';

// Test the AI integration
testGeminiIntegration().then(success => {
  console.log('AI integration test:', success ? 'PASSED' : 'FAILED');
});
```

## Future Enhancements

- Voice-based interactions
- Image analysis for medical documents
- Predictive health analytics
- Multi-language support expansion
- Integration with wearable devices
- Advanced medical knowledge base integration
