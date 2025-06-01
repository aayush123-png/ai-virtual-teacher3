const micIndicator = document.getElementById('mic-indicator');
const spokenTextDiv = document.getElementById('spokenText');

let recognition;
let isListening = false;

// Check if browser supports Speech Recognition
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isListening = true;
    micIndicator.textContent = 'Listening... (Mic ON)';
    micIndicator.style.color = 'green';
  };

  recognition.onend = () => {
    isListening = false;
    micIndicator.textContent = 'Mic Off';
    micIndicator.style.color = 'red';
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    spokenTextDiv.innerHTML = `You: ${transcript}`;
    await sendToServer(transcript);
  };
} else {
  alert('Speech Recognition is not supported in your browser.');
}

function toggleMic() {
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
}

micIndicator.addEventListener('click', toggleMic);

// Function to send spoken text to your backend server
async function sendToServer(message) {
  try {
    const response = await fetch('https://631db2fc-c507-43eb-ac0b-3f5ea1cb7f83-00-29kiedd034ze2.sisko.repl.co/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMessage: message })
    });

    const data = await response.json();
    const botReply = data.reply;
    spokenTextDiv.innerHTML += `<br><strong>Teacher:</strong> ${botReply}`;

    // Speak the reply
    const utterance = new SpeechSynthesisUtterance(botReply);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);

  } catch (error) {
    console.error('Error:', error);
    spokenTextDiv.innerHTML += '<br><strong>Teacher:</strong> Sorry, there was an error!';
  }
}
