import sys
import os
from config import config_file
from app.app import run_app
from models.interpreter import Interpreter

testing = config_file["testing"]

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--retrain":
        print("Starting model retraining...")
        try:
            # Ensure the old model is removed if it exists
            model_path = "models/saved/new_stem.json"
            if os.path.exists(model_path):
                os.remove(model_path)
                print(f"Removed existing model: {model_path}")

            Interpreter.create_new_interpreter("new_stem")
            print("Model retraining completed successfully.")
        except Exception as e:
            print(f"Error during retraining: {e}")
            sys.exit(1) # Exit if retraining fails
        sys.exit(0) # Exit after successful retraining
    elif testing:
        # Run tests if testing flag is true
        print("Running tests...")
        import unittest
        from tests import interpreter_test
        runner = unittest.TextTestRunner()
        runner.run(interpreter_test.get_suite())
    else:
        # Run the app normally
        # Check if model exists, if not, train it first
        model_path = "models/saved/new_stem.json"
        if not os.path.exists(model_path):
             print("Model not found. Training new model...")
             try:
                 Interpreter.create_new_interpreter("new_stem")
                 print("Model training completed successfully.")
             except Exception as e:
                 print(f"Error during initial model training: {e}")
                 sys.exit(1) # Exit if initial training fails

        print("Starting the application...")
        run_app()
