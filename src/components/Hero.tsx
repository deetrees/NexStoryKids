import React from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">100% AI-Powered • COPPA Compliant</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Bring Your Child's
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Imagination to Life
            </span>
            with AI-Powered Storybooks
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Personalized, beautifully illustrated adventures—created in minutes, starring your child!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <span>Start Your Magical Story</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-purple-600 hover:text-purple-700 font-semibold text-lg flex items-center space-x-2 underline underline-offset-4 hover:underline-offset-8 transition-all">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-600">
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">COPPA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border border-blue-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium">100% AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border border-purple-200">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Instant Delivery</span>
            </div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-100 p-8">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Sample storybook pages mockup */}
                <div className="absolute inset-4 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                    <div className="flex-1 bg-gradient-to-br from-yellow-100 to-orange-100 rounded mb-2 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                        <div className="text-xs text-gray-600">Emma's Adventure</div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                    <div className="flex-1 bg-gradient-to-br from-green-100 to-blue-100 rounded mb-2 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-400 rounded-full mx-auto mb-2"></div>
                        <div className="text-xs text-gray-600">Magical Garden</div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors shadow-lg">
                    <Play className="w-8 h-8 text-purple-600" />
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