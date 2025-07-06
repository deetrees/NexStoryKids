from acp.server.highlevel import Server, Context
from pydantic import BaseModel
import sys
import os
import asyncio

# Add the nexstory_acp path to import the crew
sys.path.append('/Users/dvinemoment/nexstory_acp/nexstory')

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
        # Change to the nexstory directory for config files
        import os
        original_dir = os.getcwd()
        os.chdir('/Users/dvinemoment/nexstory_acp/nexstory')
        
        try:
            # Initialize the crew
            story_crew = crew()
            
            # Run the crew with the user's message
            result = await story_crew.kickoff_async(inputs={'message': input.message})
            
            return StoryOutput(result=str(result))
        finally:
            # Always restore original directory
            os.chdir(original_dir)
        
    except Exception as e:
        return StoryOutput(result=f"Error creating story: {str(e)}")

if __name__ == "__main__":
    import asyncio
    # Run with SSE transport for HTTP access
    asyncio.run(server.run_sse_async())

