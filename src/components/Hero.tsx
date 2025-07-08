import React from 'react';
import { Sparkles, ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/80 via-pink-100/80 to-blue-100/80" />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" />
        <div className="absolute top-32 right-20 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-500" />
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-blue-400 rounded-full animate-bounce delay-1000" />
        <Star className="absolute top-40 right-1/3 w-8 h-8 text-purple-400 animate-pulse" />
        <Star className="absolute bottom-40 left-1/5 w-6 h-6 text-green-400 animate-pulse delay-700" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-rainbow shadow-lg mb-8">
            <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
            <span className="text-lg font-bold text-purple-700">✨ Magic Stories Just for You! ✨</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-yellow-500">Your Name!</span>
            <span className="block text-pink-500">Your Adventure!</span>
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Story! 📚
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            🌟 Amazing stories with <span className="text-purple-600 font-bold">YOU</span> as the hero! 🌟
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-10 py-5 rounded-full text-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 hover:scale-105 border-4 border-white">
              <span>🚀 Make My Story!</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="text-purple-600 hover:text-purple-700 font-bold text-xl flex items-center space-x-2 bg-white/80 px-6 py-3 rounded-full border-2 border-purple-300 hover:border-purple-500 transition-all">
              <Play className="w-6 h-6" />
              <span>👀 See How It Works</span>
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full border-2 border-green-300">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-green-700">Super Safe!</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-300">
              <span className="text-2xl">⚡</span>
              <span className="font-bold text-blue-700">Ready in Minutes!</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full border-2 border-purple-300">
              <span className="text-2xl">🎨</span>
              <span className="font-bold text-purple-700">Beautiful Pictures!</span>
            </div>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-rainbow p-8">
              <div className="aspect-video bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Fun storybook preview */}
                <div className="absolute inset-6 grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border-4 border-yellow-300">
                    <div className="flex-1 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl mb-4 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🌟</div>
                        <div className="text-lg font-bold text-orange-700">Emma's Big Adventure!</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col border-4 border-green-300">
                    <div className="flex-1 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🦄</div>
                        <div className="text-lg font-bold text-blue-700">Magic Friends!</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-300 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="bg-white/95 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-colors shadow-xl border-4 border-purple-300">
                    <Play className="w-12 h-12 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;