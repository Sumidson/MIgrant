// Simple test to verify Gemini AI integration
import { ChatService } from '../services/chatService';

export async function testGeminiIntegration() {
  console.log('Testing Gemini AI integration...');
  
  const chatService = ChatService.getInstance();
  
  try {
    const response = await chatService.sendMessage('Hello, I have a headache. What should I do?');
    
    if (response.success && response.data) {
      console.log('✅ Gemini AI integration successful!');
      console.log('Response:', response.data.content);
      return true;
    } else {
      console.error('❌ Gemini AI integration failed:', response.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Gemini AI integration error:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).testGeminiIntegration = testGeminiIntegration;
} else {
  // Node environment
  testGeminiIntegration().then(success => {
    process.exit(success ? 0 : 1);
  });
}
