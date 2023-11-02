from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
import random
from Utils import get_bitcoin_price, verify_alerts

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


alert_definitions = []
alerts = []

@app.get("/")
async def root(request: Request):
    return "Hello! CoinAlert here!"

@app.get("/getAlerts")
async def return_alerts(request: Request):
    return json.dumps(alerts)


@app.post("/createAlert")
async def create_alert(request: Request):

    data = await request.body()
    alert = json.loads(data)
    print(alert)
    print(" > [/createAlert] Received alert definition: ", alert)
    alert_definitions.append(alert)

    return "Success"
@app.on_event("startup")
@repeat_every(seconds=1)
def print_stuff():
    # price = get_bitcoin_price()
    price = random.randint(4000, 6000)
    print(f"Bitcoin price at {datetime.now()}: ", price)
    alert = verify_alerts(price, alert_definitions)
    if alert != None:
        alerts.append(alert)
