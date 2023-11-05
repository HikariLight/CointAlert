import requests
import json
from dotenv import load_dotenv
import os
from datetime import datetime
import random

load_dotenv()
api_key = os.getenv('COINAPI_API_KEY')


def get_crypto_price(cryptocurrency):
    url = f"https://rest.coinapi.io/v1/exchangerate/{cryptocurrency}/USD"
    headers = {
        "X-CoinAPI-Key": api_key
    }
    request = requests.get(url, headers=headers)
    return json.loads(request.content)["rate"]


def verify_alerts(alert_definitions):
    result = []

    for alert_definition in alert_definitions:
        cryptocurrency_name, alert_type, limit = alert_definition["cryptocurrency_name"], alert_definition["alert_type"], alert_definition["limit"]
        cryptocurrency_price = get_crypto_price(cryptocurrency_name)

        if (alert_type == ">="):
            if cryptocurrency_price >= limit:
                alert = {
                    **alert_definition,
                    "date": datetime.now().isoformat(),
                    "price": cryptocurrency_price
                }
                alert.pop("id")
                result.append(alert)

        if (alert_type == "<"):
            if cryptocurrency_price < limit:
                alert = {
                    **alert_definition,
                    "date": datetime.now().isoformat(),
                    "price": cryptocurrency_price
                }
                alert.pop("id")
                result.append(alert)

    return result


def random_verify_alerts(alert_definitions):
    result = []

    for alert_definition in alert_definitions:
        cryptocurrency_name, alert_type, limit = alert_definition["cryptocurrency_name"], alert_definition["alert_type"], alert_definition["limit"]

        cryptocurrency_price = random.randint(limit / 2, limit * 2)

        if (alert_type == ">="):
            if cryptocurrency_price >= limit:
                alert = {
                    **alert_definition,
                    "date": datetime.now().isoformat(),
                    "price": cryptocurrency_price
                }
                alert.pop("id")
                result.append(alert)

        if (alert_type == "<"):
            if cryptocurrency_price < limit:
                alert = {
                    **alert_definition,
                    "date": datetime.now().isoformat(),
                    "price": cryptocurrency_price
                }
                alert.pop("id")
                result.append(alert)

    return result
