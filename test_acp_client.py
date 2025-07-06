#!/usr/bin/env python3
"""Test script for the ACP server."""

import asyncio
from acp.client.sse import sse_client
from acp.client.session import ClientSession

async def test_nexstory_agent():
    """Test the nexstory_crew agent."""
    print("Connecting to ACP server...")
    
    try:
        async with sse_client("http://localhost:8000/sse") as streams:
            async with ClientSession(*streams) as session:
                await session.initialize()
                
                print("✅ Connected to ACP server")
                
                # List available agents
                agents = await session.list_agents()
                print(f"📋 Available agents: {agents}")
                
                # Run the nexstory_crew agent
                print("🚀 Running nexstory_crew agent...")
                result = await session.run_agent(
                    name="nexstory_crew",
                    input={"message": "Create a short story about a 7-year-old girl named Emma who discovers a magical garden with talking flowers"}
                )
                
                print("✅ Story generation completed!")
                print(f"📖 Result: {result}")
                
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_nexstory_agent())