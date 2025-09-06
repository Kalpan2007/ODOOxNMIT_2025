import { useState, useCallback } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const { speak, cancel, speaking } = useSpeechSynthesis();
  
  const { listen, stop, supported } = useSpeechRecognition({
    onResult: (result: string) => {
      setTranscript(result);
    },
    onEnd: () => {
      setIsListening(false);
    }
  });

  const startListening = useCallback(() => {
    if (supported) {
      setIsListening(true);
      setTranscript('');
      listen({ continuous: true, interimResults: true });
    }
  }, [listen, supported]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    stop();
  }, [stop]);

  const speakText = useCallback((text: string) => {
    // Clean text for speech (remove emojis and markdown)
    const cleanText = text
      .replace(/[🌱🌍💚🛍️🔍💰♻️🤖🚀🌟👨‍💻💭🌿🔒⚠️🚫]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\n/g, '. ');
    
    speak({ 
      text: cleanText,
      voice: window.speechSynthesis.getVoices().find(voice => 
        voice.name.includes('Google') || voice.name.includes('Microsoft')
      )
    });
  }, [speak]);

  const stopSpeaking = useCallback(() => {
    cancel();
  }, [cancel]);

  const isVoiceCommand = useCallback((text: string): boolean => {
    const commands = ['enter', 'submit', 'send', 'done', 'that all', 'thats all', 'finish'];
    const lowerText = text.toLowerCase().trim();
    return commands.some(cmd => lowerText.endsWith(cmd));
  }, []);

  return {
    isListening,
    transcript,
    speaking,
    supported,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    isVoiceCommand,
    setTranscript
  };
};