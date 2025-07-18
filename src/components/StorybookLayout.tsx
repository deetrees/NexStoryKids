import React from 'react';
import { Printer, Star, BookOpen } from 'lucide-react';

interface StorybookLayoutProps {
  title: string;
  story: string;
  scenes: string[];
  images: string[];
}

export default function StorybookLayout({ title, story, scenes, images }: StorybookLayoutProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
            <BookOpen className="h-8 w-8 text-purple-400" />
            <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Story Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Story Content */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="prose prose-lg sm:prose-xl max-w-none text-white/90 leading-relaxed">
              <p className="text-base sm:text-lg lg:text-xl font-medium tracking-wide">
                {story}
              </p>
            </div>
          </div>
        </div>

        {/* Scene Images and Descriptions */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-purple-200">
            Story Scenes
          </h2>
          
          <div className="space-y-8 sm:space-y-12">
            {scenes.map((scene, index) => (
              <div 
                key={index} 
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Scene Number Badge */}
                    <div className="flex-shrink-0 self-start lg:self-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className="flex-shrink-0 lg:w-80">
                      {images[index] ? (
                        <div className="relative overflow-hidden rounded-xl shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300">
                          <img
                            src={images[index]}
                            alt={`Scene ${index + 1}`}
                            className="w-full h-48 sm:h-56 lg:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-400/30">
                          <div className="text-center text-purple-300">
                            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Image Loading...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Scene Description */}
                    <div className="flex-1 flex items-center">
                      <div className="space-y-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-200">
                          Scene {index + 1}
                        </h3>
                        <p className="text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {scene}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Print Button */}
        <div className="text-center">
          <button
            onClick={handlePrint}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <Printer className="h-5 w-5 group-hover:animate-bounce" />
            <span className="text-lg">Print Storybook</span>
          </button>
          
          <p className="text-purple-300 text-sm mt-4 opacity-75">
            Create a beautiful printed version of this magical story
          </p>
        </div>

        {/* Decorative Footer Elements */}
        <div className="mt-16 flex justify-center space-x-4 opacity-30">
          <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
          <Star className="h-3 w-3 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="h-5 w-5 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
          <Star className="h-3 w-3 text-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <Star className="h-4 w-4 text-pink-400 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white !important;
            color: black !important;
          }
          
          .bg-gradient-to-br {
            background: white !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .bg-white\\/10 {
            background: #f8f9fa !important;
            border: 1px solid #dee2e6 !important;
          }
          
          .bg-white\\/5 {
            background: #f8f9fa !important;
            border: 1px solid #dee2e6 !important;
          }
        }
      `}</style>
    </div>
  );
}