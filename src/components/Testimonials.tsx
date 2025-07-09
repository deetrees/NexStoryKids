import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mom of Emma, age 7",
      content: "Emma absolutely loves seeing herself as the princess in her stories! She asks for a new one every week. The illustrations are beautiful and the stories are so engaging.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Dad of Alex, age 5",
      content: "As a parent, I love that the stories are educational while being fun. Alex has learned so much about friendship and problem-solving through his adventures.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Lisa Rodriguez",
      role: "Mom of Sofia, age 6",
      content: "The quality is incredible! We ordered the hardcover book and it's beautiful. Sofia carries it everywhere and shows it to everyone. Worth every penny.",
      rating: 5,
      avatar: "👩‍🏫"
    },
    {
      name: "David Thompson",
      role: "Dad of twins, age 8",
      content: "Both my kids got their own personalized stories and they love comparing their adventures. It's become our favorite bedtime routine.",
      rating: 5,
      avatar: "👨‍⚕️"
    },
    {
      name: "Amanda Wilson",
      role: "Mom of Jake, age 4",
      content: "Jake was struggling with reading, but these personalized stories have made him excited about books. He's improved so much in just a few months!",
      rating: 5,
      avatar: "👩‍🎨"
    },
    {
      name: "Robert Kim",
      role: "Dad of Mia, age 9",
      content: "The AI technology is impressive, but what matters most is how happy it makes Mia. She feels so special being the hero of her own stories.",
      rating: 5,
      avatar: "👨‍🔬"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Parents Are Saying
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of families who have discovered the magic of personalized storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-indigo-600" />
              </div>
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Families Worldwide</h3>
            <p className="text-gray-600">Safe, secure, and loved by parents and children alike</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="font-semibold text-gray-900">COPPA Compliant</div>
              <div className="text-sm text-gray-600">Child privacy protected</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="font-semibold text-gray-900">Instant Delivery</div>
              <div className="text-sm text-gray-600">Stories in 2 minutes</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="font-semibold text-gray-900">Premium Quality</div>
              <div className="text-sm text-gray-600">Professional illustrations</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">💝</span>
              </div>
              <div className="font-semibold text-gray-900">Money Back</div>
              <div className="text-sm text-gray-600">100% satisfaction guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;