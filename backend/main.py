from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
import random
from Utils import verify_alerts, random_verify_alerts


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
    return "Hello! CoinAlert API here!"


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
def startup():
    pass


@app.on_event("startup")
@repeat_every(seconds=1)
def on_repeat():
    # detected_alerts = verify_alerts(alert_definitions)
    detected_alerts = random_verify_alerts(alert_definitions)
    for alert in detected_alerts:
        alerts.append(alert)

    print(f" > Detected {len(alerts)} alerts.")
