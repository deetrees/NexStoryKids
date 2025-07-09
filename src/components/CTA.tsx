import React from 'react';
import StoryCreator from './StoryCreator';
import { ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';

const CTA = () => {
  const [showStoryCreator, setShowStoryCreator] = React.useState(false);

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 relative overflow-hidden">
        {/* Fun floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full animate-bounce" />
          <div className="absolute top-32 right-20 w-12 h-12 bg-white/20 rounded-full animate-bounce delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/20 rounded-full animate-bounce delay-500" />
          <Star className="absolute top-20 right-1/3 w-12 h-12 text-white/30 animate-pulse" />
          <Star className="absolute bottom-32 left-1/5 w-8 h-8 text-white/30 animate-pulse delay-700" />
          <div className="absolute bottom-40 right-1/4 text-6xl animate-pulse delay-1000">⭐</div>
          <div className="absolute top-40 left-1/3 text-4xl animate-bounce delay-1500">🌟</div>
          
          {/* Magical creatures floating around */}
          <div className="absolute top-16 left-1/5 text-5xl animate-float opacity-60">🦄</div>
          <div className="absolute bottom-24 right-1/5 text-4xl animate-float opacity-60" style={{animationDelay: '1s'}}>🐉</div>
          <div className="absolute top-1/2 left-10 text-3xl animate-float opacity-60" style={{animationDelay: '2s'}}>👑</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-float opacity-60" style={{animationDelay: '0.5s'}}>🏰</div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-white/50 mb-8 animate-wiggle">
            <span className="text-3xl animate-spin">✨</span>
            <span className="text-2xl font-bold text-white">Time for Your Adventure!</span>
            <span className="text-3xl animate-spin">✨</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-bounce">
            Ready to Be the
            <span className="block text-yellow-300 animate-wiggle">Hero of Your Own Story? 🦸‍♀️🦸‍♂️</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed font-medium animate-pulse">
            🎉 Join thousands of kids who already have their own magical books! 
            Your amazing adventure is waiting! 🎉
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <button 
              onClick={() => setShowStoryCreator(true)}
              className="group relative bg-white text-purple-600 px-16 py-8 rounded-full text-3xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 hover:scale-110 border-6 border-yellow-300 animate-pulse hover:animate-bounce overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-4xl animate-spin">🚀</span>
              <span className="relative z-10">START YOUR MAGICAL STORY!</span>
              <ArrowRight className="relative z-10 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Enhanced stats with animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/95 mb-12">
            <div className="text-center bg-white/20 rounded-3xl p-8 backdrop-blur-sm border-4 border-white/30 hover:scale-110 transition-all duration-300 animate-float">
              <div className="text-6xl font-bold mb-4 animate-pulse">50,000+</div>
              <div className="text-2xl font-medium flex items-center justify-center space-x-2">
                <span>Happy Kids!</span>
                <span className="text-3xl animate-bounce">😊</span>
              </div>
            </div>
            <div className="text-center bg-white/20 rounded-3xl p-8 backdrop-blur-sm border-4 border-white/30 hover:scale-110 transition-all duration-300 animate-float" style={{animationDelay: '0.3s'}}>
              <div className="text-6xl font-bold mb-4 animate-pulse" style={{animationDelay: '0.2s'}}>2</div>
              <div className="text-2xl font-medium flex items-center justify-center space-x-2">
                <span>Minutes</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>⚡</span>
              </div>
            </div>
            <div className="text-center bg-white/20 rounded-3xl p-8 backdrop-blur-sm border-4 border-white/30 hover:scale-110 transition-all duration-300 animate-float" style={{animationDelay: '0.6s'}}>
              <div className="text-6xl font-bold mb-4 animate-pulse" style={{animationDelay: '0.4s'}}>100%</div>
              <div className="text-2xl font-medium flex items-center justify-center space-x-2">
                <span>Safe & Fun!</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.8s'}}>🛡️</span>
              </div>
            </div>
          </div>

          {/* Final excitement builder */}
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-10 border-4 border-white/50 max-w-4xl mx-auto animate-glow">
            <div className="flex justify-center space-x-4 mb-6">
              <span className="text-5xl animate-bounce">🎪</span>
              <span className="text-5xl animate-bounce" style={{animationDelay: '0.2s'}}>🎨</span>
              <span className="text-5xl animate-bounce" style={{animationDelay: '0.4s'}}>📚</span>
              <span className="text-5xl animate-bounce" style={{animationDelay: '0.6s'}}>✨</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4 animate-wiggle">
              Your Story. Your Adventure. Your Magic! 🌟
            </h3>
            
            <p className="text-xl text-white/90 font-medium animate-pulse">
              Don't wait - your magical adventure starts NOW! 🚀
            </p>
            
            <div className="mt-8 flex justify-center space-x-6">
              <div className="bg-green-300/80 px-6 py-3 rounded-full border-3 border-green-500 animate-wiggle">
                <span className="text-green-800 font-bold text-lg">✅ COPPA Safe</span>
              </div>
              <div className="bg-blue-300/80 px-6 py-3 rounded-full border-3 border-blue-500 animate-wiggle" style={{animationDelay: '0.3s'}}>
                <span className="text-blue-800 font-bold text-lg">🤖 AI Powered</span>
              </div>
              <div className="bg-purple-300/80 px-6 py-3 rounded-full border-3 border-purple-500 animate-wiggle" style={{animationDelay: '0.6s'}}>
                <span className="text-purple-800 font-bold text-lg">⚡ Instant Fun</span>
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

export default CTA;