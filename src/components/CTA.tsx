import React from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white rounded-full animate-pulse delay-1500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Ready to Create Magic?</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Start Creating
          <span className="block">Amazing Stories Today</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of parents and educators who are already creating personalized, 
          illustrated storybooks that spark imagination and joy in young readers.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 hover:scale-105">
            <BookOpen className="w-5 h-5" />
            <span>Create Your First Story</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-white hover:text-white/80 font-semibold text-lg underline underline-offset-4 hover:underline-offset-8 transition-all">
            See Example Stories
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-sm uppercase tracking-wide">AI Agents Working</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">&lt;5min</div>
            <div className="text-sm uppercase tracking-wide">Story Generation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm uppercase tracking-wide">Child-Safe Content</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;