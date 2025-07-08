import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-blue-100/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI-Powered Story Creation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create Magical
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Children's Stories
            </span>
            in Minutes
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform simple ideas into personalized, illustrated storybooks using our sophisticated multi-agent AI system. 
            Perfect for parents, educators, and young readers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
              <span>Start Creating Stories</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-purple-600 hover:text-purple-700 font-semibold text-lg underline underline-offset-4 hover:underline-offset-8 transition-all">
              Watch Demo
            </button>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-100 p-8">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Interactive Story Preview</p>
                  <p className="text-sm text-gray-500 mt-2">See your personalized story come to life</p>
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