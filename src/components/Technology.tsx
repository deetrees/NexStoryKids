import React from 'react';
import { Brain, Cpu, Shield, Zap } from 'lucide-react';

const Technology = () => {
  return (
    <section id="technology" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Made with
            <span className="text-purple-600"> Super Smart Robots! 🤖</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            We use the smartest computer helpers to make your stories amazing!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border-4 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">🧠</div>
              <h3 className="text-2xl font-bold text-gray-900">Story Writing Robots</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Super smart robots that know how to write the most exciting stories just for you!
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900">Picture Drawing Robots</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Amazing artist robots that draw beautiful pictures for every page of your story!
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900">Safety Robots</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Special helper robots that make sure everything is safe and perfect for kids!
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-4 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900">Speed Robots</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Super fast robots that work together to make your story ready in just minutes!
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 text-center border-4 border-purple-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            The Best Robot Team Ever! 🤖✨
          </h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            All our robot friends work together like a super team to make sure your story 
            is the most amazing, beautiful, and fun story ever made!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Technology;