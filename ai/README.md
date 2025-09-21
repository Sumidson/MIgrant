# AI Services for MigrantCare

This folder contains AI-powered features for the MigrantCare healthcare platform, designed specifically for migrant workers and their families.

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

## Future Enhancements

- Integration with real AI models (OpenAI, etc.)
- Voice-based interactions
- Image analysis for medical documents
- Predictive health analytics
- Multi-language support expansion
- Integration with wearable devices
