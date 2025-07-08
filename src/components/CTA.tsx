import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';

const CTA = () => {
  return (
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
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50 mb-8">
          <span className="text-2xl animate-spin">✨</span>
          <span className="text-lg font-bold text-white">Time for Your Adventure!</span>
          <span className="text-2xl animate-spin">✨</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Be the
          <span className="block text-yellow-300">Hero of Your Own Story? 🦸‍♀️🦸‍♂️</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          🎉 Join thousands of kids who already have their own magical books! 
          Your amazing adventure is waiting! 🎉
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="group bg-white text-purple-600 px-10 py-5 rounded-full text-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 hover:scale-105 border-4 border-yellow-300">
            <span className="text-2xl">🚀</span>
            <span>START YOUR MAGICAL STORY!</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/95">
          <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-white/30">
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <div className="text-lg font-medium">Happy Kids! 😊</div>
          </div>
          <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-white/30">
            <div className="text-4xl font-bold mb-2">2 Minutes</div>
            <div className="text-lg font-medium">Super Fast! ⚡</div>
          </div>
          <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-white/30">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-lg font-medium">Safe & Fun! 🛡️</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;