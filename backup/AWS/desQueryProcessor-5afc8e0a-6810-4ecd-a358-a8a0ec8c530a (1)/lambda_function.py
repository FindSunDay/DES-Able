import sys
import logging
import rds_config
import pymysql
import json
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
    name = event['queryStringParameters']['name']
    speciality = event['queryStringParameters']['speciality']
    rating = event['queryStringParameters']['rating']
    postal = event['queryStringParameters']['postal']
    # resp['name'] = name
    
    if name=="All Providers" or name=='': name='' 
    else: name="Name='"+name+"' AND "
    
    if speciality=="Select All Specialities" or speciality=='': speciality=''
    else: speciality="Speciality_Group='"+speciality+"' AND "
    
    if rating=="All Ratings" or rating=='': rating=''
    else: rating="Rating='"+rating+"'"
    
    # resp['name'] = name

    with conn.cursor() as cur:
        
        if postal!='' and rating!='':
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID WHERE {}{}{} AND Postal={} ORDER BY RAND() LIMIT 10'''.format(name,speciality,rating,postal)
        elif postal!='' and rating=='':
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID WHERE {}{}{} Postal={} ORDER BY RAND() LIMIT 10'''.format(name,speciality,rating,postal)
        elif name=='' and speciality=='' and rating=='' and postal=='':
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID ORDER BY RAND() LIMIT 10'''
        elif name!='' and speciality=='' and rating=='' and postal=='':
            name = name[:-5]
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID WHERE {} ORDER BY RAND() LIMIT 10'''.format(name)
        elif speciality!='' and rating=='' and postal=='':
            speciality = speciality[:-4]
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID WHERE {}{} ORDER BY RAND() LIMIT 10'''.format(name,speciality)
        else:
            sql2 = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID WHERE {}{}{} ORDER BY RAND() LIMIT 10'''.format(name,speciality,rating)
        # resp['sql'] = sql2
        
        # sql = '''SELECT * FROM DES_NAME a INNER JOIN DES_SERVICE b ON a.DES_ID = b.DES_ID INNER JOIN DES_SITE c ON b.SITE_ID = c.SITE_ID ORDER BY RAND() LIMIT 10'''
            
        cur.execute(sql2)
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
            
        
        # print(resp)
        
        # for row in cur:
        #     item_count += 1
        #     logger.info(row)
            #print(row)
    # conn.commit()

    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(resp)
        }
    