import React from 'react';
import { User, Palette, Shield, Zap, Heart, BookOpen } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: User,
      title: "Personalized Characters",
      description: "Your child becomes the main character with their name, appearance, and favorite things woven into every story.",
      color: "indigo",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Palette,
      title: "Beautiful Illustrations",
      description: "AI-generated artwork brings each story to life with stunning, child-friendly illustrations on every page.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "COPPA compliant with built-in safety filters. Every story is reviewed to ensure age-appropriate content.",
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Complete personalized storybooks generated in under 2 minutes. No waiting, just instant magical stories.",
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Builds Confidence",
      description: "Stories where your child is the hero help build self-esteem and encourage a love of reading.",
      color: "pink",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: BookOpen,
      title: "Educational Value",
      description: "Each story incorporates learning elements while maintaining the fun and magical experience.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Parents & Kids
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Love NexStory
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to create magical, safe, and educational experiences that spark imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100,000+</div>
              <div className="text-gray-600 font-medium">Stories Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">2 min</div>
              <div className="text-gray-600 font-medium">Average Creation Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600 font-medium">Parent Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;