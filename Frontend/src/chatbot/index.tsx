import React from 'react';
import ChatWidget from './components/ChatWidget';

// Main chatbot component that can be easily embedded
const EcoBuddyChatbot: React.FC = () => {
  return <ChatWidget />;
};

export default EcoBuddyChatbot;

// Export individual components for custom implementations
export { default as ChatWidget } from './components/ChatWidget';
export { default as MessageBubble } from './components/MessageBubble';
export { default as InputBar } from './components/InputBar';
export { useChat } from './hooks/useChat';
export { BotEngine } from './utils/botEngine';
export type { ChatMessage } from './hooks/useChat';
export type { BotResponse } from './utils/botEngine';