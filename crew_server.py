#!/usr/bin/env python3
"""
Improved conversational server that integrates with the crew
"""
import asyncio
import sys
import os
import json
import uuid
import re
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("server.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("nexstory-server")

# Add the parent directory to the path to import crew
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from crew import crew

# Create uploads directory if it doesn't exist
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="NexStory Crew API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the uploads directory to serve files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

class MessageRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class MessageResponse(BaseModel):
    response: str
    conversation_id: str
    story: Optional[Dict[str, Any]] = None

class StoryRequest(BaseModel):
    message: str
    childName: Optional[str] = None
    childAge: Optional[int] = None
    themes: Optional[List[str]] = None
    storyTheme: Optional[str] = None

class StoryResponse(BaseModel):
    result: str

# Store active conversations
active_conversations: Dict[str, Dict[str, Any]] = {}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/chat")
async def chat(request: MessageRequest) -> MessageResponse:
    """Chat with the story interviewer agent directly"""
    
    logger.info(f"Received chat message: {request.message}")
    
    try:
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Initialize conversation if this is a new one
        if conversation_id not in active_conversations:
            logger.info(f"Creating new conversation: {conversation_id}")
            active_conversations[conversation_id] = {
                "messages": []
            }
        
        # Add message to conversation history
        active_conversations[conversation_id]["messages"].append({
            "role": "user",
            "content": request.message
        })
        
        # Get conversation history
        conversation_history = active_conversations[conversation_id]["messages"]
        story_data = None
        
        # Determine the appropriate response based on conversation state
        if len(conversation_history) == 1:  # First user message (name)
            child_name = request.message.strip()
            response = f"Nice to meet you, {child_name}! 😊 How old are you? (Or if you're creating this for someone else, what's their age?)"
        elif len(conversation_history) == 3:  # Second user message (age)
            response = "Awesome! Now, tell me what you love! 🦄 🚀 🦖 Do you like dinosaurs, space, princesses, superheroes, animals, or something else? (You can list multiple things!)"
        elif len(conversation_history) == 5:  # Third user message (interests)
            response = "That sounds amazing! 🌈 Would you like to upload a photo to make yourself the star of the story? (You can say 'yes' to upload a photo, or 'no' to continue without one)"
        elif len(conversation_history) == 7:  # Fourth user message (photo yes/no)
            if "yes" in request.message.lower():
                response = "Great! Click the camera button below to upload your photo. 📸"
            else:
                response = "No problem! Now, what kind of adventure would you like? 🏰 Magical Adventure, 🚀 Space Explorer, 🐾 Animal Friends, 🦸‍♀️ Superhero Story, 🐠 Underwater World, or 🧚‍♀️ Fairy Tale?"
        elif len(conversation_history) == 9 or (len(conversation_history) == 11 and "photo" in conversation_history[-4]["content"].lower()):
            # Theme selection or after photo upload
            response = "Perfect choice! I'm going to create an amazing story for you now. This will take a minute or two, so please be patient while I work my magic! ✨"
            
            # Extract information from conversation history
            child_name = ""
            age = 6
            interests = ""
            theme = request.message
            photo_url = None
            
            # Extract child name from first message
            if len(conversation_history) >= 1:
                child_name = conversation_history[0]["content"].strip()
            
            # Extract age from second message
            if len(conversation_history) >= 3:
                age_message = conversation_history[2]["content"]
                age_match = re.search(r'\d+', age_message)
                if age_match:
                    age = int(age_match.group())
            
            # Extract interests from third message
            if len(conversation_history) >= 5:
                interests = conversation_history[4]["content"]
            
            # Check if photo was uploaded
            if "photo_url" in active_conversations[conversation_id]:
                photo_url = active_conversations[conversation_id]["photo_url"]
            
            # Create structured inputs for the crew
            crew_inputs = {
                "child_name": child_name,
                "age": age,
                "themes": [interests],
                "source_photo_url": photo_url or "https://example.com/default.jpg",
                "story_theme": theme,
                "message": f"Create a personalized children's story for {child_name}, age {age}. They love {interests}. The story theme should be {theme}."
            }
            
            logger.info(f"Creating story with inputs: {crew_inputs}")
            
            try:
                # Initialize and run the actual crew
                story_crew = crew()
                result = await story_crew.kickoff_async(inputs=crew_inputs)
                
                logger.info("Story created successfully")
                
                # Try to parse the result as JSON
                try:
                    story_data = json.loads(str(result))
                except json.JSONDecodeError:
                    # If parsing fails, create a simple story with just text
                    story_data = {
                        "title": f"{child_name}'s {theme} Adventure",
                        "pages": [
                            {
                                "page": 1,
                                "text": str(result),
                                "image_url": photo_url or "https://via.placeholder.com/800x600?text=Story+Illustration"
                            }
                        ]
                    }
                
                # Add a completion message
                response += "\n\n✨ Your magical story is ready! Click 'View Storybook' to read it! ✨"
                
            except Exception as e:
                logger.error(f"Error creating story with crew: {e}")
                import traceback
                traceback.print_exc()
                
                # Fallback to a mock story
                story_data = {
                    "title": f"{child_name}'s {theme} Adventure",
                    "pages": [
                        {
                            "page": 1,
                            "text": f"Once upon a time, there was a {age}-year-old child named {child_name} who loved {interests}.",
                            "image_url": photo_url or "https://via.placeholder.com/800x600?text=Page+1"
                        },
                        {
                            "page": 2,
                            "text": f"One day, {child_name} discovered a magical portal that led to a world of {theme}.",
                            "image_url": "https://via.placeholder.com/800x600?text=Page+2"
                        },
                        {
                            "page": 3,
                            "text": f"{child_name} had an amazing adventure, making new friends and discovering new places.",
                            "image_url": "https://via.placeholder.com/800x600?text=Page+3"
                        },
                        {
                            "page": 4,
                            "text": f"At the end of the day, {child_name} returned home, excited to share the story with everyone.",
                            "image_url": "https://via.placeholder.com/800x600?text=Page+4"
                        }
                    ]
                }
                
                response += "\n\n✨ Your magical story is ready! Click 'View Storybook' to read it! ✨"
        else:
            # Default response for other cases
            response = "Thanks for sharing! Is there anything else you'd like to tell me about the story you want to create?"
        
        # Add response to conversation history
        active_conversations[conversation_id]["messages"].append({
            "role": "assistant",
            "content": response
        })
        
        logger.info(f"Sent response for conversation {conversation_id}")
        return MessageResponse(response=response, conversation_id=conversation_id, story=story_data)
        
    except Exception as e:
        logger.error(f"Error in chat: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@app.post("/api/create-story")
async def create_story(request: StoryRequest) -> StoryResponse:
    """Create a story using the crew"""
    
    logger.info(f"Received story request: {request}")
    
    try:
        # Extract story details from the request
        child_name = request.childName or "Hero"
        age = request.childAge or 6
        interests = request.themes or ["adventure"]
        theme = request.storyTheme or "adventure"
        
        # Create structured inputs for the crew
        crew_inputs = {
            "child_name": child_name,
            "age": age,
            "themes": interests,
            "source_photo_url": "https://example.com/default.jpg",  # Default - would come from photo upload
            "story_theme": theme,
            "message": request.message
        }
        
        logger.info(f"Creating story with inputs: {crew_inputs}")
        
        # Initialize and run the actual crew
        story_crew = crew()
        result = await story_crew.kickoff_async(inputs=crew_inputs)
        
        logger.info("Story created successfully")
        return StoryResponse(result=str(result))
        
    except Exception as e:
        logger.error(f"Error creating story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Story creation failed: {str(e)}")

@app.post("/api/upload-photo")
async def upload_photo(photo: UploadFile = File(...)):
    """Upload a photo and return the URL"""
    try:
        # Generate a unique filename
        file_extension = os.path.splitext(photo.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        # Save the file
        with open(file_path, "wb") as f:
            content = await photo.read()
            f.write(content)
        
        # Return the URL to the file
        photo_url = f"/uploads/{unique_filename}"
        logger.info(f"Photo uploaded successfully: {photo_url}")
        
        return {"photoUrl": photo_url}
    except Exception as e:
        logger.error(f"Error uploading photo: {e}")
        raise HTTPException(status_code=500, detail=f"Photo upload failed: {str(e)}")

@app.post("/api/create-story-with-photo")
async def create_story_with_photo(
    background_tasks: BackgroundTasks,
    photo: UploadFile = File(...),
    message: str = Form(...),
    childName: Optional[str] = Form(None),
    childAge: Optional[str] = Form(None),
    themes: Optional[str] = Form(None),
    storyTheme: Optional[str] = Form(None)
):
    """Create a story with a photo using the crew with image generation"""
    try:
        logger.info(f"Received story request with photo: {photo.filename}")
        
        # Save the uploaded photo
        file_extension = os.path.splitext(photo.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as f:
            content = await photo.read()
            f.write(content)
        
        logger.info(f"Photo saved to: {file_path}")
        
        # Get the URL to the file (use file:// for local access by crew)
        photo_url = f"file://{file_path}"
        
        # Parse optional parameters
        age = int(childAge) if childAge and childAge.isdigit() else 6
        theme_list = themes.split(',') if themes else ["adventure"]
        story_theme = storyTheme or "adventure"
        child_name = childName or "Hero"
        
        # Create structured inputs for the crew
        crew_inputs = {
            "child_name": child_name,
            "age": age,
            "themes": theme_list,
            "source_photo_url": photo_url,
            "story_theme": story_theme,
            "message": message
        }
        
        logger.info(f"Creating story with inputs: {crew_inputs}")
        
        # Initialize and run the crew with image generation
        import sys
        sys.path.append('/Users/dvinemoment/nexstory_acp/nexstory')
        from crew import crew
        story_crew = crew()
        result = await story_crew.kickoff_async(inputs=crew_inputs)
        
        logger.info("Story with images created successfully")
        
        # Try to parse the result as JSON for structured story data
        try:
            # If result is HTML, extract JSON from it or create structured response
            result_str = str(result)
            
            # Check if it's HTML format
            if result_str.strip().startswith('<!DOCTYPE html>') or result_str.strip().startswith('<html'):
                # Return HTML directly for display
                return StoryResponse(result=result_str)
            else:
                # Try to parse as JSON
                try:
                    story_data = json.loads(result_str)
                    return StoryResponse(result=json.dumps(story_data))
                except json.JSONDecodeError:
                    # If not JSON, wrap in a simple structure
                    simple_story = {
                        "title": f"{child_name}'s {story_theme.title()} Adventure",
                        "pages": [
                            {
                                "page": 1,
                                "text": result_str,
                                "image_url": f"http://localhost:8000/uploads/{unique_filename}"
                            }
                        ]
                    }
                    return StoryResponse(result=json.dumps(simple_story))
        except Exception as parse_error:
            logger.error(f"Error parsing story result: {parse_error}")
            # Return raw result if parsing fails
            return StoryResponse(result=str(result))
        
    except Exception as e:
        logger.error(f"Error creating story with photo: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error creating story: {str(e)}")


@app.post("/api/create-story")
async def create_story(request: StoryRequest):
    """Create a story without photo using the crew with image generation"""
    try:
        logger.info(f"Received story request: {request}")
        
        # Create structured inputs for the crew
        crew_inputs = {
            "child_name": request.childName or "Hero",
            "age": request.childAge or 6,
            "themes": request.themes or ["adventure"],
            "source_photo_url": "https://example.com/default.jpg",  # Default placeholder
            "story_theme": request.storyTheme or "adventure",
            "message": request.message
        }
        
        logger.info(f"Creating story with inputs: {crew_inputs}")
        
        # Initialize and run the crew
        import sys
        sys.path.append('/Users/dvinemoment/nexstory_acp/nexstory')
        from crew import crew
        story_crew = crew()
        result = await story_crew.kickoff_async(inputs=crew_inputs)
        
        logger.info("Story created successfully")
        
        # Process result similar to photo version
        try:
            result_str = str(result)
            
            if result_str.strip().startswith('<!DOCTYPE html>') or result_str.strip().startswith('<html'):
                return StoryResponse(result=result_str)
            else:
                try:
                    story_data = json.loads(result_str)
                    return StoryResponse(result=json.dumps(story_data))
                except json.JSONDecodeError:
                    simple_story = {
                        "title": f"{crew_inputs['child_name']}'s {crew_inputs['story_theme'].title()} Adventure",
                        "pages": [
                            {
                                "page": 1,
                                "text": result_str,
                                "image_url": "https://via.placeholder.com/800x600?text=Story+Illustration"
                            }
                        ]
                    }
                    return StoryResponse(result=json.dumps(simple_story))
        except Exception as parse_error:
            logger.error(f"Error parsing story result: {parse_error}")
            return StoryResponse(result=str(result))
        
    except Exception as e:
        logger.error(f"Error creating story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error creating story: {str(e)}")
        logger.error(f"Error creating story with photo: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Story creation failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
