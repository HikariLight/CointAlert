def get_alert_definitions(supabase_client):
    try:
        response = supabase_client.table('alert_definitions').select("*").execute()
    except Exception as e:
        print(" > [Startup] Alert fetching alert definitions: ", e)
        return {
            "status": "fail",
            "reason": str(e)
        }

    return response.data

def get_alerts(supabase_client):
    try:
        response = supabase_client.table('alerts').select("*").execute()
    except Exception as e:
        print(" > [Startup] Alert fetching alert definitions: ", e)
        return {
            "status": "fail",
            "reason": str(e)
        }

    return response.data