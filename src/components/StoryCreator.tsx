import React, { useState } from 'react';
import { Sparkles, Loader2, BookOpen, Star, Camera, Upload, X } from 'lucide-react';
import { StoryService } from '../services/storyService';

interface StoryCreatorProps {
  onClose: () => void;
}

const StoryCreator: React.FC<StoryCreatorProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [interests, setInterests] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [storyTheme, setStoryTheme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [error, setError] = useState('');

  const storyService = StoryService.getInstance();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG, etc.)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB');
        return;
      }
      
      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemovePhoto = () => {
    setUploadedPhoto(null);
    setPhotoPreview(null);
  };

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const message = `Create a personalized children's story for ${childName}, age ${childAge}. They love ${interests}. The story theme should be ${storyTheme}. Make it magical, age-appropriate, and engaging with beautiful descriptions for illustrations.`;
      
      const response = await storyService.createStory({ message });
      setGeneratedStory(response.result);
      setStep(4);
    } catch (err) {
      setError('Oops! Our story robots are taking a break. Please try again in a moment!');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">👋</div>
            <h2 className="text-3xl font-bold text-gray-900">Hi there! What's your name?</h2>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter your awesome name!"
              className="w-full px-6 py-4 text-2xl rounded-full border-4 border-purple-300 focus:border-purple-500 focus:outline-none text-center font-bold"
            />
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              placeholder="How old are you?"
              min="3"
              max="12"
              className="w-full px-6 py-4 text-2xl rounded-full border-4 border-pink-300 focus:border-pink-500 focus:outline-none text-center font-bold"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!childName || !childAge}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next! ✨
            </button>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">🎨</div>
            <h2 className="text-3xl font-bold text-gray-900">What do you LOVE, {childName}?</h2>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Tell us about your favorite animals, colors, activities, or anything cool!"
              className="w-full px-6 py-4 text-xl rounded-3xl border-4 border-blue-300 focus:border-blue-500 focus:outline-none h-32 resize-none"
            />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-xl font-bold hover:scale-105 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2.5)}
                disabled={!interests}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next! 🚀
              </button>
            </div>
          </div>
        );

      case 2.5:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">📸</div>
            <h2 className="text-3xl font-bold text-gray-900">Add {childName}'s Photo (Optional)</h2>
            <p className="text-lg text-gray-600 mb-6">
              Upload a photo to make {childName} the star of the story! This is completely optional.
            </p>
            
            {!photoPreview ? (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 rounded-3xl text-xl font-bold hover:scale-105 transition-all flex items-center justify-center space-x-3 max-w-md mx-auto border-4 border-dashed border-purple-300 hover:border-purple-500"
                >
                  <Upload className="w-8 h-8" />
                  <span>Upload Photo</span>
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG, or GIF • Max 5MB
                </p>
              </div>
            ) : (
              <div className="relative max-w-md mx-auto">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-3xl border-4 border-purple-300 shadow-lg"
                />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-sm text-green-600 mt-2 font-medium">
                  ✅ Photo uploaded! {childName} will be the star of the story!
                </p>
              </div>
            )}
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-xl font-bold hover:scale-105 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Camera className="w-6 h-6" />
                <span>Continue</span>
              </button>
            </div>
          </div>
        );

      case 3:
        const themes = [
          { name: 'Magical Adventure', icon: '/themes/magical, adventure.png', color: 'from-purple-400 to-pink-400' },
          { name: 'Space Explorer', icon: '/themes/space adventure.png', color: 'from-blue-400 to-purple-400' },
          { name: 'Animal Friends', icon: '/themes/furrypets.png', color: 'from-green-400 to-blue-400' },
          { name: 'Superhero Story', icon: '/themes/superhero.png', color: 'from-red-400 to-yellow-400' },
          { name: 'Underwater World', icon: '/themes/underthesea.png', color: 'from-blue-400 to-teal-400' },
          { name: 'Fairy Tale', icon: '/themes/fairlytale.png', color: 'from-pink-400 to-purple-400' }
        ];

        return (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">🎪</div>
            <h2 className="text-3xl font-bold text-gray-900">Pick your adventure theme!</h2>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setStoryTheme(theme.name)}
                  className={`p-6 rounded-3xl border-4 transition-all hover:scale-105 ${
                    storyTheme === theme.name 
                      ? 'border-yellow-400 bg-yellow-100' 
                      : 'border-gray-300 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <img 
                      src={theme.icon} 
                      alt={theme.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const fallbackEmojis: {[key: string]: string} = {
                          'Magical Adventure': '🦄',
                          'Space Explorer': '🚀', 
                          'Animal Friends': '🐾',
                          'Superhero Story': '🦸‍♀️',
                          'Underwater World': '🐠',
                          'Fairy Tale': '🏰'
                        };
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="text-4xl">${fallbackEmojis[theme.name] || '🎨'}</div>`;
                      }}
                    />
                  </div>
                  <div className="font-bold text-lg">{theme.name}</div>
                </button>
              ))}
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setStep(2.5)}
                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-xl font-bold hover:scale-105 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleGenerateStory}
                disabled={!storyTheme || isGenerating}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Create My Story!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl animate-bounce mb-4">📚</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Story is Ready, {childName}!</h2>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-300 max-h-96 overflow-y-auto">
              <div className="prose prose-lg max-w-none">
                {generatedStory.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-800 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setChildName('');
                  setChildAge('');
                  setInterests('');
                  setUploadedPhoto(null);
                  setPhotoPreview(null);
                  setStoryTheme('');
                  setGeneratedStory('');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:scale-105 transition-all"
              >
                Create Another! ✨
              </button>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:scale-105 transition-all"
              >
                Done! 🎉
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-rainbow relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          ×
        </button>
        
        {error && (
          <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-4 mb-6 text-center">
            <div className="text-4xl mb-2">😅</div>
            <p className="text-red-700 font-bold text-lg">{error}</p>
          </div>
        )}
        
        {isGenerating && (
          <div className="text-center space-y-4 py-12">
            <div className="text-8xl animate-spin">🌟</div>
            <h2 className="text-3xl font-bold text-purple-600">Creating Your Magical Story...</h2>
            <p className="text-xl text-gray-600">Our story robots are working super hard!</p>
            <div className="flex justify-center space-x-2">
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        
        {!isGenerating && renderStep()}
      </div>
    </div>
  );
};

export default StoryCreator;