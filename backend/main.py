from fastapi import FastAPI, Request
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from supabase import create_client, Client
from Utils import verify_alerts, random_verify_alerts
from DB import get_alert_definitions, get_alerts

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
supabase_client: Client = create_client(supabase_url, supabase_key)

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
    global alert_definitions

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

    try:
        response = supabase_client.table('alert_definitions').insert(db_data).execute()
    except Exception as e:
        print(" > [/createAlert] Alert insertion into DB error: ", e)

    alert_definitions = get_alert_definitions(supabase_client)

    return "Success"

@app.get("/alertDefinitions")
async def return_alert_definitions(request: Request):
    return json.dumps(alert_definitions)

@app.post("/deleteAlertDefinition")
async def delete_alert_definition(request: Request):
    global alert_definitions

    data = await request.body()
    alert_definition_id = json.loads(data)

    try:
        response = supabase_client.table('alert_definitions').delete().eq('id', alert_definition_id["alertDefinitionId"]).execute()
        alert_definitions = [d for d in alert_definitions if d.get("id") != alert_definition_id["alertDefinitionId"]]
    except Exception as e:
        print(" > [/deleteAlertDefinition] Alert deletion from DB error: ", e)

    alert_definitions = get_alert_definitions(supabase_client)

    return "success"

@app.delete("/deleteAlert")
async def delete_all_alerts(request: Request):
    global alerts

    data = await request.body()
    alert_id = json.loads(data)["alertId"]

    try:
        response = supabase_client.table('alerts').delete().eq("id", alert_id).execute()
        alerts = get_alerts(supabase_client)
    except Exception as e:
        print(" > [/deleteAlert] Alert deletion from DB error: ", e)

    return json.dumps({"status": "success"})

@app.delete("/deleteAllAlerts")
async def delete_all_alerts(request: Request):
    global alerts

    try:
        response = supabase_client.table('alerts').delete().neq("id", "0").execute()
    except Exception as e:
        print(" > [/deleteAllAlerts] Alerts deletion from DB error: ", e)

    alerts = []

    return json.dumps({"status": "success"})


# ----- Startup scripts ----
@app.on_event("startup")
def startup():
    global alert_definitions, alerts
    alert_definitions = get_alert_definitions(supabase_client)
    alerts = get_alerts(supabase_client)

@app.on_event("startup")
@repeat_every(seconds=1)
def on_repeat():
    # detected_alerts = verify_alerts(alert_definitions)
    detected_alerts = random_verify_alerts(alert_definitions)
    for alert in detected_alerts:
        try:
            response = supabase_client.table('alerts').insert(alert).execute()
            alerts.append(alert)
        except Exception as e:
            print(" > Alert storage error: ", e)
