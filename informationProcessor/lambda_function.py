import sys
import logging
import rds_config
import pymysql
import json
# rds settings
rds_host = "des.clicumjxzjdj.us-east-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name
logger = logging.getLogger()
logger.setLevel(logging.INFO)
try:
    conn = pymysql.connect(rds_host, user=name,
                           passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error(
        "ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def lambda_handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """
    resp = {}
    with conn.cursor() as cur:
        # provider = []
        # resp['DES_Provider'] = provider
        # cur.execute("SELECT * FROM `DES_NAME`")
        # rows = cur.fetchall()
        # for row in rows:
        #     info = {}
        #     info['name'] = row[1]
        #     info['website'] = row[2]
        #     provider.append(info)
        # print("{0} {1} {2}".format(row[0], row[1], row[2]))
        # cur.execute("SELECT * FROM `DES_SERVICE` WHERE `DES_ID` = 1")
        # rows = cur.fetchall()
        # service = []
        # resp['DES_Service'] = service
        # for row in rows:
        #     info = {}
        #     info['program'] = row[0]
        #     info['speciality'] = row[1]
        #     info['rating'] = row[2]
        #     service.append(info)
        cur.execute("SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID ORDER BY RAND() LIMIT 10")
        rows = cur.fetchall()
        all_info = []
        resp['All_Info'] = all_info
        for row in rows:
            info = {}
            info['name'] = row[1]
            info['website'] = row[2]
            info['program'] = row[3]
            info['speciality'] = row[4]
            info['rating'] = row[5]
            info['address'] = row[11]
            info['postal'] = row[17]
            info['url'] = row[18]
            info['phone'] = row[19]
            info['email'] = row[20]
            all_info.append(info)
        # print(resp)
        # for row in cur:
        #     item_count += 1
        #     logger.info(row)
            # print(row)
    # conn.commit()
    return {
        'statusCode': 200,
        'body': json.dumps(resp)
    }
