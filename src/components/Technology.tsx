import React from 'react';
import { Brain, Cpu, Shield, Zap } from 'lucide-react';

const Technology = () => {
  const technologies = [
    {
      category: "Language Models",
      items: [
        { name: "GPT-4o", purpose: "User interaction & compliance", company: "OpenAI" },
        { name: "Claude 3 Opus", purpose: "Creative story writing", company: "Anthropic" },
        { name: "Gemini 2.5 Flash", purpose: "Creative reasoning", company: "Google" }
      ],
      icon: <Brain className="w-6 h-6" />,
      color: "purple"
    },
    {
      category: "AI Infrastructure",
      items: [
        { name: "CrewAI", purpose: "Multi-agent orchestration", company: "CrewAI" },
        { name: "Agent Communication Protocol", purpose: "Server communication", company: "ACP" },
        { name: "Flux-Kontext-Max", purpose: "Image generation", company: "Replicate" }
      ],
      icon: <Cpu className="w-6 h-6" />,
      color: "blue"
    },
    {
      category: "Safety & Compliance",
      items: [
        { name: "AWS Rekognition", purpose: "Content moderation", company: "Amazon" },
        { name: "COPPA Compliance", purpose: "Child privacy protection", company: "Built-in" },
        { name: "Content Filtering", purpose: "Age-appropriate content", company: "Custom" }
      ],
      icon: <Shield className="w-6 h-6" />,
      color: "green"
    },
    {
      category: "Performance",
      items: [
        { name: "Async Processing", purpose: "Fast story generation", company: "Python" },
        { name: "Real-time Updates", purpose: "Live progress tracking", company: "SSE" },
        { name: "Scalable Architecture", purpose: "Handle multiple requests", company: "Custom" }
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "orange"
    }
  ];

  const colorClasses = {
    purple: "from-purple-500 to-purple-600 border-purple-200 bg-purple-50",
    blue: "from-blue-500 to-blue-600 border-blue-200 bg-blue-50",
    green: "from-green-500 to-green-600 border-green-200 bg-green-50",
    orange: "from-orange-500 to-orange-600 border-orange-200 bg-orange-50"
  };

  return (
    <section id="technology" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built with
            <span className="gradient-text"> Cutting-Edge Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage the best AI models and technologies available, strategically choosing 
            the right tool for each specific task to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="card-hover bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[tech.color].split(' ')[0]} ${colorClasses[tech.color].split(' ')[1]} text-white mr-4`}>
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{tech.category}</h3>
              </div>
              
              <div className="space-y-4">
                {tech.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.purpose}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full ml-4">
                      {item.company}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Strategic Multi-Model Approach
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unlike other AI applications that rely on a single model, NexStory strategically uses 
            the best AI model for each specific task. This ensures optimal performance, creativity, 
            and safety across every aspect of story creation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technology;