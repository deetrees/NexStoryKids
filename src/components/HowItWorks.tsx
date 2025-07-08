import React from 'react';
import { MessageSquare, Sparkles, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: "💬",
      title: "Tell Us About You!",
      description: "What's your name? Do you like dragons? Unicorns? Space? Tell us what makes you awesome!",
      color: "purple"
    },
    {
      icon: "✨",
      title: "Watch the Magic!",
      description: "Our story robots work super fast to make YOUR special adventure with amazing pictures!",
      color: "pink"
    },
    {
      icon: "📚",
      title: "Get Your Book!",
      description: "Read it on the computer, print it out, or get a real book mailed to you!",
      color: "blue"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Does the
            <span className="text-purple-600"> Magic ✨</span> Work?
          </h2>
          <p className="text-xl text-gray-700 font-medium">It's super easy - just 3 steps!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg border-4 border-white">
                <span className="text-4xl">{step.icon}</span>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl font-bold text-gray-800 shadow-md border-2 border-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 max-w-2xl mx-auto border-4 border-purple-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready for Your Adventure? 🚀</h3>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full text-2xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 border-4 border-white animate-pulse hover:animate-none">
              🌟 START YOUR MAGICAL STORY! 🌟
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;