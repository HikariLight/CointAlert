def get_alert_definitions(supabase_client):
    try:
        response = supabase_client.table('alert_definitions').select("*").execute()
    except Exception as e:
        print(" > [Startup] Alert fetching alert definitions: ", e)

    alert_definitions = response.data

    return alert_definitions

def get_alerts(supabase_client):
    try:
        response = supabase_client.table('alerts').select("*").execute()
    except Exception as e:
        print(" > [Startup] Alert fetching alert definitions: ", e)

    alerts = response.data

    return alerts