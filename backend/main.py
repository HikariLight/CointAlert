from fastapi import FastAPI, Request
import uvicorn

app = FastAPI()
bitcoin_alert = {
    "name": "Bitcoin under 5000$ alert",
    "Cryptocurrency": "BTC",
    "limit": 5000
}

alert_definitions = [bitcoin_alert]
alerts = []

@app.get("/")
async def root(request: Request):
    return "Hello! CoinAlert here!"

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)