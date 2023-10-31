import requests
import json
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()
api_key = os.getenv('COINAPI_API_KEY')


def get_bitcoin_price():
    url = "https://rest.coinapi.io/v1/exchangerate/BTC/USD"
    headers = {
        "X-CoinAPI-Key": api_key
    }
    request = requests.get(url, headers=headers)
    return json.loads(request.content)["rate"]


def verify_alerts(price, alert_definitions):
    for definition in alert_definitions:
        if price < definition["limit"]:
            alert_info = {"date": datetime.now().isoformat(), "price": price}
            return { **definition, **alert_info }