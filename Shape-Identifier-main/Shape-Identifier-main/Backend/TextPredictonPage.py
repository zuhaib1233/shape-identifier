from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

PREDICTION_SERVICE_URL = "http://localhost:8002/predict-text"

class TextInput(BaseModel):
    input: str

router = APIRouter()

@router.post("/text-predict")
async def forward_to_prediction_service(data: TextInput):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(PREDICTION_SERVICE_URL, json=data.dict())
            response.raise_for_status()
            return response.json()
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Prediction microservice unavailable")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=response.status_code, detail=response.text)
