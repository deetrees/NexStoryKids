# src/nexstory/tools/image_tools.py

import os
import replicate
from crewai.tools import BaseTool
from pydantic import BaseModel, Field
from tenacity import retry, stop_after_attempt, wait_exponential

# --- Best Practice: Initialize the client once and reuse it. ---
# This is more efficient than creating a new client for every image.
# The client will be created when the application starts.
try:
    REPLICATE_CLIENT = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
except Exception as e:
    print(f"CRITICAL: Failed to initialize Replicate client. REPLICATE_API_TOKEN might be missing. Error: {e}")
    REPLICATE_CLIENT = None

# --- Pydantic Models for Structured Input ---
# This ensures the agent provides all the necessary information in the correct format.

class GenerateImageInput(BaseModel):
    """Input schema for the generate_image tool."""
    prompt: str = Field(description="A detailed text prompt describing the scene to be generated.")
    source_image_url: str = Field(None, description="Optional URL to a user's photo to be used as a reference for the main character.")

class ImageGenerationTool(BaseTool):
    name: str = "Generate Storybook Image"
    description: str = (
        "A powerful AI tool that generates a single, high-quality storybook illustration. "
        "It can create an image from a text prompt alone, or it can use a source photo URL "
        "to ensure the character in the image looks like the person in the photo."
    )
    args_schema: type[BaseModel] = GenerateImageInput

    # --- The Core Logic with Retries and Error Handling ---
    # The @retry decorator automatically handles transient API errors.
    @retry(wait=wait_exponential(multiplier=1, min=4, max=10), stop=stop_after_attempt(3))
    def _run(self, prompt: str, source_image_url: str = None) -> str:
        """
        Generates an image using the Replicate FLUX model.
        Returns an image URL on success, or a detailed error message on failure.
        """
        if not REPLICATE_CLIENT:
            return "Error: Replicate client is not initialized. Check API keys."

        try:
            # --- Dynamic Input Construction ---
            # The input payload changes depending on whether a source image is provided.
            input_payload = {
                "prompt": prompt,
                "num_outputs": 1,
                "aspect_ratio": "16:9", # Better for storybook pages
                "output_format": "png",
                "output_quality": 90, # Higher quality for final product
            }
            if source_image_url:
                input_payload["image"] = source_image_url
                # You might need to adjust other parameters when providing an image,
                # for example, 'prompt_strength' or 'control_guidance'.
                # This requires experimentation with the model.
                # input_payload["prompt_strength"] = 0.85

            print(f"Running Replicate with prompt: {prompt}")
            output = REPLICATE_CLIENT.run(
                "black-forest-labs/flux-kontext-max",
                input=input_payload
            )
            print(f"Replicate output: {output}")

            # --- Robust Output Parsing ---
            if isinstance(output, list) and output:
                image_url = output[0]
                # Basic validation that it looks like a URL
                if image_url.startswith("http" ):
                    return image_url
                else:
                    return f"Error: Replicate returned an invalid output: {output}"
            else:
                return f"Error: Replicate returned an empty or invalid response: {output}"

        except replicate.exceptions.ReplicateError as e:
            # Specific error from the Replicate library
            return f"Error: Replicate API error. Status: {e.status}. Detail: {e.detail}"
        except Exception as e:
            # Catch any other unexpected errors
            # The @retry decorator will handle this if it's a transient error.
            # If it fails after all retries, this will raise the exception.
            # For the agent, we want to return a string.
            return f"Error: An unexpected error occurred during image generation: {e}"

# --- To use this in your crew.py ---
# You would instantiate it like any other tool:
# image_tool = ImageGenerationTool()

