from fastapi import APIRouter
import json
from dependencies import supabase_client
from DB import get_alerts

router = APIRouter()

@router.get("/alerts")
async def return_alerts():
    return json.dumps(get_alerts(supabase_client))

@router.delete("/alerts/{id}")
async def delete_alert(id: int):
    try:
        response = supabase_client.table('alerts').delete().eq("id", id).execute()
    except Exception as e:
        print(" > [/deleteAlert] Alert deletion from DB error: ", e)

    return json.dumps({"status": "success"})

@router.delete("/alerts")
async def delete_all_alerts():
    try:
        response = supabase_client.table('alerts').delete().neq("id", "0").execute()
    except Exception as e:
        print(" > [/deleteAllAlerts] Alerts deletion from DB error: ", e)

    return json.dumps({"status": "success"})
