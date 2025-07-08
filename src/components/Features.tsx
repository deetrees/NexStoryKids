import React from 'react';
import { Star, Heart, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: "🌟",
      title: "You're the STAR!",
      description: "Every story is about YOU! Your name, your favorite things, your amazing superpowers!",
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400"
    },
    {
      icon: "🎨",
      title: "WOW Pictures!",
      description: "Incredible drawings made just for YOUR story - like having a magic art robot!",
      color: "from-pink-400 to-purple-400",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-400"
    },
    {
      icon: "🛡️",
      title: "Super SAFE!",
      description: "Made specially for awesome kids like you - parents love it and it's totally safe!",
      color: "from-green-400 to-blue-400",
      bgColor: "bg-green-100",
      borderColor: "border-green-400"
    },
    {
      icon: "⚡",
      title: "Lightning FAST!",
      description: "Your story is ready in 2 minutes - faster than brushing your teeth!",
      color: "from-blue-400 to-purple-400",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-400"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🎪</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{animationDelay: '1s'}}>🎠</div>
        <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🎨</div>
        <div className="absolute bottom-20 right-1/3 text-4xl opacity-20 animate-float" style={{animationDelay: '0.5s'}}>🌈</div>
        
        {/* Floating bubbles */}
        <div className="absolute top-32 left-1/5 w-20 h-20 bg-purple-300/30 rounded-full animate-bounce" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-40 right-1/5 w-16 h-16 bg-pink-300/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-12 h-12 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '2.2s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border-4 border-rainbow shadow-lg mb-6 animate-wiggle">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
              Why Kids <span className="text-red-500 animate-pulse text-6xl">❤️</span> NexStory
            </h2>
          </div>
          <p className="text-2xl text-gray-800 font-bold animate-bounce">It's like having a magic story machine! ✨</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`group ${feature.bgColor} rounded-3xl p-8 border-6 ${feature.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:animate-wiggle cursor-pointer relative overflow-hidden animate-float`} style={{animationDelay: `${index * 0.3}s`}}>
              {/* Sparkle effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2 text-yellow-400 text-xl animate-pulse">✨</div>
                <div className="absolute bottom-2 left-2 text-pink-400 text-lg animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
                <div className="absolute top-1/2 left-2 text-purple-400 text-sm animate-pulse" style={{animationDelay: '1s'}}>💫</div>
                <div className="absolute bottom-1/2 right-2 text-blue-400 text-sm animate-pulse" style={{animationDelay: '1.5s'}}>🌟</div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="text-8xl mb-6 group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors animate-pulse">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">{feature.description}</p>
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-6 border-rainbow max-w-5xl mx-auto relative overflow-hidden animate-glow">
            {/* Floating elements inside testimonial box */}
            <div className="absolute top-4 left-4 text-3xl animate-spin opacity-30">🎪</div>
            <div className="absolute top-4 right-4 text-2xl animate-bounce opacity-30">🎈</div>
            <div className="absolute bottom-4 left-4 text-2xl animate-pulse opacity-30">🎭</div>
            <div className="absolute bottom-4 right-4 text-3xl animate-wiggle opacity-30">🎨</div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <div className="bg-green-200 px-6 py-3 rounded-full border-4 border-green-500 hover:scale-110 transition-transform animate-bounce">
                <span className="text-green-800 font-bold text-lg">🛡️ SUPER SAFE FOR KIDS</span>
              </div>
              <div className="bg-blue-200 px-6 py-3 rounded-full border-4 border-blue-500 hover:scale-110 transition-transform animate-bounce" style={{animationDelay: '0.3s'}}>
                <span className="text-blue-800 font-bold text-lg">🤖 MADE BY SMART ROBOTS</span>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-8 animate-wiggle">What Amazing Kids Say! 😊</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="text-center bg-purple-100 rounded-2xl p-6 border-4 border-purple-400 hover:scale-105 transition-transform animate-float">
                <div className="text-6xl mb-4 animate-bounce">😍</div>
                <p className="text-gray-800 text-xl italic mb-4 font-medium">
                  "I LOVE my unicorn story! I'm a princess and I save the WHOLE WORLD!"
                </p>
                <div className="font-bold text-purple-700 text-lg">- Emma, age 7 👑</div>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="text-yellow-400 text-2xl animate-pulse">⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.2s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.4s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.6s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.8s'}}>⭐</span>
                </div>
              </div>
              
              <div className="text-center bg-blue-100 rounded-2xl p-6 border-4 border-blue-400 hover:scale-105 transition-transform animate-float" style={{animationDelay: '0.5s'}}>
                <div className="text-6xl mb-4 animate-bounce" style={{animationDelay: '0.5s'}}>🚀</div>
                <p className="text-gray-800 text-xl italic mb-4 font-medium">
                  "My story has DRAGONS and I'm the hero with superpowers! SO COOL!"
                </p>
                <div className="font-bold text-blue-700 text-lg">- Alex, age 8 🦸‍♂️</div>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.1s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.3s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.7s'}}>⭐</span>
                  <span className="text-yellow-400 text-2xl animate-pulse" style={{animationDelay: '0.9s'}}>⭐</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t-4 border-rainbow">
              <p className="text-lg text-gray-600 mb-4 font-bold animate-pulse">Parents say it's AMAZING too! 👨‍👩‍👧‍👦</p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <div className="bg-yellow-200 px-4 py-2 rounded-full text-lg font-bold text-yellow-800 border-2 border-yellow-400 hover:scale-110 transition-transform animate-wiggle">⭐ "Educational!"</div>
                <div className="bg-green-200 px-4 py-2 rounded-full text-lg font-bold text-green-800 border-2 border-green-400 hover:scale-110 transition-transform animate-wiggle" style={{animationDelay: '0.3s'}}>⭐ "So Creative!"</div>
                <div className="bg-pink-200 px-4 py-2 rounded-full text-lg font-bold text-pink-800 border-2 border-pink-400 hover:scale-110 transition-transform animate-wiggle" style={{animationDelay: '0.6s'}}>⭐ "Kids Love It!"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;