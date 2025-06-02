from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from LoginPage import router as login_router
from MainPage import router as mainpage_router
from TextPredictonPage import router as forward_to_prediction_service


app = FastAPI()

origins = [
'http://localhost:5173',
'http://localhost:5174'
]

app.add_middleware(  
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(login_router)
app.include_router(mainpage_router)
app.include_router(forward_to_prediction_service)
