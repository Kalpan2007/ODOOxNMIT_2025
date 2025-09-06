import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, RotateCcw, Minimize2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';


const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion.replace(/[🛍️🌱💚⚽📱👕🪑📚🏠]/g, '').trim());
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ease-out ${
            isMinimized 
              ? 'w-80 h-16' 
              : 'w-96 h-[600px] sm:w-80 sm:h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-lg">🌱</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">EcoBuddy</h3>
                <p className="text-green-100 text-xs">Sustainable Shopping Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isMinimized && (
                <>
                  <button
                    onClick={clearChat}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={minimizeChat}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </>
              )}
              
              <button
                onClick={toggleChat}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                title={isMinimized ? "Maximize" : "Close"}
              >
                {isMinimized ? (
                  <MessageCircle className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Minimized State */}
          {isMinimized && (
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={maximizeChat}
            >
              <p className="text-sm text-gray-600 truncate">
                Click to continue chatting with EcoBuddy...
              </p>
            </div>
          )}

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 h-[400px] sm:h-[320px] bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white text-sm">🌱</span>
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Bar */}
              <InputBar onSendMessage={sendMessage} isLoading={isLoading} />
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'rotate-0' : 'animate-pulse'
        }`}
        title="Chat with EcoBuddy"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🌱</span>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;