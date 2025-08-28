from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = "YOUR_OPENAI_API_KEY"  # Apna key dal do

@app.route('/')
def index():
    return render_template('index.html')

# Chat endpoint
@app.route('/ask', methods=['POST'])
def ask():
    msg = request.json.get("message")
    model = request.json.get("model", "gpt-3.5-turbo")
    response = openai.ChatCompletion.create(
        model=model,
        messages=[{"role":"user","content":msg}],
        max_tokens=300
    )
    return jsonify({"answer": response.choices[0].message['content']})

# Image generation endpoint
@app.route('/generate-image', methods=['POST'])
def generate_image():
    prompt = request.json.get("prompt")
    style = request.json.get("style","Realistic")
    size = request.json.get("size","512x512")
    prompt = f"{style} style: {prompt}"
    response = openai.Image.create(prompt=prompt, n=1, size=size)
    return jsonify({"image_url": response['data'][0]['url']})

# Video generation endpoint (text-to-video stub)
@app.route('/generate-video', methods=['POST'])
def generate_video():
    prompt = request.json.get("prompt")
    style = request.json.get("style","Realistic")
    video_url = f"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"  # Replace with real AI video API
    return jsonify({"video_url": video_url})

# Summarization
@app.route('/summarize', methods=['POST'])
def summarize():
    text = request.json.get("text")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":"Summarize this:\n"+text}],
        max_tokens=150
    )
    return jsonify({"summary": response.choices[0].message['content']})

# Translation
@app.route('/translate', methods=['POST'])
def translate():
    text = request.json.get("text")
    lang = request.json.get("lang","English")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":f"Translate to {lang}:\n{text}"}],
        max_tokens=150
    )
    return jsonify({"translation": response.choices[0].message['content']})

# Code Assistant
@app.route('/code', methods=['POST'])
def code_assistant():
    prompt = request.json.get("prompt")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":f"Write code for:\n{prompt}"}],
        max_tokens=300
    )
    return jsonify({"code": response.choices[0].message['content']})

# Code Explanation
@app.route('/explain-code', methods=['POST'])
def explain_code():
    code_text = request.json.get("code")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":f"Explain this code line by line:\n{code_text}"}],
        max_tokens=300
    )
    return jsonify({"explanation": response.choices[0].message['content']})

if __name__ == "__main__":
    app.run(debug=True)