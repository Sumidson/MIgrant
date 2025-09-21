// Simple test to verify API connection
async function testAPIConnection() {
  console.log('Testing API connection...');
  
  try {
    // Test API status
    const statusResponse = await fetch('http://localhost:3000/api/status');
    const statusData = await statusResponse.json();
    console.log('✅ API Status:', statusData);
    
    // Test Chat API
    const chatResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Hello, I have a headache. What should I do?',
        context: { userType: 'patient' }
      })
    });
    const chatData = await chatResponse.json();
    console.log('✅ Chat API:', chatData);
    
    // Test Symptom Analysis API
    const symptomResponse = await fetch('http://localhost:3000/api/symptoms/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symptoms: ['headache', 'fever'],
        patientAge: 30,
        patientGender: 'Male'
      })
    });
    const symptomData = await symptomResponse.json();
    console.log('✅ Symptom Analysis API:', symptomData);
    
    // Test Health Insights API
    const insightsResponse = await fetch('http://localhost:3000/api/insights/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientData: {
          vitals: [{ bloodPressure: '135/85', weight: 70, date: '2025-01-20' }],
          appointments: [{ date: '2025-01-20', type: 'checkup' }],
          medications: ['Amlodipine 5mg']
        }
      })
    });
    const insightsData = await insightsResponse.json();
    console.log('✅ Health Insights API:', insightsData);
    
    console.log('🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

// Run the test
testAPIConnection();
