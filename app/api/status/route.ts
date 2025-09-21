import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'MigrantCare AI API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      chat: '/api/chat',
      symptoms: '/api/symptoms/analyze',
      insights: '/api/insights/generate',
      status: '/api/status'
    }
  });
}
