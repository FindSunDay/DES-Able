import json
import re
import json
import urllib.request
import pandas as pd
from math import radians, acos, sin, cos, sqrt, asin, log


def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }


a = lambda_handler()
print(a)
