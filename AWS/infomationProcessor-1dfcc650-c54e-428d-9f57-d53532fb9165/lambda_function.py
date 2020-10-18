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
            
        sql = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID ORDER BY RAND() LIMIT 10'''
            
        cur.execute(sql)
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
            info['speciality_new'] = row[8]
            info['speciality_group'] = row[9]
            info['address'] = row[13]
            info['site_location'] = row[14]
            info['postal'] = row[20]
            info['url'] = row[21]
            info['phone'] = row[22]
            info['email'] = row[23]

            all_info.append(info)
            
        sql3 = '''SELECT DISTINCT Name FROM DES_NAME'''
        cur.execute(sql3)
        rows = cur.fetchall()
        name_list = []
        for row in rows:
            name_list.append(row[0])
        resp['Name_List'] = name_list
        
        sql4 = '''SELECT DISTINCT Speciality_Group FROM DES_SERVICE'''
        cur.execute(sql4)
        rows = cur.fetchall()
        speciality_list = []
        for row in rows:
            speciality_list.append(row[0])
        resp['Speciality_List'] = speciality_list
        
        # sql5 = '''SELECT * FROM DES_PERFORMANCE'''
            
        # cur.execute(sql5)
        # rows = cur.fetchall()
        # all_info = []
        # resp['Performance'] = all_info
        
        # for row in rows:
        #     info = {}
        #     info['year'] = row[0]
        #     info['month'] = row[1]
        #     info['referred'] = row[2]
        #     info['suspended'] = row[3]
        #     info['commenced'] = row[4]
        #     info['total'] = row[5]
        #     info['commenced_employment'] = row[6]
        #     info['commenced_placement'] = row[7]
        #     info['commenced_ongoing'] = row[8]
        #     # info['mom'] = str(row[9])
        #     # info['direction'] = row[10]
        #     # info['referred_p'] = str(row[11])
        #     # info['suspended_p'] = str(row[12])
        #     # info['commenced_p'] = str(row[13])
        #     # info['commenced_employment_p'] = str(row[14])
        #     # info['commenced_placement_p'] = str(row[15])
        #     # info['commenced_ongoing_p'] = str(row[16])
        #     info['mom'] = row[9]
        #     info['direction'] = row[10]
        #     info['referred_p'] = row[11]
        #     info['suspended_p'] = row[12]
        #     info['commenced_p'] = row[13]
        #     info['commenced_employment_p'] = row[14]
        #     info['commenced_placement_p'] = row[15]
        #     info['commenced_ongoing_p'] = row[16]
            

        #     all_info.append(info)
        
        sql6 = '''SELECT DISTINCT Year FROM DES_PERFORMANCE ORDER BY Year DESC'''
            
        cur.execute(sql6)
        rows = cur.fetchall()
        year_list = []
        resp['Year_List'] = year_list
        for row in rows:
            year_list.append(row[0])
            
        resp['Month_List'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        sql7 = '''SELECT * FROM `DES_PERFORMANCE` ORDER BY `DES_PERFORMANCE`.`Year` DESC LIMIT 1'''
        cur.execute(sql7)
        rows = cur.fetchall()
        latest_performance = []
        # latest_performance.append(row)
        resp['Latest_Performance'] = latest_performance
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

            latest_performance.append(info)
        
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
    