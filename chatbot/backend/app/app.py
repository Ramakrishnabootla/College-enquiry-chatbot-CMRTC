from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.interpreter import Interpreter
from data.data import responses, related
from app.greetings import get_updated_string
from app.spelling_fix import correct_spelling
import uvicorn
import random
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize interpreter
try:
    __interpreter = Interpreter.load_interpreter("new_stem")
    logger.info("✅ Successfully loaded interpreter model")
except Exception as e:
    logger.error(f"❌ Failed to load interpreter: {str(e)}")
    raise

# Initialize FastAPI app
__app = FastAPI(title="JITBOT", description="A College Enquiry Chat bot of JIT College Nashik")

# CORS middleware
import os

# Default local origins
local_origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "https://localhost:3000",
    "http://localhost:5000",
]

# Production origin (set this in Render to your Vercel app URL)
frontend_url = os.environ.get("FRONTEND_URL")

if frontend_url:
    origins = local_origins + [frontend_url]
    allow_credentials = True
    logger.info(f"CORS: allowing origins {origins}")
else:
    # If FRONTEND_URL is not set, fall back to permissive CORS for final testing.
    # Note: allow_credentials must be False when allow_origins is ['*'] per CORS spec.
    origins = ["*"]
    allow_credentials = False
    logger.warning("FRONTEND_URL not set — allowing all origins for testing. Set FRONTEND_URL in Render for production.")

__app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

@__app.get("/query/{q}")
async def query(q: str):
    reply = {}
    logger.info(f"Received query: {q}")
    
    try:
        # Spelling correction
        original_q = q
        q = correct_spelling(q)
        logger.info(f"Original query: {original_q}")
        logger.info(f"Corrected query: {q}")
        
        # Intent classification
        klass = __interpreter.parse(q)
        logger.info(f"Classified intent: {klass}")
        
        # Response retrieval
        logger.debug(f"Looking for intent '{klass}' in responses data: {responses[:2]}...")
        response = ""
        for res in responses:
            if res["intent"] == klass:
                response = random.choice(res["responses"])
                if res["intent"] == "welcomegreeting":
                    response = get_updated_string(response)
                break
        
        # Related information
        related_info = []
        for rel in related:
            if rel["intent"] == klass:
                related_info = rel["related"]
                break
        
        reply = {
            "status": 200,
            "message": response,
            "related": related_info,
        }
        logger.info(f"Response: {response}")
        
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        reply = {
            "status": 400,
            "message": f"Error processing query: {str(e)}"
        }
    
    return reply

@__app.get("/direct/{klass}")
async def direct(klass: str):
    try:
        response = ""
        for res in responses:
            if res["intent"] == klass:
                response = random.choice(res["responses"])
                if res["intent"] == "welcomegreeting":
                    response = get_updated_string(response)
                break
        
        related_info = []
        for rel in related:
            if rel["intent"] == klass:
                related_info = rel["related"]
                break
        
        return {
            "status": 200,
            "message": response,
            "related": related_info,
        }
    except Exception as e:
        logger.error(f"Error in direct endpoint: {str(e)}")
        return {
            "status": 400,
            "message": f"Error: {str(e)}"
        }

@__app.get("/{path:path}")
async def not_found_404(path: str):
    return {
        "status": 404,
        "message": f"Path{' '+path} not found on server!, please check the Endpoint",
    }

def run_app():
    uvicorn.run(__app, host="0.0.0.0", port=8000)