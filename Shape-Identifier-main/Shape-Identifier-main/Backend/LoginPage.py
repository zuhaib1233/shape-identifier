from fastapi import HTTPException, APIRouter
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.status import HTTP_401_UNAUTHORIZED
import os

router = APIRouter()

# 🔐 RECOMMENDED: Store your connection string in an environment variable (for security)
# But for now, we use the Atlas URI directly
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://realzuhaibkhan:Rnf1vOMCgEoLA1HJ@shapepredictorcluster.eqosvk0.mongodb.net/?retryWrites=true&w=majority&appName=ShapePredictorCluster")

# 🌐 Connect to MongoDB Atlas
client = AsyncIOMotorClient(MONGO_URI)

# 🧠 Use your actual database name here
db = client["ShapePredictorDB"]  # You can replace this with your real DB name
login_collection = db["login"]

# 📦 Request schema
class LoginData(BaseModel):
    email: EmailStr
    password: str

# 🔐 Login endpoint
@router.post("/login")
async def login(data: LoginData):
    user = await login_collection.find_one({"email": data.email})
    
    if not user or user.get("password") != data.password:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    return {
        "message": "Login successful",
        "email": user["email"]
    }
