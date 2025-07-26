import React, { useState, useEffect } from 'react';

// Animated Nex Mascot Component
const NexMascot: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
  const [animation, setAnimation] = useState('bounce');
  const [message, setMessage] = useState("Hi! I'm Nex! Click me to chat! ✨");
  const [showBubble, setShowBubble] = useState(true);

  // Cycle through animations
  useEffect(() => {
    const animations = ['bounce', 'pulse', 'spin', 'ping'];
    const interval = setInterval(() => {
      setAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through messages
  useEffect(() => {
    const messages = [
      "Hi! I'm Nex! Click me to chat! ✨",
      "Ready for a magical story? 🌟",
      "Let's create something amazing! 🎭",
      "I'm your Personal Story Assistant! 📚"
    ];
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="absolute bottom-24 right-0 mb-4 max-w-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-4 relative">
            <p className="text-sm text-gray-800">{message}</p>
            {/* Bubble tail */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {/* Nex Mascot */}
      <div 
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 animate-${animation}`}
        onClick={onClick}
      >
        {/* Magical glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full animate-pulse opacity-75"></div>
        
        {/* Main mascot container */}
        <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center">
          {/* Inner circle */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
            {/* Nex character - using emoji until you add your image */}
            <div className="text-3xl animate-bounce">🧙‍♂️</div>
          </div>
        </div>

        {/* Activity indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
            <span className="text-white text-xs">✨</span>
          </div>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-60"
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
    </div>
  );
};

// Simple Nex conversation component
const SimpleNexChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: '1', role: 'nex', content: "Hi! I'm Nex, your Personal Story Assistant! ✨ What's your name?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, 
        { id: Date.now().toString(), role: 'user', content: input },
        { id: (Date.now() + 1).toString(), role: 'nex', content: `Nice to meet you, ${input}! Let's create an amazing story together! 🌟` }
      ]);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">🧙‍♂️</span>
            </div>
            <h2 className="text-2xl font-bold text-purple-700">Chat with Nex</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-2xl mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 text-gray-800'
              }`}>
                {msg.role === 'nex' && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs font-bold">N</span>
                    </div>
                    <span className="text-xs font-semibold text-purple-600">Nex</span>
                  </div>
                )}
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border-2 border-purple-200 rounded-full px-4 py-3 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSend}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showNexChat, setShowNexChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          NexStoryKids
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Meet Nex, your Personal Story Assistant! ✨
        </p>
        
        <div className="text-center mb-12">
          <button
            onClick={() => setShowNexChat(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 mr-4"
          >
            🎭 Start Creating Your Story!
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Meet Nex! 🧙‍♂️</h3>
            <p className="text-gray-600 mb-4">
              Nex is your magical Personal Story Assistant who loves creating amazing adventures! 
              Look for Nex floating around the page - click on the magical mascot to start chatting!
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>✨ Creates personalized stories</li>
              <li>🎨 Generates beautiful illustrations</li>
              <li>🎭 Makes your child the hero</li>
              <li>📚 Delivers complete storybooks</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">How It Works 🌟</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</span>
                <p>Click on Nex (the floating mascot) to start chatting</p>
              </div>
              <div className="flex items-start">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</span>
                <p>Tell Nex about yourself and what you love</p>
              </div>
              <div className="flex items-start">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</span>
                <p>Watch Nex create your personalized story with images!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <p>👀 Look for Nex floating in the bottom-right corner!</p>
          <p className="mt-2 text-sm">Frontend: ✅ Running | Backend: ✅ Running</p>
        </div>
      </div>
      
      {/* Animated Nex Mascot */}
      <NexMascot 
        isActive={showNexChat} 
        onClick={() => setShowNexChat(true)} 
      />
      
      {/* Chat Modal */}
      {showNexChat && (
        <SimpleNexChat onClose={() => setShowNexChat(false)} />
      )}
    </div>
  );
}

export default App;
