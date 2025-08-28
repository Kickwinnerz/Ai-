function showTab(tabName){
  const tabs = document.getElementsByClassName('tab-content');
  for(let tab of tabs){ tab.style.display='none'; }
  document.getElementById(tabName).style.display='block';
}

// Chat
async function sendMessage(){
  const input = document.getElementById("user-input").value;
  if(!input) return;
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  const res = await fetch("/ask", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ message: input })
  });
  const data = await res.json();
  chatBox.innerHTML += `<p><strong>AI:</strong> ${data.answer}</p>`;
  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Image Generation
async function generateImage(){
  const prompt = document.getElementById("image-prompt").value;
  const style = document.getElementById("image-style").value;
  const size = document.getElementById("image-size").value;
  if(!prompt) return;
  const res = await fetch("/generate-image",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ prompt, style, size })
  });
  const data = await res.json();
  document.getElementById("image-result").innerHTML = `<img src="${data.image_url}" width="300"/>`;
}

// Video Generation
async function generateVideo(){
  const prompt = document.getElementById("video-prompt").value;
  const style = document.getElementById("video-style").value;
  if(!prompt) return;
  const res = await fetch("/generate-video",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ prompt, style })
  });
  const data = await res.json();
  document.getElementById("video-result").innerHTML = `<video src="${data.video_url}" controls width="400"></video>`;
}

// Voice Chat
function startVoice(){
  if(!('webkitSpeechRecognition' in window)){ alert("Browser does not support voice."); return; }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = document.getElementById("voice-lang").value || 'en-US';
  recognition.onresult = async function(event){
    const text = event.results[0][0].transcript;
    const voiceBox = document.getElementById("voice-result");
    voiceBox.innerHTML = `<p><strong>You:</strong> ${text}</p>`;
    const res = await fetch("/ask",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    voiceBox.innerHTML += `<p><strong>AI:</strong> ${data.answer}</p>`;
    const speech = new SpeechSynthesisUtterance(data.answer);
    window.speechSynthesis.speak(speech);
  };
  recognition.start();
}

// Summarize
async function summarizeText(){
  const text = document.getElementById("summarize-text").value;
  if(!text) return;
  const res = await fetch("/summarize",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("summary-result").innerText = data.summary;
}

// Translate
async function translateText(){
  const text = document.getElementById("translate-text").value;
  const lang = document.getElementById("translate-lang").value || "English";
  if(!text) return;
  const res = await fetch("/translate",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ text, lang })
  });
  const data = await res.json();
  document.getElementById("translate-result").innerText = data.translation;
}

// Code Assistant
async function generateCode(){
  const prompt = document.getElementById("code-prompt").value;
  if(!prompt) return;
  const res = await fetch("/code",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  document.getElementById("code-result").innerText = data.code;
}

// Code Explanation
async function explainCode(){
  const codeText = document.getElementById("explain-code").value;
  if(!codeText) return;
  const res = await fetch("/explain-code",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ code: codeText })
  });
  const data = await res.json();
  document.getElementById("explain-result").innerText = data.explanation;
}