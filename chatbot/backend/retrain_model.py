import os
import sys
import traceback

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from models.interpreter import Interpreter

print("Starting model retraining...")
model_name = "new_stem"
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "saved", f"{model_name}.json")

try:
    # Ensure the old model is removed if it exists
    if os.path.exists(model_path):
        os.remove(model_path)
        print(f"✅ Removed existing model: {model_path}")
    else:
        print(f"ℹ️ No existing model found at {model_path}. Creating new one.")

    # Ensure the saved models directory exists
    saved_models_dir = os.path.dirname(model_path)
    if not os.path.exists(saved_models_dir):
        os.makedirs(saved_models_dir)
        print(f"✅ Created directory: {saved_models_dir}")

    print(f"🔄 Creating and training new interpreter: {model_name}...")
    Interpreter.create_new_interpreter(model_name)
    print("✅ Model retraining completed successfully.")
    
    # Verify the model was created
    if os.path.exists(model_path):
        print(f"✅ Model file created successfully at: {model_path}")
    else:
        print(f"❌ Error: Model file was not created at: {model_path}")

except ImportError as e:
    print(f"❌ Import Error: {e}")
    print("Please ensure you are running this script from the correct directory (e.g., the 'chatbot/backend' directory)")
    print("or that your Python path is set up correctly.")
    traceback.print_exc()
    sys.exit(1)
except FileNotFoundError as e:
    print(f"❌ File Not Found Error: {e}")
    print("Make sure all necessary data files (e.g., querys.json) exist in the 'data' directory")
    traceback.print_exc()
    sys.exit(1)
except Exception as e:
    print(f"❌ An unexpected error occurred during retraining: {e}")
    traceback.print_exc()
    sys.exit(1)

sys.exit(0) # Exit after successful retraining 