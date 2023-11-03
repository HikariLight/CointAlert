from fastapi import APIRouter, Request
import json
from dependencies import supabase_client
from DB import get_alert_definitions


router = APIRouter()

@router.get("/alertDefinitions")
async def return_alert_definitions():
    return json.dumps(get_alert_definitions(supabase_client))


@router.get("/alertDefinitions/{alert_definition_id}")
async def return_alert_definition(alert_definition_id: int):
    try:
        response = supabase_client.table('alert_definitions').select("*").eq('id', alert_definition_id).execute()
    except Exception as e:
        print(" > [alertDefinition] Alert fetching alert definitions: ", e)

    return response.data[0]

@router.post("/alertDefinitions")
async def create_alert_definition(request: Request):
    data = await request.body()
    alert_definition = json.loads(data)
    print(" > [/createAlertDefinition] Received alert definition: ", alert_definition)

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
        print(" > [/createAlertDefinition] Alert insertion into DB error: ", e)

    json.dumps({"status": "success"})

@router.put("/alertDefinitions")
async def return_alert_definitions(request: Request):
    data = await request.body()
    alert_definition = json.loads(data)

    try:
        response = supabase_client.table('alert_definitions').update(alert_definition).eq('id', alert_definition["id"]).execute()
        print(" > [/modifyAlertDefinition] Alert definition modification request: ", response)
    except Exception as e:
        print(" > [/modifyAlertDefinition] Alert definition modification error: ", e)


    json.dumps({"status": "success"})

@router.delete("/alertDefinitions/{id}")
async def delete_alert_definition(id: int):
    try:
        response = supabase_client.table('alert_definitions').delete().eq('id', id).execute()
    except Exception as e:
        print(" > [/deleteAlertDefinition] Alert deletion from DB error: ", e)

    json.dumps({"status": "success"})