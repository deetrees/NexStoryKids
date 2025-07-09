import React from 'react';
import { ArrowRight, Play, Shield, Clock, Sparkles, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 shadow-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ families</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Child is the
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hero of Every Story
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            AI-powered personalized storybooks that spark imagination, boost confidence, 
            and create magical reading experiences in minutes.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:scale-105">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              <span>Create Your Story</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group text-gray-700 hover:text-indigo-600 font-semibold text-lg flex items-center space-x-3 px-6 py-4 rounded-full hover:bg-white/50 transition-all">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">COPPA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Ready in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">AI-Powered</span>
            </div>
          </div>

          {/* Hero image/demo */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-8 hover:shadow-3xl transition-all duration-500">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Storybook pages mockup */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl px-8">
                  <div className="bg-white rounded-xl shadow-lg p-4 transform rotate-2 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-yellow-200 to-orange-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">👑</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-4 transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-green-200 to-blue-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🦄</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-4 transform rotate-1 hover:rotate-0 transition-transform cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🏰</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-all shadow-xl hover:scale-110 group">
                    <Play className="w-8 h-8 text-indigo-600 group-hover:text-purple-600 transition-colors" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-medium text-gray-700 mb-2">
                  "Once upon a time, there was a brave hero named <span className="text-indigo-600 font-bold">Emma</span>..."
                </p>
                <p className="text-sm text-gray-500">Personalized stories that make your child the star</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;