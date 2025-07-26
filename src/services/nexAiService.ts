import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export interface NexConversationContext {
  childName?: string;
  childAge?: number;
  interests?: string[];
  storyTheme?: string;
  hasPhoto?: boolean;
  conversationStep: 'name' | 'age' | 'interests' | 'photo' | 'theme' | 'creating' | 'complete';
}

export interface NexResponse {
  message: string;
  nextStep?: 'name' | 'age' | 'interests' | 'photo' | 'theme' | 'creating' | 'complete';
  extractedData?: {
    childName?: string;
    childAge?: number;
    interests?: string[];
    storyTheme?: string;
  };
  shouldCreateStory?: boolean;
}

export class NexAiService {
  private static instance: NexAiService;
  private conversationContext: NexConversationContext = {
    conversationStep: 'name'
  };

  public static getInstance(): NexAiService {
    if (!NexAiService.instance) {
      NexAiService.instance = new NexAiService();
    }
    return NexAiService.instance;
  }

  private getNexPersonality(): string {
    return `You are Nex, a magical and enthusiastic Personal Story Assistant for children. Your personality:
    - Warm, friendly, and genuinely excited about creating stories
    - Use emojis and magical language appropriately
    - Always refer to yourself as "Nex" and speak in first person
    - Make children feel special and like the heroes of their own stories
    - Keep responses concise but engaging (1-2 sentences max)
    - Guide the conversation naturally toward story creation
    - Be encouraging and positive always`;
  }

  private getSystemPrompt(context: NexConversationContext): string {
    const basePersonality = this.getNexPersonality();
    
    const stepInstructions = {
      name: "Ask for the child's name in a warm, welcoming way. You're meeting them for the first time.",
      age: `You now know the child's name is ${context.childName}. Ask for their age to help create an age-appropriate story.`,
      interests: `You know ${context.childName} is ${context.childAge} years old. Ask about their interests, hobbies, or favorite things to include in the story.`,
      photo: `You know ${context.childName} loves ${context.interests?.join(', ')}. Ask if they'd like to upload a photo to become the main character.`,
      theme: `${context.childName} has ${context.hasPhoto ? 'uploaded a photo and' : ''} shared their interests. Ask what type of adventure/story theme they'd prefer.`,
      creating: `You're now creating the story for ${context.childName}. Express excitement about the creation process.`,
      complete: `The story for ${context.childName} is complete! Celebrate and encourage them to read it.`
    };

    return `${basePersonality}

Current conversation step: ${context.conversationStep}
${stepInstructions[context.conversationStep]}

Context so far:
- Child's name: ${context.childName || 'Unknown'}
- Age: ${context.childAge || 'Unknown'}
- Interests: ${context.interests?.join(', ') || 'Unknown'}
- Story theme: ${context.storyTheme || 'Unknown'}
- Has photo: ${context.hasPhoto ? 'Yes' : 'No'}

Respond as Nex would, staying in character and guiding toward the next step naturally.`;
  }

  async sendMessageToOpenAI(userMessage: string): Promise<NexResponse> {
    try {
      const systemPrompt = this.getSystemPrompt(this.conversationContext);
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 150,
          temperature: 0.8
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      return this.processNexResponse(userMessage, aiMessage);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  async sendMessageToGemini(userMessage: string): Promise<NexResponse> {
    try {
      const systemPrompt = this.getSystemPrompt(this.conversationContext);
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUser message: ${userMessage}\n\nRespond as Nex:`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 150
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const aiMessage = response.data.candidates[0].content.parts[0].text;
      return this.processNexResponse(userMessage, aiMessage);
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private processNexResponse(userMessage: string, aiMessage: string): NexResponse {
    // Extract information based on current step
    const extractedData: any = {};
    let nextStep = this.conversationContext.conversationStep;
    let shouldCreateStory = false;

    switch (this.conversationContext.conversationStep) {
      case 'name':
        // Extract name from user message
        const nameMatch = userMessage.match(/(?:my name is|i'm|i am|call me)\s+([a-zA-Z]+)/i) || 
                         userMessage.match(/^([a-zA-Z]+)$/);
        if (nameMatch) {
          extractedData.childName = nameMatch[1];
          this.conversationContext.childName = nameMatch[1];
          nextStep = 'age';
        }
        break;

      case 'age':
        // Extract age from user message
        const ageMatch = userMessage.match(/(\d+)/);
        if (ageMatch) {
          extractedData.childAge = parseInt(ageMatch[1]);
          this.conversationContext.childAge = parseInt(ageMatch[1]);
          nextStep = 'interests';
        }
        break;

      case 'interests':
        // Extract interests
        extractedData.interests = [userMessage];
        this.conversationContext.interests = [userMessage];
        nextStep = 'photo';
        break;

      case 'photo':
        // Check if they want to upload photo
        const wantsPhoto = userMessage.toLowerCase().includes('yes') || 
                          userMessage.toLowerCase().includes('sure') ||
                          userMessage.toLowerCase().includes('okay');
        this.conversationContext.hasPhoto = wantsPhoto;
        nextStep = 'theme';
        break;

      case 'theme':
        // Extract story theme
        extractedData.storyTheme = userMessage;
        this.conversationContext.storyTheme = userMessage;
        nextStep = 'creating';
        shouldCreateStory = true;
        break;
    }

    // Update conversation step
    this.conversationContext.conversationStep = nextStep;

    return {
      message: aiMessage,
      nextStep,
      extractedData,
      shouldCreateStory
    };
  }

  private getFallbackResponse(userMessage: string): NexResponse {
    // Fallback responses if AI APIs fail
    const fallbackMessages = {
      name: "Hi! I'm Nex, your Personal Story Assistant! ✨ What's your name?",
      age: `Nice to meet you! How old are you?`,
      interests: "Awesome! What do you love most? Dragons? Space? Magic?",
      photo: "Would you like to upload a photo to be in your story?",
      theme: "What kind of adventure should we create together?",
      creating: "I'm creating your magical story right now! ✨",
      complete: "Your amazing story is ready! 🎉"
    };

    return {
      message: fallbackMessages[this.conversationContext.conversationStep],
      nextStep: this.conversationContext.conversationStep
    };
  }

  // Method to send message (tries OpenAI first, falls back to Gemini)
  async sendMessage(userMessage: string, preferredProvider: 'openai' | 'gemini' = 'openai'): Promise<NexResponse> {
    if (preferredProvider === 'openai' && OPENAI_API_KEY) {
      return this.sendMessageToOpenAI(userMessage);
    } else if (preferredProvider === 'gemini' && GOOGLE_API_KEY) {
      return this.sendMessageToGemini(userMessage);
    } else {
      // Try the other provider as fallback
      if (preferredProvider === 'openai' && GOOGLE_API_KEY) {
        return this.sendMessageToGemini(userMessage);
      } else if (preferredProvider === 'gemini' && OPENAI_API_KEY) {
        return this.sendMessageToOpenAI(userMessage);
      } else {
        return this.getFallbackResponse(userMessage);
      }
    }
  }

  // Reset conversation for new user
  resetConversation(): void {
    this.conversationContext = {
      conversationStep: 'name'
    };
  }

  // Get current context
  getContext(): NexConversationContext {
    return { ...this.conversationContext };
  }
}
