import json
import childcare as cc

def lambda_handler(event, context):
    """Sample pure Lambda function
    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format
        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
    context: object, required
        Lambda Context runtime methods and attributes
        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html
    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict
        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """
    body = json.loads(event['body'])
    name = body["name"]
    perDay = float(body["pricePerDay"])
    daysAttending = body["daysAttending"]

    child = cc.Child(name, perDay, None, daysAttending) 
    

    if body["taxBenefit"]:
        child.add_discount(cc.TaxBenefit())

    if body["thirtyHoursFree"]:
        for i in range(4, 13):
            child.add_discount(cc.ThirtyHoursFree(i, 2023, child.attendance))
    
    if len(child.discounts) > 0:
        child.apply_discounts()
    
    payload = child.costs.toDict()
    payload['name'] = child.name
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type",
        },
        "body": json.dumps(payload),
    }