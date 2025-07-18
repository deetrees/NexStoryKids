#!/usr/bin/env python3
"""
Simple FastAPI server to handle story creation requests
"""
import asyncio
import sys
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Add the parent directory to the path to import crew
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from crew import crew

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StoryRequest(BaseModel):
    message: str

class StoryResponse(BaseModel):
    result: str

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/api/create-story")
async def create_story(request: StoryRequest) -> StoryResponse:
    """Create a story using the crew"""
    
    try:
        # Parse the user's message to extract story details
        message = request.message
        
        # Extract story details from the message
        child_name = "Hero"  # Default
        age = 6  # Default
        interests = []
        theme = "adventure"
        
        # Parse the message to extract structured data
        message_lower = message.lower()
        
        # Extract child name
        if " for " in message_lower:
            parts = message_lower.split(" for ")
            if len(parts) > 1:
                name_part = parts[1].split(",")[0].split(".")[0].strip()
                child_name = name_part.title()
        
        # Extract age
        if "age" in message_lower:
            import re
            age_match = re.search(r'age (\d+)', message_lower)
            if age_match:
                age = int(age_match.group(1))
        
        # Extract interests
        if "love" in message_lower:
            love_part = message_lower.split("love")[1].split(".")[0].strip()
            if love_part.startswith("s "):
                love_part = love_part[2:]
            if " and " in love_part:
                interests = [item.strip() for item in love_part.split(" and ")]
            else:
                interests = [love_part.strip()]
            interests = [item for item in interests if item and len(item) > 1]
        
        # Extract theme
        if "theme should be" in message_lower:
            theme_part = message_lower.split("theme should be")[1].split(".")[0].strip()
            theme = theme_part
        
        # Create structured inputs for the crew
        crew_inputs = {
            "child_name": child_name,
            "age": age,
            "themes": interests if interests else ["adventure"],
            "source_photo_url": "https://example.com/default.jpg",  # Default - would come from photo upload
            "story_theme": theme,
            "message": message
        }
        
        print(f"Creating story with inputs: {crew_inputs}")
        
        # Initialize and run the actual crew
        story_crew = crew()
        result = await story_crew.kickoff_async(inputs=crew_inputs)
        
        return StoryResponse(result=str(result))
        
    except Exception as e:
        print(f"Error creating story: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Story creation failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)