import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface StoryRequest {
  message: string;
  childName?: string;
  childAge?: number;
  themes?: string[];
  storyTheme?: string;
  photo?: File;
}

export interface StoryPage {
  page: number;
  text: string;
  image_url?: string;
}

export interface StoryData {
  title: string;
  character_reference_url?: string;
  pages: StoryPage[];
}

export interface StoryResponse {
  result: string;
  storyData?: StoryData; // Parsed story data if available
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  story?: StoryData;
}

export class StoryService {
  private static instance: StoryService;
  
  public static getInstance(): StoryService {
    if (!StoryService.instance) {
      StoryService.instance = new StoryService();
    }
    return StoryService.instance;
  }

  private parseStoryResult(result: string): StoryData | null {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(result);
      if (parsed.title && parsed.pages) {
        return parsed as StoryData;
      }
    } catch (e) {
      // If not JSON, check if it's HTML
      if (result.trim().startsWith('<!DOCTYPE html>') || result.trim().startsWith('<html')) {
        // Extract title from HTML if possible
        const titleMatch = result.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'Your Story';
        
        // For HTML, create a single page story
        return {
          title,
          pages: [{
            page: 1,
            text: 'Your complete illustrated story is ready!',
            image_url: undefined
          }]
        };
      }
    }
    return null;
  }

  async createStory(request: StoryRequest): Promise<StoryResponse> {
    try {
      console.log('Creating story with request:', request);
      
      // If there's a photo, use FormData to send it
      if (request.photo) {
        const formData = new FormData();
        formData.append('photo', request.photo);
        formData.append('message', request.message);
        
        if (request.childName) formData.append('childName', request.childName);
        if (request.childAge) formData.append('childAge', request.childAge.toString());
        if (request.themes) formData.append('themes', request.themes.join(','));
        if (request.storyTheme) formData.append('storyTheme', request.storyTheme);
        
        console.log('Sending photo-based story request...');
        
        const response = await axios.post(`${API_BASE_URL}/api/create-story-with-photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 300000 // 5 minutes timeout for story generation with images
        });
        
        console.log('Received story response:', response.data);
        
        const storyData = this.parseStoryResult(response.data.result);
        
        return {
          result: response.data.result,
          storyData
        };
      } else {
        // Regular JSON request without photo
        console.log('Sending text-based story request...');
        
        const response = await axios.post(`${API_BASE_URL}/api/create-story`, request, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 180000 // 3 minutes timeout for story generation
        });
        
        console.log('Received story response:', response.data);
        
        const storyData = this.parseStoryResult(response.data.result);
        
        return {
          result: response.data.result,
          storyData
        };
      }
    } catch (error) {
      console.error('Error creating story:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Story creation is taking longer than expected. Please try again.');
        } else if (error.response?.status === 500) {
          throw new Error('Server error while creating story. Please try again.');
        }
      }
      throw new Error('Failed to create story. Please try again.');
    }
  }

  async sendChatMessage(message: string, conversation_id?: string): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message,
        conversation_id
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 seconds timeout for chat
      });
      
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  
  async uploadPhoto(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await axios.post(`${API_BASE_URL}/api/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000 // 30 seconds timeout for photo upload
      });
      
      return response.data.photoUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw new Error('Failed to upload photo. Please try again.');
    }
  }
}
