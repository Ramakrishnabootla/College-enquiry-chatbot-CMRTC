# filepath: vsls:/chatbot/backend/data/generate_data.py
import os
import json
os.system("cls")
file_path = "raw_data.json"
absolute_path = os.path.abspath(file_path)
print(f"Looking for file at: {absolute_path}")
if not os.path.exists(file_path):
    raise FileNotFoundError(f"The file {file_path} does not exist.")
intends_arr = []
querys_arr = []  
responses_arr = []
related_arr = []

with open(file_path, "r") as file:
    all_data = json.load(file)
    for data in all_data:
        intend = data["tag"]
        questions = data["questions"]
        responses = data["response"]
        related = data.get("related", [])
        if intend not in intends_arr:
            intends_arr.append(intend)
        querys_arr.append({
            "intent": intend,
            "questions": questions,
        })
        responses_arr.append({
            "intent": intend,
            "responses": responses,
        })
        if isinstance(related, list) and len(related) > 0:
            related_arr.append({
                "intent": intend,
                "related": related,
            })

with open("intends.json", "w") as f:
    json.dump(intends_arr, f, indent=1)
    
with open("querys.json", "w") as f:
    json.dump(querys_arr, f, indent=1)

with open("responses.json", "w") as f:
    json.dump(responses_arr, f, indent=1)

with open("related.json", "w") as f:
    json.dump(related_arr, f, indent=1)
    
print(f"update completed")