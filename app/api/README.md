# MigrantCare AI API

This directory contains the backend API endpoints for the MigrantCare AI services, powered by Google's Gemini AI.

## API Endpoints

### 1. Chat API
**POST** `/api/chat`

Send a message to the AI health assistant.

**Request Body:**
```json
{
  "message": "I have a headache, what should I do?",
  "context": {
    "userType": "patient",
    "patientId": "123",
    "patientName": "John Doe"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "I understand you're experiencing a headache. For proper medical evaluation, I recommend scheduling an appointment with a healthcare provider..."
}
```

### 2. Symptom Analysis API
**POST** `/api/symptoms/analyze`

Analyze patient symptoms using AI.

**Request Body:**
```json
{
  "symptoms": ["headache", "fever", "nausea"],
  "patientAge": 30,
  "patientGender": "Male"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "symptoms": ["headache", "fever", "nausea"],
    "severity": "medium",
    "suggestedConditions": [
      {
        "condition": "Viral Infection",
        "probability": 0.7,
        "description": "Common viral infection causing headache and fever"
      }
    ],
    "recommendations": [
      "Consult with a healthcare professional",
      "Monitor symptoms closely"
    ],
    "urgency": "routine"
  }
}
```

### 3. Health Insights API
**POST** `/api/insights/generate`

Generate personalized health insights based on patient data.

**Request Body:**
```json
{
  "patientData": {
    "vitals": [
      { "bloodPressure": "135/85", "weight": 70, "date": "2025-01-20" }
    ],
    "appointments": [
      { "date": "2025-01-20", "type": "checkup" }
    ],
    "medications": ["Amlodipine 5mg"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "insight-1",
      "type": "alert",
      "title": "High Blood Pressure Detected",
      "description": "Your blood pressure is above normal range. Please consult your doctor.",
      "priority": "high",
      "category": "vitals",
      "timestamp": "2025-01-20T00:00:00.000Z",
      "actionable": true,
      "actionText": "Schedule BP Check"
    }
  ]
}
```

### 4. API Status
**GET** `/api/status`

Check API health and available endpoints.

**Response:**
```json
{
  "status": "ok",
  "message": "MigrantCare AI API is running",
  "timestamp": "2025-01-20T00:00:00.000Z",
  "endpoints": {
    "chat": "/api/chat",
    "symptoms": "/api/symptoms/analyze",
    "insights": "/api/insights/generate",
    "status": "/api/status"
  }
}
```

## Features

- **Gemini AI Integration**: Powered by Google's Gemini Pro model
- **Medical Safety**: Content filters and conservative recommendations
- **Fallback Responses**: Rule-based responses if AI fails
- **Context Awareness**: User type and patient-specific responses
- **Error Handling**: Comprehensive error handling and logging

## Testing

Visit `/api-test` to run the API test suite and verify all endpoints are working correctly.

## Security

- API keys are stored server-side
- Input validation and sanitization
- Rate limiting (can be added)
- CORS configuration (can be added)

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid input)
- `500`: Internal Server Error
