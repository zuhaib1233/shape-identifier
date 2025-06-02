import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from faker import Faker
import random

MONGO_URI = "mongodb+srv://realzuhaibkhan:Rnf1vOMCgEoLA1HJ@shapepredictorcluster.eqosvk0.mongodb.net/?retryWrites=true&w=majority&appName=ShapePredictorCluster"

client = AsyncIOMotorClient(MONGO_URI)
db = client["ShapePredictorDB"]
login_collection = db["login"]

# Faker setup with Pakistani names
fake = Faker()

# List of common Pakistani first names
pakistani_names = [
    "Ali", "Ayesha", "Zain", "Hira", "Hamza", "Fatima", "Usman", "Sara",
    "Bilal", "Nida", "Kashif", "Mehwish", "Fahad", "Mariam", "Saad"
]

# Fixed password
password = "shape123"

# Generate email like firstname123@gmail.com
def generate_email(name):
    number = random.randint(100, 999)
    return f"{name.lower()}{number}@gmail.com"

# Generate user documents
users = []
for name in pakistani_names:
    email = generate_email(name)
    users.append({"email": email, "password": password})

async def insert_users():
    try:
        print(await db.command("ping"))  # Test DB connectivity
        result = await login_collection.insert_many(users)
        print(f"Inserted {len(result.inserted_ids)} users into the 'login' collection.")
    except Exception as e:
        print(f"Error inserting users: {e}")


# Run the insertion
# Run the insertion
if __name__ == "__main__":
    print("Running insert script...")
    asyncio.run(insert_users())

