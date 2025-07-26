import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Camera, X } from 'lucide-react';
import { StoryService } from '../services/storyService';
import { NexAiService, NexConversationContext } from '../services/nexAiService';
import StorybookViewer from './StorybookViewer';
import HtmlStoryViewer from './HtmlStoryViewer';
import InteractiveMascot from './InteractiveMascot';

interface NexConversationProps {
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'nex';
  content: string;
  timestamp: Date;
}

interface StoryData {
  title: string;
  pages: Array<{
    page: number;
    text: string;
    image_url?: string;
  }>;
  character_reference_url?: string;
  htmlContent?: string;
}

const NexConversation: React.FC<NexConversationProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState<StoryData | null>(null);
  const [showStorybook, setShowStorybook] = useState(false);
  const [conversationContext, setConversationContext] = useState<NexConversationContext>({
    conversationStep: 'name'
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const nexAiService = NexAiService.getInstance();
  const storyService = StoryService.getInstance();

  // Initialize with Nex's welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'nex',
        content: "Hi! I'm Nex, your Personal Story Assistant! ✨ I'm here to create the most amazing personalized story just for you! What's your name?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNexMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    
    try {
      // Send to Nex AI service (try OpenAI first, fallback to Gemini)
      const nexResponse = await nexAiService.sendMessage(userMessage, 'openai');
      
      // Add Nex's response
      const nexMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'nex',
        content: nexResponse.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, nexMsg]);
      
      // Update conversation context
      if (nexResponse.nextStep) {
        setConversationContext(prev => ({
          ...prev,
          conversationStep: nexResponse.nextStep!,
          ...nexResponse.extractedData
        }));
      }
      
      // Handle photo upload step
      if (nexResponse.nextStep === 'theme' && conversationContext.hasPhoto) {
        // Show photo upload option
        setTimeout(() => {
          const photoMsg: Message = {
            id: (Date.now() + 2).toString(),
            role: 'nex',
            content: "Great! Click the camera button below to upload your photo so you can be the star of your story! 📸",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, photoMsg]);
        }, 1000);
      }
      
      // Handle story creation
      if (nexResponse.shouldCreateStory) {
        setTimeout(() => {
          createStoryWithNex();
        }, 1500);
      }
      
    } catch (error) {
      console.error('Error communicating with Nex:', error);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'nex',
        content: "Oops! I had a little magical hiccup. Could you try saying that again? ✨",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        const errorMsg: Message = {
          id: Date.now().toString(),
          role: 'nex',
          content: "Hmm, that doesn't look like a photo! Please upload a JPG, PNG, or GIF file. 📸",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMsg]);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg: Message = {
          id: Date.now().toString(),
          role: 'nex',
          content: "That photo is a bit too big for my magic! Could you try a smaller one? (under 5MB) ✨",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMsg]);
        return;
      }
      
      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        
        const photoMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: '📸 [Photo uploaded]',
          timestamp: new Date()
        };
        
        const confirmMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'nex',
          content: `Perfect! I got your photo and you look amazing! You're going to be the perfect hero for this story! 🌟 Now, what kind of adventure should we create together?`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, photoMsg, confirmMsg]);
        setConversationContext(prev => ({ ...prev, hasPhoto: true, conversationStep: 'theme' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const createStoryWithNex = async () => {
    try {
      const context = nexAiService.getContext();
      
      const creatingMsg: Message = {
        id: Date.now().toString(),
        role: 'nex',
        content: `Hold on tight, ${context.childName}! I'm weaving your magical story about ${context.storyTheme} with beautiful illustrations! This is so exciting! ✨`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, creatingMsg]);
      setIsLoading(true);
      
      // Create story request
      const storyRequest = {
        message: `Create a personalized children's story for ${context.childName}, age ${context.childAge}. They love ${context.interests?.join(', ')}. The story theme should be ${context.storyTheme}.`,
        childName: context.childName,
        childAge: context.childAge,
        themes: context.interests || [],
        storyTheme: context.storyTheme,
        photo: uploadedPhoto
      };
      
      const response = await storyService.createStory(storyRequest);
      
      // Process story response
      if (response.storyData) {
        setGeneratedStory(response.storyData);
      } else {
        // Handle different response formats
        try {
          const storyData = JSON.parse(response.result);
          if (storyData.title && storyData.pages) {
            setGeneratedStory(storyData);
          } else {
            setGeneratedStory({
              title: `${context.childName}'s ${context.storyTheme} Adventure`,
              pages: [{ page: 1, text: response.result }]
            });
          }
        } catch {
          if (response.result.trim().startsWith('<!DOCTYPE html>')) {
            setGeneratedStory({
              title: `${context.childName}'s ${context.storyTheme} Adventure`,
              pages: [{ page: 1, text: 'Your complete illustrated story is ready!' }],
              htmlContent: response.result
            });
          } else {
            setGeneratedStory({
              title: `${context.childName}'s ${context.storyTheme} Adventure`,
              pages: [{ page: 1, text: response.result }]
            });
          }
        }
      }
      
      // Nex celebrates completion
      const completeMsg: Message = {
        id: Date.now().toString(),
        role: 'nex',
        content: `Ta-da! ${context.childName}, your amazing story is ready! I had so much fun creating this ${context.storyTheme} adventure with you! Click 'View Story' to read it! 🎉`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, completeMsg]);
      setConversationContext(prev => ({ ...prev, conversationStep: 'complete' }));
      
    } catch (error) {
      console.error('Error creating story:', error);
      
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: 'nex',
        content: "Oh no! Something went wrong with my story magic. Let's try again! ✨",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
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
              childName={conversationContext.childName || 'Hero'}
              onClose={() => setShowStorybook(false)}
            />
          )
        ) : (
          <>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-purple-700">Chat with Nex</h2>
              <p className="text-gray-600">Your Personal Story Assistant</p>
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
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.role === 'nex' && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">N</span>
                        </div>
                        <span className="text-xs font-semibold text-purple-600">Nex</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">N</span>
                      </div>
                      <span className="text-xs font-semibold text-purple-600">Nex is thinking...</span>
                    </div>
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
                  <span>View Your Story</span>
                </button>
              </div>
            )}
            
            {/* Photo upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            
            {(conversationContext.conversationStep === 'photo' || conversationContext.conversationStep === 'theme') && (
              <div className="mb-4 text-center">
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full cursor-pointer hover:bg-purple-200 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span>Upload Photo</span>
                </label>
              </div>
            )}
          </>
        )}
        
        {/* Interactive Mascot */}
        <InteractiveMascot 
          currentStep={conversationContext.conversationStep}
          childName={conversationContext.childName}
          isAnimating={isLoading}
          isListening={true}
          onMessage={handleNexMessage}
        />
      </div>
    </div>
  );
};

export default NexConversation;
