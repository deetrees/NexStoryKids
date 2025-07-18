# src/nexstory/tools/aws_tools.py
from crewai.tools import tool
import boto3
import os

@tool("face_detection_tool")
def face_detection_tool(image_path: str) -> str:
    """Detect faces in an image using AWS Rekognition."""
    try:
        rekognition = boto3.client('rekognition')
        with open(image_path, 'rb') as image_file:
            image_bytes = image_file.read()
        response = rekognition.detect_faces(
            Image={'Bytes': image_bytes},
            Attributes=['ALL']
        )
        faces = response.get('FaceDetails', [])
        if faces:
            result = f"Detected {len(faces)} face(s):\n"
            for i, face in enumerate(faces, 1):
                confidence = face.get('Confidence', 0)
                result += f"Face {i}: {confidence:.2f}% confidence\n"
            return result
        else:
            return "No faces detected in the image."
    except Exception as e:
        return f"An error occurred during face detection: {e}"

