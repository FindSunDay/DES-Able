import json
import sys
import logging
import rds_config
import pymysql

# rds settings
rds_host = 'des.clicumjxzjdj.us-east-1.rds.amazonaws.com'
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

# try:
conn = pymysql.connect(rds_host, user=name,
                       passwd=password, db=db_name)
# except pymysql.MySQLError as e:
#     logger.error(
#         "ERROR: Unexpected error: Could not connect to MySQL instance.")
#     logger.error(e)
#     sys.exit()

# logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")


def lambda_handler():
    # TODO implement

    # item_count = 0
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM DES_NAME')

    rows = cursor.fetchall()

    for row in rows:
        print("{0} {1} {2}".format(row[0], row[1], row[2]))


lambda_handler()

# with conn.cursor() as cur:
#     cur.execute('SELECT * FROM DES_NAME')
#     return {
#         'statusCode': 200,
#         'body': json.dumps({'record': cur.fetchone()})
#     }

# return {
#     'statusCode': 200,
#     'body': json.dumps({'a':'Hello from Lambda 123!', 'b': 123})
# }
