browser.menus.create({
    id: "tts",
    title: "text to speech",
    contexts: ["all"]
})

browser.menus.onClicked.addListener(async (info, tab) => {
    console.log(info)
    console.log(tab)
    console.log(window.getSelection())
    const ctx = new AudioContext()

    const data = await fetch("http://127.0.0.1:8000/audio", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            text: info.selectionText,
            voice: "Matthew"
        })
    }).then(data => data.arrayBuffer())

    let audio = await ctx.decodeAudioData(data)

    const audioPlayer = ctx.createBufferSource()
    audioPlayer.buffer = audio
    audioPlayer.connect(ctx.destination);
    audioPlayer.start(ctx.currentTime);
})