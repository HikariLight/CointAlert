from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()

@app.get("/")
async def root(request: Request):
    return "Hello! CoinAlert here!"

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)