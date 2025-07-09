import React from 'react';
import { ArrowRight, Sparkles, Star, Gift } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        {/* Floating elements */}
        <Star className="absolute top-20 left-1/4 w-6 h-6 text-white/30 animate-pulse" />
        <Star className="absolute bottom-32 right-1/4 w-8 h-8 text-white/30 animate-pulse" style={{animationDelay: '1s'}} />
        <Sparkles className="absolute top-1/3 right-1/5 w-7 h-7 text-white/30 animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-6">
            <Gift className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Limited Time: Free shipping on all orders</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your Child's
            <span className="block text-yellow-300">Magical Journey Today</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 families who have discovered the joy of personalized storytelling. 
            Your child's adventure awaits!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="group bg-white text-indigo-600 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sparkles className="relative z-10 w-6 h-6 group-hover:animate-spin" />
            <span className="relative z-10">Create Your Story Now</span>
            <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="text-white/80 text-sm">
            <div className="font-semibold">✓ No subscription required</div>
            <div>✓ Instant digital delivery</div>
          </div>
        </div>

        {/* Pricing preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$9.99</div>
              <div className="text-white/80 font-medium mb-4">Digital Story</div>
              <div className="text-sm text-white/70">
                • Personalized story<br/>
                • Beautiful illustrations<br/>
                • Instant download
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="text-3xl font-bold text-white mb-2">$24.99</div>
              <div className="text-white/80 font-medium mb-4">Premium Package</div>
              <div className="text-sm text-white/70">
                • Everything in Digital<br/>
                • Hardcover book shipped<br/>
                • Premium paper quality
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$39.99</div>
              <div className="text-white/80 font-medium mb-4">Deluxe Edition</div>
              <div className="text-sm text-white/70">
                • Everything in Premium<br/>
                • Gift box packaging<br/>
                • Bonus activity pages
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm mb-4">
              30-day money-back guarantee • Secure payment • COPPA compliant
            </p>
            <div className="flex justify-center space-x-6 text-white/60">
              <span>🔒 Secure</span>
              <span>⚡ Fast</span>
              <span>🛡️ Safe</span>
              <span>💝 Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;