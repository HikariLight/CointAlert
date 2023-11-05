from fastapi import FastAPI
from fastapi_utils.tasks import repeat_every
from fastapi.middleware.cors import CORSMiddleware
from routers import alerts, alert_definitions

from Utils import verify_alerts
from DB import get_alert_definitions
from dependencies import supabase_client

app = FastAPI()
app.include_router(alerts.router)
app.include_router(alert_definitions.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return "Hello! CoinAlert API here!"

@app.on_event("startup")
@repeat_every(seconds= 60 * 30) # Every half hour
def on_repeat():
    alert_definitions = get_alert_definitions(supabase_client)
    detected_alerts = verify_alerts(alert_definitions)
    for alert in detected_alerts:
        try:
            response = supabase_client.table('alerts').insert(alert).execute()
        except Exception as e:
            print(" > Alert storage error: ", e)
