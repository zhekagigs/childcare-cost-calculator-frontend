import json

from backend.family_budget.childcare import Child

def parse_file(jsonfile) -> Child:
     with open(jsonfile, 'r') as f:
        return parse_payload(f)

def parse_payload(jsonpayload: str) -> Child:
    request = json.load(jsonpayload)
    child = Child(request["name"], request["price_per_day"], request["date_of_birth"], request["attendance"])
    return child

