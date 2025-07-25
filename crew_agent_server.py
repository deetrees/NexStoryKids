from acp.server.highlevel import Server, Context
from pydantic import BaseModel
import sys
import os
import asyncio

# Import the crew from the local directory
from crew import crew
import nest_asyncio
nest_asyncio.apply()

server = Server()

class StoryInput(BaseModel):
    message: str

class StoryOutput(BaseModel):
    result: str

@server.agent(
    name="nexstory_crew",
    description="This agent creates complete personalized children's stories with illustrations using a multi-agent crew.",
    input=StoryInput,
    output=StoryOutput
)
async def nexstory_crew_agent(input: StoryInput, ctx: Context) -> StoryOutput:
    """Creates complete personalized children's stories with illustrations using a multi-agent crew."""
    
    try:
        # Parse the user's message to extract story details
        message = input.message
        
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
        
        # Initialize and run the actual crew
        story_crew = crew()
        result = await story_crew.kickoff_async(inputs=crew_inputs)
        
        return StoryOutput(result=str(result))
        
    except Exception as e:
        # Fallback to simple story if crew fails
        return StoryOutput(result=f"Crew processing failed, using fallback: {str(e)[:100]}...")

if __name__ == "__main__":
    import asyncio
    # Run with SSE transport for HTTP access
    asyncio.run(server.run_sse_async())

