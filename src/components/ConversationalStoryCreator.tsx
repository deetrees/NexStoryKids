import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Send, Camera, Upload, X } from 'lucide-react';
import { StoryService } from '../services/storyService';
import StorybookViewer from './StorybookViewer';
import HtmlStoryViewer from './HtmlStoryViewer';
import InteractiveMascot from './InteractiveMascot';

interface ConversationalStoryCreatorProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface StoryPage {
  page: number;
  text: string;
  image_url: string;
}

interface StoryData {
  title: string;
  pages: StoryPage[];
  character_reference_url?: string;
  htmlContent?: string; // For HTML-formatted stories
}

const ConversationalStoryCreator: React.FC<ConversationalStoryCreatorProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState<StoryData | null>(null);
  const [showStorybook, setShowStorybook] = useState(false);
  const [childName, setChildName] = useState('');
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  
  // Mascot state
  const [currentMascotStep, setCurrentMascotStep] = useState<'welcome' | 'name' | 'age' | 'interests' | 'photo' | 'theme' | 'creating' | 'complete'>('welcome');
  const [mascotAnimating, setMascotAnimating] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const storyService = StoryService.getInstance();

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "👋 Hi there! I'm working with Nex to help create your magical personalized storybook. What's the name of the child we're creating this story for today? 🌟",
        timestamp: new Date()
      }
    ]);
    setCurrentMascotStep('name');
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Check if this is the first user message (likely the child's name)
      if (messages.length === 1) {
        setChildName(input);
      }
      
      // Try to use the chat API
      try {
        const response = await storyService.sendChatMessage(input, conversationId);
        setConversationId(response.conversation_id);
        
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: response.response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Check if a story was generated
        if (response.story) {
          console.log("Story generated:", response.story);
          setGeneratedStory(response.story);
        }
      } catch (chatError) {
        console.error('Chat API error, falling back to scripted responses:', chatError);
        
        // Fallback to scripted responses
        if (messages.length === 1) {
          // First message is likely the child's name
          setCurrentMascotStep('age');
          setTimeout(() => {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `Nice to meet you, ${input}! 😊 How old are you? (Or if you're creating this for someone else, what's their age?)`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }, 1000);
        } else if (messages.length === 3) {
          // Second message is likely the age
          setCurrentMascotStep('interests');
          setTimeout(() => {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `Awesome! Now, tell me what you love! 🦄 🚀 🦖 Do you like dinosaurs, space, princesses, superheroes, animals, or something else? (You can list multiple things!)`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }, 1000);
        } else if (messages.length === 5) {
          // Third message is likely interests
          setCurrentMascotStep('photo');
          setTimeout(() => {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `That sounds amazing! 🌈 Would you like to upload a photo to make yourself the star of the story? (You can say "yes" to upload a photo, or "no" to continue without one)`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }, 1000);
        } else if (messages.length === 7) {
          if (input.toLowerCase().includes('yes')) {
            // Prompt to upload photo
            setTimeout(() => {
              const assistantMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `Great! Click the camera button below to upload your photo. 📸`,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, assistantMessage]);
            }, 1000);
          } else {
            // Skip photo and ask about theme
            setCurrentMascotStep('theme');
            setTimeout(() => {
              const assistantMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `No problem! Now, what kind of adventure would you like? 🏰 Magical Adventure, 🚀 Space Explorer, 🐾 Animal Friends, 🦸‍♀️ Superhero Story, 🐠 Underwater World, or 🧚‍♀️ Fairy Tale?`,
                timestamp: new Date()
              };
              setMessages(prev => [...prev, assistantMessage]);
            }, 1000);
          }
        } else if (messages.length === 9 || (messages.length === 11 && photoPreview)) {
          // Final confirmation and generate story
          setCurrentMascotStep('creating');
          setMascotAnimating(true);
          setTimeout(() => {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `Perfect choice! I'm going to create an amazing story for you now. This will take a minute or two, so please be patient while I work my magic! ✨`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            
            // Extract information from conversation
            const nameMessage = messages[1].content;
            const ageMessage = messages[3].content;
            const interestsMessage = messages[5].content;
            const themeMessage = input;
            
            // Parse age (extract number)
            const ageMatch = ageMessage.match(/\d+/);
            const age = ageMatch ? parseInt(ageMatch[0]) : 6;
            
            // Create request
            const request = {
              message: `Create a personalized children's story for ${childName}, age ${age}. They love ${interestsMessage}. The story theme should be ${themeMessage}.`,
              childName: childName,
              childAge: age,
              themes: [interestsMessage],
              storyTheme: themeMessage,
              photo: uploadedPhoto
            };
            
            // Generate story
            generateStory(request);
          }, 1000);
        } else {
          // Generic response for other messages
          setTimeout(() => {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: `Thanks for sharing! Is there anything else you'd like to tell me about the story you want to create?`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble understanding. Could you try again?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Oops! That doesn't look like an image file. Please upload a JPG, PNG, or GIF file.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "That image is a bit too large (over 5MB). Could you try a smaller one?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      
      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        setCurrentMascotStep('theme');
        
        // Add photo message
        const photoMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: '📸 [Photo uploaded]',
          timestamp: new Date()
        };
        
        const confirmMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: "Perfect! I got your photo. You'll be the star of this story! 🌟 Now, what kind of adventure would you like? 🏰 Magical Adventure, 🚀 Space Explorer, 🐾 Animal Friends, 🦸‍♀️ Superhero Story, 🐠 Underwater World, or 🧚‍♀️ Fairy Tale?",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, photoMessage, confirmMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateStory = async (request: any) => {
    try {
      console.log('Generating story with request:', request);
      
      const response = await storyService.createStory(request);
      
      console.log('Story generation response:', response);
      
      // Check if we have structured story data
      if (response.storyData) {
        setGeneratedStory(response.storyData);
      } else {
        // Try to parse the raw result
        try {
          const storyData = JSON.parse(response.result);
          if (storyData.title && storyData.pages) {
            setGeneratedStory(storyData);
          } else {
            // Create a simple story structure
            setGeneratedStory({
              title: `${childName}'s ${request.storyTheme || 'Adventure'} Story`,
              pages: [
                {
                  page: 1,
                  text: response.result,
                  image_url: photoPreview || undefined
                }
              ]
            });
          }
        } catch (parseError) {
          console.log('Could not parse as JSON, checking if HTML...');
          
          // Check if it's HTML
          if (response.result.trim().startsWith('<!DOCTYPE html>') || response.result.trim().startsWith('<html')) {
            // For HTML stories, create a special viewer
            setGeneratedStory({
              title: `${childName}'s ${request.storyTheme || 'Adventure'} Story`,
              pages: [
                {
                  page: 1,
                  text: 'Your complete illustrated story is ready! Click "View Full Story" to see it.',
                  image_url: undefined
                }
              ],
              htmlContent: response.result // Store HTML for special handling
            });
          } else {
            // Fallback to simple text story
            setGeneratedStory({
              title: `${childName}'s ${request.storyTheme || 'Adventure'} Story`,
              pages: [
                {
                  page: 1,
                  text: response.result,
                  image_url: photoPreview || undefined
                }
              ]
            });
          }
        }
      }
      
      // Add completion message
      const completionMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "✨ Your magical story is ready! Click 'View Storybook' to read it! ✨",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, completionMessage]);
      setCurrentMascotStep('complete');
      setMascotAnimating(false);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error generating story:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Oh no! Something went wrong while creating your story. Let's try again! The error was: " + (error as Error).message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-2xl w-full h-[80vh] flex flex-col border-8 border-rainbow relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          ×
        </button>
        
        {showStorybook && generatedStory ? (
          generatedStory.htmlContent ? (
            <HtmlStoryViewer
              htmlContent={generatedStory.htmlContent}
              title={generatedStory.title}
              onClose={() => setShowStorybook(false)}
            />
          ) : (
            <StorybookViewer 
              title={generatedStory.title} 
              pages={generatedStory.pages} 
              childName={childName}
              onClose={() => {
                setShowStorybook(false);
              }}
            />
          )
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-purple-700">Story Creator</h2>
              <p className="text-gray-600">Chat with me to create your personalized story!</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-2xl mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-purple-500 text-white rounded-tr-none'
                        : 'bg-white border-2 border-purple-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border-2 border-purple-200 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-purple-300 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {generatedStory && (
              <div className="mb-4">
                <button
                  onClick={() => setShowStorybook(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>View Storybook</span>
                </button>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </label>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-2 border-purple-200 rounded-full px-4 py-3 focus:outline-none focus:border-purple-500"
                disabled={isLoading}
              />
              
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-full ${
                  !input.trim() || isLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </>
        )}
        
        {/* Interactive Mascot */}
        <InteractiveMascot 
          currentStep={currentMascotStep}
          childName={childName}
          isAnimating={mascotAnimating}
        />
      </div>
    </div>
  );
};

export default ConversationalStoryCreator;
