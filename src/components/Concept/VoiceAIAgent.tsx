import React, { useState } from 'react';
import { Mic, Bot } from 'lucide-react';

const VoiceAIAgent: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Voice AI Tutor</h3>
            <p className="text-sm text-gray-500">Click to start talking</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Ready</span>
        </div>
      </div>
      
      {/* Voice activation button */}
      <div className="text-center">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`w-24 h-24 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isListening
              ? 'bg-red-500 animate-pulse shadow-lg'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-xl'
          }`}
        >
          <Mic className="h-8 w-8 text-white mx-auto" />
        </button>
        
        <p className="mt-4 text-sm text-gray-600">
          {isListening ? 'Listening... Speak now!' : 'Tap to ask your question'}
        </p>
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
        <span>Voice Powered</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span>AI Tutor</span>
      </div>
    </div>
  );
};

export default VoiceAIAgent;