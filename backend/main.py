from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from supabase import create_client, Client
from Utils import verify_alerts, random_verify_alerts


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

supabase_url: str = os.getenv("SUPABASE_URL")
supabase_key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

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
    alert_definition = json.loads(data)
    print(" > [/createAlert] Received alert definition: ", alert_definition)

    alert_name, alert_type, cryptocurrency_name, limit = alert_definition.values()
    db_data = {
        "user_id": 0,
        "alert_name": alert_name,
        "alert_type": alert_type,
        "cryptocurrency_name": cryptocurrency_name,
        "limit": int(limit)
    }
    alert_definitions.append(db_data)

    try:
        response = supabase.table('alert_definitions').insert(db_data).execute()
    except Exception as e:
        print(" > [/createAlert] Alert insertion into DB error: ", e)

    return "Success"

@app.get("/alertDefinitions")
async def return_alert_definitions(request: Request):
    return json.dumps(alert_definitions)


@app.on_event("startup")
def startup():
    global alert_definitions
    try:
        response = supabase.table('alert_definitions').select("*").execute()
    except Exception as e:
        print(" > [Startup] Alert fetching alert definitions: ", e)

    alert_definitions = response.data

@app.on_event("startup")
@repeat_every(seconds=1)
def on_repeat():
    # detected_alerts = verify_alerts(alert_definitions)
    detected_alerts = random_verify_alerts(alert_definitions)
    for alert in detected_alerts:
        alerts.append(alert)

    print(f" > Detected {len(alerts)} alerts.")
