from pathlib import Path
import json
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Define paths to JSON files
base_path = Path(__file__).parent
json_files = ["intends.json", "querys.json", "responses.json", "related.json"]

# Initialize global variables
intends = {}
querys = {}
responses = {}
related = {}

# Function to load JSON files
def load_json_files():
    global intends, querys, responses, related
    data = {}
    
    for file_name in json_files:
        file_path = base_path / file_name
        try:
            with file_path.open(encoding="utf-8") as f:
                data[file_name.split(".")[0]] = json.load(f)
                print(f"✅ Successfully loaded {file_name}")
        except FileNotFoundError:
            print(f"❌ Error: {file_name} not found at {file_path}")
        except json.JSONDecodeError:
            print(f"❌ Error: {file_name} contains invalid JSON.")

    # Update global variables
    intends = data.get("intends", {})
    querys = data.get("querys", {})
    responses = data.get("responses", {})
    related = data.get("related", {})

    print("🔄 JSON files reloaded!")

# Initial load
load_json_files()

# File change handler
class JSONFileChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith(".json"):  # React only to JSON file changes
            print(f"🔔 Detected change in {event.src_path}. Reloading...")
            load_json_files()

# Start file watcher
observer = Observer()
event_handler = JSONFileChangeHandler()
observer.schedule(event_handler, path=str(base_path), recursive=False)
observer.start()
