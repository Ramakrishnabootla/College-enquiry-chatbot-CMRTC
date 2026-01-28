import shutil
import os

source = os.path.join('models', 'saved', 'default_stem.json')
destination = os.path.join('models', 'saved', 'new_stem.json')

try:
    shutil.copy2(source, destination)
    print(f"✅ Successfully copied {source} to {destination}")
except Exception as e:
    print(f"❌ Error copying file: {e}") 