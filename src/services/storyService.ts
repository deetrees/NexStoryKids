import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface StoryRequest {
  message: string;
}

export interface StoryResponse {
  result: string;
}

export class StoryService {
  private static instance: StoryService;
  
  public static getInstance(): StoryService {
    if (!StoryService.instance) {
      StoryService.instance = new StoryService();
    }
    return StoryService.instance;
  }

  async createStory(request: StoryRequest): Promise<StoryResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create-story`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 120000 // 2 minutes timeout for story generation
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating story:', error);
      throw new Error('Failed to create story. Please try again.');
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
}