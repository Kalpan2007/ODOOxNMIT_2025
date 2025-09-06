import { useState, useCallback } from 'react';
import { BotEngine, BotResponse } from '../utils/botEngine';
import { ContentFilter } from '../utils/contentFilter';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  products?: any[];
  suggestions?: string[];
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "🌱 Hi! I'm EcoBuddy, your AI-powered sustainable shopping assistant!\n\n**Powered by EcoFinds** 🏪\n**Developed by Dax Patel** 👨‍💻\n**Dedicated to Environment** 🌍\n\nI'm here to help you find amazing second-hand treasures, learn about sustainable living, and make eco-friendly choices! I can also answer general questions and help with platform features.\n\nHow can I help you today? 🌱",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Find products 🛍️', 'Sustainability tips 🌱', 'Who created you? 👨‍💻', 'About EcoFinds 💚']
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState(0);
  const [botEngine] = useState(() => new BotEngine());

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Check if user is blocked
    if (isBlocked && Date.now() < blockEndTime) {
      const timeRemaining = ContentFilter.getTimeRemaining(blockEndTime);
      const blockMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `🔒 You're still blocked for ${timeRemaining}. Please wait and return with respectful language! 🌱`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, blockMessage]);
      return;
    }
    
    // Reset block if time has passed
    if (isBlocked && Date.now() >= blockEndTime) {
      setIsBlocked(false);
      setWarningCount(0);
      setBlockEndTime(0);
    }
    
    // Check for inappropriate content
    const contentCheck = ContentFilter.checkContent(text);
    if (contentCheck.isInappropriate) {
      const newWarningCount = warningCount + 1;
      setWarningCount(newWarningCount);
      
      if (newWarningCount >= 3) {
        // Block user for 5 minutes
        const blockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
        setIsBlocked(true);
        setBlockEndTime(blockTime);
        setWarningCount(0);
        
        const blockMessage: ChatMessage = {
          id: Date.now().toString(),
          text: ContentFilter.getBlockMessage(),
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, blockMessage]);
        return;
      }
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get bot response
      const response: BotResponse = await botEngine.processQuery(text);
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
        products: response.products,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "🔧 Sorry, I encountered an error. Please try again! I'm powered by EcoFinds and always working to improve our sustainable shopping experience! 🌱",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Try again', 'Eco tips', 'Platform help']
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [botEngine]);

  const clearChat = useCallback(() => {
    setWarningCount(0);
    setIsBlocked(false);
    setBlockEndTime(0);
    setMessages([
      {
        id: '1',
        text: "🌱 Hi! I'm EcoBuddy, your AI-powered sustainable shopping assistant!\n\n**Powered by EcoFinds** 🏪\n**Developed by Dax Patel** 👨‍💻\n**Dedicated to Environment** 🌍\n\nI'm here to help you find amazing second-hand treasures, learn about sustainable living, and make eco-friendly choices! I can also answer general questions and help with platform features.\n\nHow can I help you today? 🌱",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Find products 🛍️', 'Sustainability tips 🌱', 'Who created you? 👨‍💻', 'About EcoFinds 💚']
      }
    ]);
  }, []);

  return {
    messages,
    isLoading,
    isBlocked,
    blockEndTime,
    warningCount,
    sendMessage,
    clearChat
  };
};