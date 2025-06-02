from fastapi import FastAPI
from pydantic import BaseModel
from Model import predict_character

app = FastAPI(title='Alphabet Prediction Backend')

class TextInput(BaseModel):
    input: str

@app.post("/predict-text")
async def predict_text(data: TextInput):
    result = predict_character(data.input)
    return {"prediction": result}
