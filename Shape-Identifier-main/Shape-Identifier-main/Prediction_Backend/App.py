import os
import io
import json
from datetime import datetime
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from PIL import Image
from tensorflow.keras.models import load_model
from motor.motor_asyncio import AsyncIOMotorClient

# -------------------- Configurations -------------------- #
app = FastAPI(title="Shape Identifier API")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "saved_model.h5")
CLASS_INDICES_PATH = os.path.join(BASE_DIR, "class_indices.json")
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://realzuhaibkhan:Rnf1vOMCgEoLA1HJ@shapepredictorcluster.eqosvk0.mongodb.net/?retryWrites=true&w=majority&appName=ShapePredictorCluster"
)

# -------------------- Load Model -------------------- #
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

if not os.path.exists(CLASS_INDICES_PATH):
    raise FileNotFoundError(f"Class indices file not found: {CLASS_INDICES_PATH}")

model = load_model(MODEL_PATH)

with open(CLASS_INDICES_PATH, "r") as f:
    class_indices = json.load(f)

# Reverse mapping: {0: "circle", 1: "square", ...}
classes = {v: k for k, v in class_indices.items()}

# -------------------- MongoDB Setup -------------------- #
client = AsyncIOMotorClient(MONGO_URI)
db = client["ShapePredictionDB"]
predictions_collection = db["ShapePredictionServiceDB"]

# -------------------- Pydantic Model -------------------- #
class ShapePredictionRequest(BaseModel):
    predicted_shape: str
    confidence: float
    user_id: Optional[str] = None

# -------------------- Image Preprocessing -------------------- #
def preprocess_image(image: Image.Image) -> np.ndarray:
    image = image.resize((128, 128))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

# -------------------- Predict Endpoint -------------------- #
@app.post("/predict/", status_code=status.HTTP_200_OK)
async def predict_shape(file: UploadFile = File(...), user_id: Optional[str] = None):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    try:
        processed_image = preprocess_image(image)
        predictions = model.predict(processed_image)
        predicted_class = int(np.argmax(predictions))
        predicted_label = classes[predicted_class]
        confidence = float(np.max(predictions))

        # Prepare prediction log document
        prediction_doc = {
            "predicted_shape": predicted_label,
            "confidence": confidence,
            "user_id": user_id,
            "timestamp": datetime.utcnow()
        }

        # Insert log into MongoDB asynchronously
        await predictions_collection.insert_one(prediction_doc)

        # Return prediction result
        return {
            "predicted_class": predicted_class,
            "predicted_label": predicted_label,
            "confidence": confidence
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

