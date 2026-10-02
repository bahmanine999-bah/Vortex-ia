const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const languageSelect = document.getElementById('languageSelect');

// إضافة الرسائل إلى الشاشة
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// التعامل مع زر الإرسال
sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text !== '') {
        addMessage(text, 'user');
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// خاصية التعرف على الصوت (Speech Recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    voiceBtn.addEventListener('click', () => {
        recognition.lang = languageSelect.value;
        recognition.start();
        voiceBtn.innerText = '🎙️ جاري الاستماع...';
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        voiceBtn.innerText = '🎙️ تحدث';
    };

    recognition.onerror = () => {
        voiceBtn.innerText = '🎙️ تحدث';
    };

    recognition.onend = () => {
        voiceBtn.innerText = '🎙️ تحدث';
    };
} else {
    voiceBtn.style.display = 'none';
}
