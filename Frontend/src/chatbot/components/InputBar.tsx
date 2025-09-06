import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Send, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isBlocked?: boolean;
  blockEndTime?: number;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading, isBlocked, blockEndTime }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const {
    isListening,
    transcript,
    speaking,
    supported: voiceSupported,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    isVoiceCommand,
    setTranscript
  } = useVoice();
  
  // Update transcript in input field
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
      
      // Check for voice commands
      if (isVoiceCommand(transcript)) {
        stopListening();
        handleSend();
      }
    }
  }, [transcript]);
  
  // Update block timer
  useEffect(() => {
    if (isBlocked && blockEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now >= blockEndTime) {
          setTimeRemaining('');
          clearInterval(interval);
        } else {
          const timeLeft = blockEndTime - now;
          const minutes = Math.floor(timeLeft / 60000);
          const seconds = Math.floor((timeLeft % 60000) / 1000);
          setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isBlocked, blockEndTime]);

  const handleSend = () => {
    if (message.trim() && !isLoading && !isBlocked) {
      onSendMessage(message);
      setMessage('');
      setTranscript('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const toggleSpeaking = () => {
    if (speaking) {
      stopSpeaking();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {isBlocked && timeRemaining && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-600 text-sm">
            🔒 Blocked for inappropriate language. Time remaining: <strong>{timeRemaining}</strong>
          </p>
        </div>
      )}
      
      <div className="flex gap-2 items-center">
        {/* Voice Controls */}
        {voiceSupported && (
          <div className="flex gap-1">
            <button
              onClick={toggleListening}
              disabled={isLoading || isBlocked}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleSpeaking}
              disabled={!speaking}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                speaking 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={speaking ? 'Stop speaking' : 'No audio playing'}
            >
              {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        )}
        
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isBlocked 
                ? "Chat blocked due to inappropriate language..." 
                : isListening 
                  ? "🎤 Listening... Say 'done' or 'enter' to send"
                  : "Ask EcoBuddy about products, sustainability, or anything..."
            }
            className={`w-full px-4 py-3 pr-12 rounded-full border focus:ring-2 focus:border-transparent outline-none text-sm placeholder-gray-500 transition-all duration-200 ${
              isBlocked 
                ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                : isListening
                  ? 'border-red-300 bg-red-50 focus:ring-red-500'
                  : 'border-gray-300 bg-gray-50 focus:ring-green-500'
            }`}
            disabled={isLoading || isBlocked}
          />
          
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || isBlocked}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isBlocked 
                ? 'bg-gray-400' 
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {isListening && (
        <div className="mt-2 text-center">
          <p className="text-red-600 text-xs animate-pulse">
            🎤 Listening... Say "done", "enter", or "submit" to send your message
          </p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-center mt-2">
        Powered by EcoFinds 🌱 • Developed by Dax Patel • Dedicated to Environment 🌍
      </div>
    </div>
  );
};

export default InputBar;