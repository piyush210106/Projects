from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_DB_URL")
MONGO_NAME = "InterVue"
if not MONGO_URL:
    raise ValueError("Mongo_url not found")

client = MongoClient(MONGO_URL)
db = client[MONGO_NAME]
resume_collection = db["resumes"]
applications = db["applications"]

try:
    print("MongoDB connected successfully")
except Exception as e:
    print("MongoDB connection failed:", e)
