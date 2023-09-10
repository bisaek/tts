const textInput = document.getElementById("text")
const button = document.getElementById("ttsButton")
const voice = document.getElementById("voice")



button.addEventListener("click", async () => {
    console.log(textInput.value)

    const ctx = new AudioContext()

    const data = await fetch("http://127.0.0.1:8000/audio", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            text: textInput.value,
            voice: voice.value
        })
    }).then(data => data.arrayBuffer())

    let audio = await ctx.decodeAudioData(data)

    const audioPlayer = ctx.createBufferSource()
    audioPlayer.buffer = audio
    audioPlayer.connect(ctx.destination);
    audioPlayer.start(ctx.currentTime);
    
})
