import sys
import logging
import rds_config
import pymysql
import json
import decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)
#rds settings
rds_host  = "des.clicumjxzjdj.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """

    resp = {}
    year = event['queryStringParameters']['year']
    month = event['queryStringParameters']['month']

    with conn.cursor() as cur:
        
        
        sql5 = '''SELECT * FROM DES_PERFORMANCE WHERE Year = {} AND Month = "{}"'''.format(year, month)
            
        cur.execute(sql5)
        rows = cur.fetchall()
        all_info = []
        # resp['Performance'] = all_info
        # info = {}
        resp['Data'] = all_info
        
        for row in rows:
            info = {}
            info['year'] = row[0]
            info['month'] = row[1]
            info['referred'] = row[2]
            info['suspended'] = row[3]
            info['commenced'] = row[4]
            info['total'] = row[5]
            info['commenced_employment'] = row[6]
            info['commenced_placement'] = row[7]
            info['commenced_ongoing'] = row[8]
            # info['mom'] = str(row[9])
            # info['direction'] = row[10]
            # info['referred_p'] = str(row[11])
            # info['suspended_p'] = str(row[12])
            # info['commenced_p'] = str(row[13])
            # info['commenced_employment_p'] = str(row[14])
            # info['commenced_placement_p'] = str(row[15])
            # info['commenced_ongoing_p'] = str(row[16])
            info['mom'] = row[9]
            info['direction'] = row[10]
            info['referred_p'] = row[11]
            info['suspended_p'] = row[12]
            info['commenced_p'] = row[13]
            info['commenced_employment_p'] = row[14]
            info['commenced_placement_p'] = row[15]
            info['commenced_ongoing_p'] = row[16]
            info['date'] = row[17]
            

            all_info.append(info)
        
        
        # sql2 = '''SELECT DISTINCT Year FROM DES_PERFORMANCE'''
            
        # cur.execute(sql2)
        # rows = cur.fetchall()
        # year_list = []
        # resp['year_list'] = year_list
        # for row in rows:
        #     year_list.append(row[0])
        
        
        # print(resp)
        
        # for row in cur:
        #     item_count += 1
        #     logger.info(row)
            #print(row)
    # conn.commit()
    
    # print(resp)

    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(resp, cls=DecimalEncoder)
        }
    