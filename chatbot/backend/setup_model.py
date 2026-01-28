import os
import shutil

def setup_model():
    source = 'models/saved/default_stem.json'
    destination = 'models/saved/new_stem.json'
    
    print("Setting up model file...")
    
    # Check if source exists
    if not os.path.exists(source):
        print(f"❌ Error: Source file {source} not found")
        return False
        
    try:
        # Copy the file
        shutil.copy2(source, destination)
        print(f"✅ Successfully copied {source} to {destination}")
        
        # Verify the file exists
        if os.path.exists(destination):
            print(f"✅ Verified {destination} exists")
            return True
        else:
            print(f"❌ Error: Failed to verify {destination}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    setup_model() 