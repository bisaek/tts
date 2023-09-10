from elevenlabs import generate, play, save, set_api_key
from fastapi import FastAPI, Response
from pydantic import BaseModel


class Text(BaseModel):
    text: str


app = FastAPI()

AUDIOS_PATH = "frontend/src/audios/"
AUDIO_PATH = "/audios/"
# audio = generate(
#     text="Hello! 你好! Hola! नमस्ते! Bonjour! こんにちは! مرحبا! 안녕하세요! Ciao! Cześć! Привіт! வணக்கம்!",
#     voice="Bella",
#     model="eleven_multilingual_v2"
# )
# print(audio)
# play(audio)


@app.post("/audio")
async def audio(text: Text):
    set_api_key("086c3d3bde304e2154ca2c030d661ee5")
    audioFile = generate(
        text=text.text,
        voice="Bella",
        model="eleven_multilingual_v2"
    )
    # play(audioFile)
    return Response(content=audioFile, media_type="application/mp3")


@app.get("/test")
async def audio():
    set_api_key("086c3d3bde304e2154ca2c030d661ee5")

    audio_path = f'{AUDIOS_PATH}test.mp3'
    file_path = f'{AUDIO_PATH}test.mp3'

    audioFile = generate(
        text="hello world, my name is Bertram",
        voice="Matthew",
        model="eleven_multilingual_v2"
    )
    # play(audioFile)
    # save(audioFile, "test.mp3")

    return Response(content=audioFile, media_type="application/mp3")
    # try:
    #     with open(audio_path, 'wb') as f:
    #         f.write(audio)

    #     return audio_path

    # except Exception as e:
    #     print(e)

    #     return ""
