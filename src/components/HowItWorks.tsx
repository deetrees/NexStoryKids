import React from 'react';
import StoryCreator from './StoryCreator';
import { MessageSquare, Sparkles, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const [showStoryCreator, setShowStoryCreator] = React.useState(false);

  const steps = [
    {
      icon: "💬",
      title: "Tell Us About You!",
      description: "What's your name? Do you like dragons? Unicorns? Space? Tell us what makes you awesome!",
      color: "purple",
      bgGradient: "from-purple-400 to-pink-400"
    },
    {
      icon: "✨",
      title: "Watch the Magic!",
      description: "Our story robots work super fast to make YOUR special adventure with amazing pictures!",
      color: "pink",
      bgGradient: "from-pink-400 to-yellow-400"
    },
    {
      icon: "📚",
      title: "Get Your Book!",
      description: "Read it on the computer, print it out, or get a real book mailed to you!",
      color: "blue",
      bgGradient: "from-blue-400 to-green-400"
    }
  ];

  return (
    <>
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 text-6xl opacity-30 animate-spin">⚙️</div>
        <div className="absolute top-40 right-10 text-5xl opacity-30 animate-bounce">🔧</div>
        <div className="absolute bottom-32 left-10 text-4xl opacity-30 animate-pulse">🎯</div>
        <div className="absolute bottom-20 right-20 text-6xl opacity-30 animate-wiggle">🎪</div>
        
        {/* Floating arrows connecting steps */}
        <div className="absolute top-1/2 left-1/4 text-4xl text-purple-400 animate-bounce opacity-60">➡️</div>
        <div className="absolute top-1/2 right-1/4 text-4xl text-pink-400 animate-bounce opacity-60" style={{animationDelay: '0.5s'}}>➡️</div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-rainbow shadow-xl mb-6 animate-wiggle">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              How Does the
              <span className="text-purple-600 animate-pulse"> Magic ✨</span> Work?
            </h2>
          </div>
          <p className="text-xl text-gray-700 font-medium animate-bounce">It's super easy - just 3 steps!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group relative">
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse z-10" style={{animationDelay: `${index * 0.5}s`}}></div>
              )}
              
              <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white mb-6 group-hover:scale-125 transition-all duration-500 shadow-2xl border-6 border-white animate-bounce" style={{animationDelay: `${index * 0.3}s`}}>
                <span className="text-5xl group-hover:animate-spin transition-all duration-300">{step.icon}</span>
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 shadow-lg border-4 border-white animate-pulse">
                  {index + 1}
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute -top-2 -left-2 text-yellow-400 text-xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">✨</div>
                <div className="absolute -bottom-2 -right-2 text-pink-400 text-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" style={{animationDelay: '0.3s'}}>⭐</div>
                <div className="absolute -bottom-2 -left-2 text-purple-400 text-sm animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" style={{animationDelay: '0.6s'}}>💫</div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border-4 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-wiggle">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-10 max-w-3xl mx-auto border-6 border-rainbow shadow-2xl relative overflow-hidden animate-glow">
            {/* Floating elements */}
            <div className="absolute top-4 left-4 text-3xl animate-spin opacity-40">🎪</div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce opacity-40">🎈</div>
            <div className="absolute bottom-4 left-4 text-2xl animate-pulse opacity-40">🎭</div>
            <div className="absolute bottom-4 right-4 text-3xl animate-wiggle opacity-40">🎨</div>
            
            <h3 className="text-4xl font-bold text-gray-900 mb-6 animate-bounce">Ready for Your Adventure? 🚀</h3>
            <p className="text-xl text-gray-700 mb-8 font-medium animate-pulse">Join over 50,000 kids who already have their magical stories!</p>
            
            <button 
              onClick={() => setShowStoryCreator(true)}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-16 py-6 rounded-full text-3xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 border-6 border-white animate-pulse hover:animate-bounce relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center space-x-4">
                <span className="text-4xl animate-spin">🌟</span>
                <span>START YOUR MAGICAL STORY!</span>
                <span className="text-4xl animate-spin">🌟</span>
              </span>
            </button>
            
            <div className="mt-8 flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 animate-pulse">2</div>
                <div className="text-sm text-gray-600 font-medium">Minutes!</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 animate-pulse" style={{animationDelay: '0.3s'}}>100%</div>
                <div className="text-sm text-gray-600 font-medium">Safe!</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 animate-pulse" style={{animationDelay: '0.6s'}}>∞</div>
                <div className="text-sm text-gray-600 font-medium">Fun!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      
      {showStoryCreator && (
        <StoryCreator onClose={() => setShowStoryCreator(false)} />
      )}
    </>
  );
};

export default HowItWorks;