import { useState, useCallback } from 'react';
import { ChatMessage, AIResponse } from '../types';
import { ChatService } from '../services/chatService';

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatService = ChatService.getInstance();

  const sendMessage = useCallback(async (message: string, context?: any) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: AIResponse<ChatMessage> = await chatService.sendMessage(message, context);
      
      if (response.success && response.data) {
        setMessages(prev => [...prev, response.data!]);
      } else {
        setError(response.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    chatService.clearMessages();
  }, []);

  const getMessages = useCallback(() => {
    return messages;
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    getMessages
  };
};
