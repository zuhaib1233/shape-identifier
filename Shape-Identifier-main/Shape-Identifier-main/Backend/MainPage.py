# main_backend/Mainpage.py
import httpx
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

PREDICTION_API_URL = "http://localhost:8001/predict/"  # Assuming prediction_backend runs on port 8001

@router.post("/get-shape/")
async def get_shape_from_image(file: UploadFile = File(...)):
    try:
        # Send image to prediction_backend
        async with httpx.AsyncClient() as client:
            files = {'file': (file.filename, await file.read(), file.content_type)}
            response = await client.post(PREDICTION_API_URL, files=files)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        prediction_result = response.json()
        return JSONResponse(content=prediction_result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling prediction backend: {e}")
