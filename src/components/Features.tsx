import React from 'react';
import { Sparkles, Users, Shield, Zap, BookOpen, Palette } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Multi-Agent AI System",
      description: "Five specialized AI agents work together - Interviewer, Creator, Illustrator, Compliance Officer, and Assembler - each powered by best-in-class language models.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Personalized Stories",
      description: "Every story is uniquely crafted based on your child's interests, age, and preferences. No two stories are ever the same.",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Illustrations",
      description: "High-quality, custom illustrations generated using advanced AI models like Flux-Kontext-Max to bring every story to life.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Child-Safe Content",
      description: "Built-in safety and compliance checks ensure all content is age-appropriate and follows COPPA guidelines for child privacy.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate complete illustrated storybooks in minutes, not hours. Perfect for bedtime stories or educational content.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Perfect for Everyone",
      description: "Ideal for parents, educators, librarians, and anyone who wants to create engaging content for young readers.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powered by Advanced
            <span className="block gradient-text">AI Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our sophisticated multi-agent system combines the best AI models to create magical, 
            personalized stories that captivate young minds and spark imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;