import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Heart, Star, Camera, Send } from 'lucide-react';

interface InteractiveMascotProps {
  currentStep: 'welcome' | 'name' | 'age' | 'interests' | 'photo' | 'theme' | 'creating' | 'complete';
  childName?: string;
  onMessage?: (message: string) => void;
  onStepComplete?: (data: any) => void;
  isAnimating?: boolean;
  isListening?: boolean;
}

interface MascotState {
  expression: 'happy' | 'excited' | 'thinking' | 'winking' | 'surprised';
  animation: 'idle' | 'bounce' | 'wave' | 'spin' | 'float';
  message: string;
  isTyping: boolean;
}

const InteractiveMascot: React.FC<InteractiveMascotProps> = ({
  currentStep,
  childName = 'friend',
  onMessage,
  onStepComplete,
  isAnimating = false,
  isListening = false
}) => {
  const [mascotState, setMascotState] = useState<MascotState>({
    expression: 'happy',
    animation: 'idle',
    message: "Hi! I'm Nex, your Personal Story Assistant! ✨",
    isTyping: false
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);

  // Nex's personality-driven responses for different steps
  const stepMessages = {
    welcome: {
      message: "Hi! I'm Nex, your Personal Story Assistant! ✨ I'm here to create the most amazing personalized story just for you! What's your name?",
      expression: 'happy' as const,
      animation: 'wave' as const
    },
    name: {
      message: "What's your name, young adventurer? I can't wait to make you the hero of an incredible story! 🌟",
      expression: 'excited' as const,
      animation: 'bounce' as const
    },
    age: {
      message: `Nice to meet you, ${childName}! How old are you? This helps me create the perfect adventure just for you! 🎂`,
      expression: 'happy' as const,
      animation: 'float' as const
    },
    interests: {
      message: `Awesome, ${childName}! Now tell me - what do you love most? Dragons? 🐉 Space adventures? 🚀 Magical creatures? 🦄 I want to know everything!`,
      expression: 'excited' as const,
      animation: 'spin' as const
    },
    photo: {
      message: `${childName}, would you like to be the star of your own story? Upload your photo and I'll make you the main character! 📸`,
      expression: 'winking' as const,
      animation: 'bounce' as const
    },
    theme: {
      message: `Perfect! Now ${childName}, what kind of adventure should we create together? I have so many magical ideas! 🎭`,
      expression: 'thinking' as const,
      animation: 'float' as const
    },
    creating: {
      message: `Hold on tight, ${childName}! I'm weaving your magical story with beautiful illustrations right now! This is so exciting! ✨`,
      expression: 'excited' as const,
      animation: 'spin' as const
    },
    complete: {
      message: `Ta-da! ${childName}, your amazing story is ready! I had so much fun creating this adventure with you! 🎉`,
      expression: 'surprised' as const,
      animation: 'bounce' as const
    }
  };

  // Update mascot state when step changes
  useEffect(() => {
    const stepData = stepMessages[currentStep];
    if (stepData) {
      setMascotState(prev => ({
        ...prev,
        message: stepData.message,
        expression: stepData.expression,
        animation: stepData.animation,
        isTyping: false
      }));
      setShowSpeechBubble(true);
    }
  }, [currentStep, childName]);

  // Show mascot with entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-hide speech bubble after some time, but keep it longer for conversation
  useEffect(() => {
    if (showSpeechBubble && !isListening) {
      const timer = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 12000); // Longer timeout for conversation
      return () => clearTimeout(timer);
    }
  }, [showSpeechBubble, mascotState.message, isListening]);

  const handleMascotClick = () => {
    setShowSpeechBubble(true);
    setShowInputBox(true);
    // Add a little bounce animation on click
    setMascotState(prev => ({ ...prev, animation: 'bounce' }));
    setTimeout(() => {
      setMascotState(prev => ({ ...prev, animation: 'idle' }));
    }, 1000);
  };

  const handleSendMessage = () => {
    if (userInput.trim() && onMessage) {
      onMessage(userInput.trim());
      setUserInput('');
      setShowInputBox(false);
      
      // Show typing indicator
      setMascotState(prev => ({ 
        ...prev, 
        isTyping: true, 
        expression: 'thinking',
        animation: 'float'
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getMascotImage = () => {
    const basePath = '/images';
    return `${basePath}/nexstory_mascot_Nex-${mascotState.expression}.png`;
  };

  const getAnimationClass = () => {
    switch (mascotState.animation) {
      case 'bounce':
        return 'animate-bounce';
      case 'wave':
        return 'animate-pulse';
      case 'spin':
        return 'animate-spin';
      case 'float':
        return 'animate-bounce';
      default:
        return 'animate-pulse';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'photo':
        return <Camera className="w-4 h-4 text-purple-600" />;
      case 'creating':
        return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'complete':
        return <Star className="w-4 h-4 text-gold-500" />;
      default:
        return <Heart className="w-4 h-4 text-pink-500" />;
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div className="absolute bottom-20 right-0 mb-4 max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-4 relative">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                {getStepIcon()}
              </div>
              <div className="flex-1">
                {mascotState.isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {mascotState.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Input box for conversation */}
            {showInputBox && !mascotState.isTyping && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="flex-1 text-xs border border-purple-200 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-400"
                    autoFocus
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-200 absolute -top-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* Mascot Container */}
      <div 
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 ${getAnimationClass()}`}
        onClick={handleMascotClick}
      >
        {/* Mascot Background Circle */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full shadow-lg flex items-center justify-center">
          {/* Mascot Image */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
            <img 
              src={getMascotImage()} 
              alt="Nex your Personal Story Assistant"
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => {
                // Fallback to emoji if image not found
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
              }}
            />
            <div className="text-2xl hidden">🧙‍♂️</div>
          </div>
        </div>

        {/* Activity Indicator */}
        {(isAnimating || mascotState.isTyping) && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Conversation indicator */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-60`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveMascot;
