import React from 'react';
import { MessageSquare, Sparkles, BookOpen } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Tell Us About Your Child",
      description: "Chat with our friendly AI to share your child's name, favorite animals, hobbies, or magical places.",
      color: "purple"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Watch the Story Unfold",
      description: "See your personalized adventure come alive—complete with beautiful illustrations!",
      color: "pink"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Make It Yours Forever",
      description: "Download, share, or order a printed copy to cherish for years to come.",
      color: "blue"
    }
  ];

  const colorClasses = {
    purple: "from-purple-500 to-purple-600 border-purple-200 bg-purple-50",
    pink: "from-pink-500 to-pink-600 border-pink-200 bg-pink-50",
    blue: "from-blue-500 to-blue-600 border-blue-200 bg-blue-50"
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Creating your child's personalized storybook is as easy as 1-2-3!</p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to create magic?</h3>
            <button className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300">
              Start Your Free Story Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;