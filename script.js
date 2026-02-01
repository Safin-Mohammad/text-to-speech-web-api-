document.getElementById('convertBtn').addEventListener('click', async () => {
    const text = document.getElementById('textInput').value;
    const voice = document.getElementById('voiceSelect').value;
    const status = document.getElementById('status');
    const audioPlayer = document.getElementById('audioPlayer');

    if (!text) {
        alert("দয়া করে কিছু টেক্সট লিখুন!");
        return;
    }

    status.innerText = "প্রসেসিং হচ্ছে... একটু অপেক্ষা করুন।";
    
    // API URL তৈরি করা
    const url = `https://tts.fastdevelopers.workers.dev/tts?voice=${voice}&text=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(url);
        
        if (response.ok) {
            // Blob হিসেবে অডিও ডেটা নেওয়া
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = "block";
            audioPlayer.play();
            
            status.innerText = "সফলভাবে জেনারেট হয়েছে!";
        } else {
            status.innerText = "API এরর! আবার চেষ্টা করুন।";
        }
    } catch (error) {
        console.error("Error:", error);
        status.innerText = "কানেকশন সমস্যা।";
    }
});

