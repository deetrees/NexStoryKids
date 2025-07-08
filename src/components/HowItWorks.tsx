import React from 'react';
import { MessageSquare, Brain, Palette, Shield, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Share Your Idea",
      description: "Tell us about your story idea - characters, themes, age group, or any special elements you'd like included.",
      color: "purple"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Agents Collaborate",
      description: "Our specialized agents work together: GPT-4o interviews, Claude 3 Opus creates, and Gemini 2.5 Flash reasons through the narrative.",
      color: "pink"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Illustrations Generated",
      description: "Beautiful, custom illustrations are created using advanced AI models to perfectly match your story's tone and characters.",
      color: "blue"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety Review",
      description: "Our compliance officer ensures all content is child-safe, age-appropriate, and follows privacy guidelines.",
      color: "green"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Story Delivered",
      description: "Receive your complete, personalized storybook ready to read, share, or even print as a physical book.",
      color: "indigo"
    }
  ];

  const colorClasses = {
    purple: "from-purple-500 to-purple-600 border-purple-200 bg-purple-50",
    pink: "from-pink-500 to-pink-600 border-pink-200 bg-pink-50",
    blue: "from-blue-500 to-blue-600 border-blue-200 bg-blue-50",
    green: "from-green-500 to-green-600 border-green-200 bg-green-50",
    indigo: "from-indigo-500 to-indigo-600 border-indigo-200 bg-indigo-50"
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process transforms your ideas into magical stories in just minutes, 
            powered by cutting-edge AI technology and careful human oversight.
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`relative mx-auto w-20 h-20 rounded-full bg-gradient-to-r ${colorClasses[step.color].split(' ')[0]} ${colorClasses[step.color].split(' ')[1]} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300">
            Start Your Story Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;