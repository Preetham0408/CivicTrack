from fastapi import FastAPI

app = FastAPI(title="CivicTrack API")


@app.get("/")
def home():
	return {"message": "Welcome to CivicTrack Backend!"}


@app.get("/health")
def health():
	return {"status": "ok"}
