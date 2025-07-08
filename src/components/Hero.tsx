import React from 'react';
import { Sparkles, ArrowRight, Play, Star, Heart, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-yellow-200 via-pink-200 via-purple-200 to-blue-200">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-yellow-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0s'}} />
        <div className="absolute top-20 right-20 w-8 h-8 bg-pink-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-40 left-1/4 w-16 h-16 bg-purple-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 right-1/4 w-10 h-10 bg-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-20 left-1/3 w-14 h-14 bg-green-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '2s'}} />
        
        {/* Floating emojis */}
        <div className="absolute top-32 left-1/5 text-4xl animate-pulse opacity-80" style={{animationDelay: '0.3s'}}>🦄</div>
        <div className="absolute top-16 right-1/3 text-3xl animate-pulse opacity-80" style={{animationDelay: '0.8s'}}>🌟</div>
        <div className="absolute bottom-40 left-1/6 text-5xl animate-pulse opacity-80" style={{animationDelay: '1.3s'}}>🏰</div>
        <div className="absolute bottom-16 right-1/5 text-3xl animate-pulse opacity-80" style={{animationDelay: '1.8s'}}>🐉</div>
        <div className="absolute top-1/2 left-10 text-4xl animate-pulse opacity-80" style={{animationDelay: '2.3s'}}>👑</div>
        <div className="absolute top-1/3 right-10 text-3xl animate-pulse opacity-80" style={{animationDelay: '2.8s'}}>⚡</div>
        
        {/* Sparkle effects */}
        <Star className="absolute top-24 left-1/2 w-6 h-6 text-yellow-500 animate-spin opacity-60" style={{animationDelay: '0.2s'}} />
        <Star className="absolute bottom-24 right-1/2 w-8 h-8 text-pink-500 animate-spin opacity-60" style={{animationDelay: '1.2s'}} />
        <Sparkles className="absolute top-1/3 left-1/3 w-7 h-7 text-purple-500 animate-spin opacity-60" style={{animationDelay: '2.2s'}} />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-rainbow shadow-xl mb-8 hover:scale-105 transition-transform animate-wiggle">
            <Sparkles className="w-6 h-6 text-purple-600 animate-spin" />
            <span className="text-xl font-bold text-purple-700">🏆 SUPER SAFE • MADE BY ROBOTS 🤖</span>
            <Zap className="w-6 h-6 text-yellow-600 animate-pulse" />
          </div>
          
          {/* Main headline with staggered animation */}
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="block text-yellow-500 hover:scale-110 transition-transform cursor-default animate-bounce">
                YOUR NAME! 📝
              </span>
              <span className="block text-pink-500 hover:scale-110 transition-transform cursor-default animate-bounce" style={{animationDelay: '0.2s'}}>
                YOUR POWERS! ⚡
              </span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-default animate-bounce" style={{animationDelay: '0.4s'}}>
                YOUR STORY! 📚✨
              </span>
            </h1>
          </div>
          
          <p className="text-3xl md:text-4xl text-gray-800 mb-10 max-w-4xl mx-auto leading-relaxed font-bold animate-pulse">
            🌟 Be the <span className="text-purple-600 bg-yellow-200 px-2 rounded-lg animate-wiggle">HERO</span> of your own magical adventure! 🌟
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group relative bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-12 py-6 rounded-full text-3xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 hover:scale-110 border-4 border-white animate-pulse hover:animate-bounce overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-4xl animate-spin">🚀</span>
              <span className="relative z-10">START MY ADVENTURE!</span>
              <ArrowRight className="relative z-10 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="text-purple-600 hover:text-purple-700 font-bold text-2xl flex items-center space-x-3 bg-white/90 px-8 py-4 rounded-full border-4 border-purple-300 hover:border-purple-500 transition-all hover:scale-105 shadow-lg animate-wiggle">
              <Play className="w-8 h-8" />
              <span>👀 SEE THE MAGIC!</span>
            </button>
          </div>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            <div className="flex items-center space-x-3 bg-green-200 px-6 py-3 rounded-full border-4 border-green-400 hover:scale-105 transition-transform shadow-lg animate-bounce">
              <span className="text-3xl animate-pulse">🛡️</span>
              <span className="font-bold text-green-800 text-lg">SUPER SAFE!</span>
            </div>
            <div className="flex items-center space-x-3 bg-blue-200 px-6 py-3 rounded-full border-4 border-blue-400 hover:scale-105 transition-transform shadow-lg animate-bounce" style={{animationDelay: '0.3s'}}>
              <span className="text-3xl animate-pulse">⚡</span>
              <span className="font-bold text-blue-800 text-lg">2 MINUTES!</span>
            </div>
            <div className="flex items-center space-x-3 bg-purple-200 px-6 py-3 rounded-full border-4 border-purple-400 hover:scale-105 transition-transform shadow-lg animate-bounce" style={{animationDelay: '0.6s'}}>
              <span className="text-3xl animate-pulse">🎨</span>
              <span className="font-bold text-purple-800 text-lg">AMAZING ART!</span>
            </div>
          </div>
          
          {/* Enhanced storybook preview with 3D effect */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-8 border-rainbow p-10 hover:scale-105 transition-transform duration-500 animate-glow">
              <div className="aspect-video bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 rounded-2xl flex items-center justify-center relative overflow-hidden border-4 border-white shadow-inner">
                {/* 3D-style storybook pages */}
                <div className="absolute inset-6 grid grid-cols-3 gap-6">
                  {/* Page 1 - Enhanced with more details */}
                  <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col border-4 border-purple-400 transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer animate-wiggle">
                    <div className="flex-1 bg-gradient-to-br from-purple-300 to-pink-300 rounded-xl mb-4 flex flex-col items-center justify-center relative overflow-hidden border-2 border-purple-500">
                      <div className="text-center">
                        <div className="text-5xl mb-2 animate-bounce">👑</div>
                        <div className="text-sm font-bold text-purple-800">Princess Emma</div>
                        <div className="text-xs text-purple-600">The Beginning</div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <div className="absolute top-2 right-2 text-yellow-400 text-lg animate-pulse">✨</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-purple-200 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-purple-200 rounded-full w-4/5 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-3 bg-purple-200 rounded-full w-3/5 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                  
                  {/* Page 2 - Enhanced */}
                  <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col border-4 border-green-400 transform -rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer animate-wiggle" style={{animationDelay: '0.5s'}}>
                    <div className="flex-1 bg-gradient-to-br from-green-300 to-blue-300 rounded-xl mb-4 flex flex-col items-center justify-center relative overflow-hidden border-2 border-green-500">
                      <div className="text-center">
                        <div className="text-5xl mb-2 animate-bounce" style={{animationDelay: '0.5s'}}>🦄</div>
                        <div className="text-sm font-bold text-blue-800">Magic Forest</div>
                        <div className="text-xs text-green-600">The Adventure</div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                      <div className="absolute top-2 right-2 text-yellow-400 text-lg animate-pulse" style={{animationDelay: '0.3s'}}>🌟</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-green-200 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="h-3 bg-green-200 rounded-full w-3/4 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="h-3 bg-green-200 rounded-full w-4/5 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  
                  {/* Page 3 - Enhanced */}
                  <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col border-4 border-yellow-400 transform rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer animate-wiggle" style={{animationDelay: '1s'}}>
                    <div className="flex-1 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-xl mb-4 flex flex-col items-center justify-center relative overflow-hidden border-2 border-yellow-500">
                      <div className="text-center">
                        <div className="text-5xl mb-2 animate-bounce" style={{animationDelay: '1s'}}>🏰</div>
                        <div className="text-sm font-bold text-orange-800">The Castle</div>
                        <div className="text-xs text-yellow-600">Victory!</div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                      <div className="absolute top-2 right-2 text-yellow-400 text-lg animate-pulse" style={{animationDelay: '0.6s'}}>⭐</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-3 bg-yellow-200 rounded-full w-5/6 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="h-3 bg-yellow-200 rounded-full w-2/3 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced play button */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button className="bg-white/95 backdrop-blur-sm rounded-full p-8 hover:bg-white transition-all shadow-2xl border-6 border-purple-400 hover:scale-125 hover:border-pink-400 group animate-pulse hover:animate-bounce">
                    <Play className="w-16 h-16 text-purple-600 group-hover:text-pink-600 transition-colors" />
                  </button>
                </div>
              </div>
              
              {/* Enhanced sample story text */}
              <div className="mt-8 text-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-4 border-purple-300 animate-wiggle">
                <p className="text-2xl font-bold text-gray-800 mb-3 animate-pulse">📖 Your Story Preview</p>
                <p className="text-xl text-gray-700 italic font-medium leading-relaxed">
                  "Once upon a time, there was a brave hero named <span className="text-purple-600 font-bold bg-yellow-200 px-2 rounded animate-wiggle">YOU</span> who discovered a magical world where anything was possible..."
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <span className="text-2xl animate-pulse">✨</span>
                  <span className="text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>🌟</span>
                  <span className="text-2xl animate-pulse" style={{animationDelay: '1s'}}>⭐</span>
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