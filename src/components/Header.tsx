import React from 'react';
import StoryCreator from './StoryCreator';
import { BookOpen, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showStoryCreator, setShowStoryCreator] = React.useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NexStory
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#technology" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Technology
            </a>
            <button 
              onClick={() => setShowStoryCreator(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              START YOUR STORY! 🚀
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#technology" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Technology
              </a>
              <button 
                onClick={() => setShowStoryCreator(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium w-fit"
              >
                START YOUR STORY! 🚀
              </button>
            </nav>
          </div>
        )}
      </div>
      </header>
      
      {showStoryCreator && (
        <StoryCreator onClose={() => setShowStoryCreator(false)} />
      )}
    </>
  );
};

export default Header;