import React, { useEffect } from 'react';
import { ChatMessage } from '../hooks/useChat';
import { Leaf, User, ShoppingBag, Tag, Volume2 } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

interface MessageBubbleProps {
  message: ChatMessage;
  onSuggestionClick: (suggestion: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onSuggestionClick }) => {
  const { speakText } = useVoice();

  // Auto-speak bot messages
  useEffect(() => {
    if (message.isBot && message.text) {
      const timer = setTimeout(() => {
        speakText(message.text);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [message.isBot, message.text, speakText]);

  const formatText = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br />');
    return formatted;
  };

  const handleSpeakMessage = () => {
    speakText(message.text);
  };

  return (
    <div className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'} mb-6`}>
      {message.isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
          <Leaf className="w-6 h-6 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
        <div className="relative group">
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              message.isBot
                ? 'bg-white text-gray-800 border border-gray-100'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}
          >
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
            />
          </div>

          {/* Voice button for bot messages */}
          {message.isBot && (
            <button
              onClick={handleSpeakMessage}
              className="absolute -right-2 -top-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600 shadow-md"
              title="Speak this message"
            >
              <Volume2 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Products Display */}
        {message.products && message.products.length > 0 && (
          <div className="mt-3 space-y-3">
            {message.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-green-200"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {product.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-bold text-green-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.condition && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {product.condition}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        by {product.seller}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-all duration-200 border border-green-200 hover:border-green-300 hover:shadow-sm font-medium"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mt-2 font-medium">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!message.isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
