from flask import Flask, request, jsonify
from flask_cors import CORS
from fuzzywuzzy import process
from pymongo import MongoClient
import spacy

# ✅ Use lightweight blank English pipeline (no external model download)
nlp = spacy.blank("en")

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb+srv://jayitadey609:8lPYcodarMMXXI5X@banksimulator.y9c9xyc.mongodb.net/?retryWrites=true&w=majority&appName=BankSimulator")
db = client["test"]
users = db["users"]

def extract_amount_and_name(text):
    doc = nlp(text)
    amount = ""
    name = ""

    # Extract number
    for token in doc:
        if token.like_num:
            amount = token.text
            break

    # Simple name extraction logic using keyword "to"
    lowered = text.lower()
    if "to " in lowered:
        try:
            to_part = lowered.split("to ")[1]
            name = to_part.split()[0]
        except IndexError:
            name = ""

    return amount, name.lower()

def find_closest_username(spoken_name):
    all_users = list(users.find({}, {"username": 1, "email": 1}))
    usernames = [user['username'].lower() for user in all_users]
    match, score = process.extractOne(spoken_name.lower(), usernames)
    
    if score > 60:
        matched_user = next(user for user in all_users if user['username'].lower() == match)
        return matched_user["email"]
    return ""

@app.route('/process-command', methods=['POST'])
def process_command():
    data = request.get_json()
    spoken_text = data.get("message", "").lower()

    print(f"🔊 Voice Command: {spoken_text}")

    if "send" in spoken_text or "transfer" in spoken_text:
        amount, spoken_name = extract_amount_and_name(spoken_text)
        email = find_closest_username(spoken_name)
        print(f"🎯 Extracted amount: {amount}, name: {spoken_name}, email: {email}")
        
        if email and amount:
            return jsonify({
                "page": "/121",
                "email": email,
                "amount": amount
            })
        else:
            return jsonify({"error": "Could not extract valid recipient or amount."})
    
    elif "balance" in spoken_text:
        return jsonify({ "page": "/balance" })

    elif "history" in spoken_text or "transactions" in spoken_text or "transaction history" in spoken_text or "transaction" in spoken_text:
        return jsonify({ "page": "/transaction" })

    return jsonify({ "error": "Intent not recognized" })

if __name__ == '__main__':
    app.run(debug=True)