import React from 'react';
import { Star, Heart, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: "🌟",
      title: "You're the Star!",
      description: "Every story is about YOU! Your name, your favorite things, your amazing adventure!",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: "🎨",
      title: "Beautiful Pictures!",
      description: "Colorful drawings made just for your story - like having your own personal artist!",
      color: "from-pink-400 to-purple-400"
    },
    {
      icon: "🛡️",
      title: "Super Safe!",
      description: "Made specially for kids - parents love it and it's totally safe!",
      color: "from-green-400 to-blue-400"
    },
    {
      icon: "⚡",
      title: "Ready Super Fast!",
      description: "Your story is ready in just a few minutes - faster than making a sandwich!",
      color: "from-blue-400 to-purple-400"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-pink-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Kids <span className="text-purple-600">❤️</span> NexStory
          </h2>
          <p className="text-xl text-gray-700 font-medium">It's like magic, but real!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-3xl p-8 border-4 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-rainbow max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Kids Say! 😊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">😍</div>
                <p className="text-gray-700 text-lg italic mb-4">
                  "I LOVE my unicorn story! I'm a princess and I save the day!"
                </p>
                <div className="font-bold text-purple-600">- Emma, age 7</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-gray-700 text-lg italic mb-4">
                  "My story has dragons and I'm the hero! So cool!"
                </p>
                <div className="font-bold text-blue-600">- Alex, age 8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;