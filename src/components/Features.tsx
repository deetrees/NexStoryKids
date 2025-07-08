import React from 'react';
import { Sparkles, Palette, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "One-of-a-Kind Stories",
      description: "No two adventures are the same. Our AI learns your child's name, interests, and dreams to craft a story just for them.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Stunning Custom Illustrations",
      description: "Every page features vibrant, original artwork—generated just for your child's tale.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Safe & Private",
      description: "NexStory is COPPA compliant, with every word and image double-checked for privacy and child safety.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Preview your book online, download as PDF, or print a real keepsake delivered to your door.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Parents Love NexStory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted by Thousands of Families</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <p className="text-gray-600 italic mb-4">
                  "My daughter's face lit up when she saw her name and favorite unicorn in the story! NexStory is pure magic."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Jenna P.</div>
                    <div className="text-sm text-gray-500">Parent</div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-gray-600 italic mb-4">
                  "Finally, a storybook app that's safe, easy, and truly special for every child."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mike T.</div>
                    <div className="text-sm text-gray-500">1st Grade Teacher</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Featured in:</p>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">Parenting Today</div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">EdTech Review</div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">Moms Who Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;