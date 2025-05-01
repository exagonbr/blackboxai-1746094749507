import sys
import json
from deepface import DeepFace
import os

# Use DEEPSEEK IA Ollama local env variable if needed
DEEPSEEK_IA_ENV = os.getenv("DEEPSEEK_IA_OLLAMA_LOCAL")

def analyze_face(image_path):
    try:
        # Perform face analysis using DeepFace
        result = DeepFace.analyze(img_path = image_path, actions = ['age', 'gender', 'race', 'emotion'])
        return result
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)
    image_path = sys.argv[1]
    analysis = analyze_face(image_path)
    print(json.dumps(analysis))
