
'''

IE - Team 32 Bright - DES-Able


This file is to collect contact details of DES providers via Google Places APIs
*** Due to limited of APIs budget, the APIs connection will only be used to update new data.
Please use the previous response of API from 'API_place_responses.csv' file.


run  pip3 install -r requirements.txt on terminal to install required libraries

'''

import urllib.request
import pandas as pd
import json
import ast


# import data

# to obtain the list of DES providers registered with the government.
des_full = pd.read_excel('Dataset/1.1des-star-ratings-march-2020.xlsx', sheet_name = 'Star Ratings', skiprows= 2)
# to obtain the email address and website of DES providers in Victoria
des_email = pd.read_excel('Dataset/DES contact list.xlsx')

# select site that only locate in Victoria
des_full = des_full[des_full['State'] == 'VIC']

# remove irrelevant rows and columns
des_full = des_full[~des_full['Site Location'].isnull()]
des_full.drop(des_full.columns[[1,2,3,5,7,8,9,10,13,14,15,17,18]],\
              axis=1,inplace=True)

# reset index
des_full.reset_index(inplace=True)
des_full.drop('index',axis=1,inplace=True)


# retrieve only unique locations (to reduce API traffics)
des_unique = des_full[des_full.duplicated(subset=['Org Name','Site Location'],keep='first')].\
sort_values(by=['Org Name','Site Location'])

# reset index
des_unique.reset_index(inplace=True)
des_unique.drop('index',axis=1,inplace=True)
# create two empty columns to store API responses.
# 1) Store response from Place Search
des_unique['API_Place_Search'] = ''
# 2) Store response from Place Details
des_unique['API_Place_Detail'] = ''



# take few minutes - UNCOMMENT TO RUN otherwise read from 'API_place_reponses.csv' below



api_place = 'AIzaSyD69eksEStdVqffwHzc2L_Y5btC5ePv_Ls'

# Loop through every rows

# for index, row in des_unique.iterrows():
#
#     # search for place_id with company name and site location
#
#     place = des_unique.iloc[index,1].replace("–","").replace(" ","%20")
#     site = '%20'+ des_unique.iloc[index,2]
#     vic = '%20' + 'Victoria'
#     aus = '%20' + 'Australia'
#
#     find_place_id = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='\
#                 + place + site + vic + aus +\
#                 '&inputtype=textquery&fields=name,place_id,opening_hours,geometry&key='\
#                 + api_place).replace(" ","%20")
#
#     #  read the response in json
#     response = urllib.request.urlopen(find_place_id).read()
#     place_search = json.loads(response)
#
#     #  save in the column
#     des_unique.loc[index,'API_Place_Search'] = [place_search]
#
#     #  search for place details (address, phone number, url)
#     if 'candidates' in place_search.keys() and len(place_search['candidates']) >0:
#         place_id = place_search['candidates'][0]['place_id']
#
#         find_phone = ('https://maps.googleapis.com/maps/api/place/details/json?place_id='\
#                     +place_id\
#                     +'&fields=address_component,formatted_address,formatted_phone_number,website,url&key='\
#                     +api_place).replace(" ","%20")
#
#         # read as json
#         response2 = urllib.request.urlopen(find_phone).read()
#         place_detail = json.loads(response2)
#
#         # save the response
#         des_unique.loc[index,'API_Place_Detail'] = [place_detail]


des_unique = pd.read_csv('Dataset/API_place_responses.csv')

# remove role with no API response
des_unique = des_unique[des_unique['API_Place_Detail'].isna() == False]

# merge back to the full DES providers list
des_unique = des_unique[['Org Name','Site Location','API_Place_Search','API_Place_Detail']]
des_full = des_full.merge(des_unique, how='left', on=['Org Name','Site Location'])
des_full = des_full[(des_full['API_Place_Search'].isna() == False) & (des_full['API_Place_Detail'].isna() == False)]
des_full.reset_index(inplace=True)
des_full.drop('index',axis=1,inplace=True)

# convert string to dictionary
des_full['API_Place_Search'] = des_full['API_Place_Search'].apply(lambda x: (ast.literal_eval(x))[0])
des_full['API_Place_Detail'] = des_full['API_Place_Detail'].apply(lambda x: (ast.literal_eval(x))[0])



# a funtion to extract information from API response

def get_info(df):

    # extract info from API Place Search response
    place_search = df['API_Place_Search']
    place_search_info = place_search['candidates'][0]

    # location - lattitude and longitude
    if 'geometry' in place_search_info.keys():
        if 'location' in place_search_info['geometry'].keys():
            df['Latitude'] = place_search_info['geometry']['location']['lat']
            df['Longitude'] = place_search_info['geometry']['location']['lng']


    # extract info from API Place Detail response
    place_detail = df['API_Place_Detail']
    place_detail_result = place_detail['result']

    if 'result' in place_detail.keys():

        # phone
        if 'formatted_phone_number' in place_detail_result.keys():
            df['Phone'] = place_detail_result['formatted_phone_number']
        # url
        if 'url' in place_detail_result.keys():
            df['URL'] = place_detail_result['url']
        # full address
        if 'formatted_address' in place_detail_result.keys():
            df['Address'] = place_detail_result['formatted_address']

        if 'address_components' in place_detail_result.keys():

            # address by component
            address_component = place_detail_result['address_components']

            for i in range(len(address_component)):
                address_type = sorted(address_component[i]['types'])[0]
                long_name = address_component[i]['long_name']
                df[address_type] = long_name

    return df


des = des_full.apply(get_info, axis=1)

# select rows in Victoria only
des = des[des['administrative_area_level_1'] == 'Victoria']
# remove any possible duplicates
des = des.drop_duplicates(subset=['Org Name','Program','Latitude','Longitude','Address','Speciality Description'], keep='first')

des = des.copy()
# drop unnecessary columns
des.drop(['API_Place_Detail','API_Place_Search','administrative_area_level_1','establishment',\
          'floor','premise','subpremise','locality'],axis=1, inplace=True)



# Integrate information (email and website) from `des_email` dataframe to the main dataframe `des`.

# reformat site location.
des_email['Site Location'] = des_email['Site Location'].str.upper()
# construct dictionaries of DES providers at each site locations and corresponding website and email information.
new_web = dict(zip(tuple(zip(des_email['Org Name'], des_email['Site Location'])),des_email['Website']))
new_email = dict(zip(tuple(zip(des_email['Org Name'], des_email['Site Location'])),des_email['email']))



# loop through dictionary to update the website and email
for key, info in new_web.items():

    des.loc[(des['Org Name'] == key[0]), 'New Website'] = info

    if key[1] == 'ALL':
        des.loc[(des['Org Name'] == key[0]), 'Email'] = new_email[key]
    else:
        des.loc[(des['Org Name'] == key[0]) & (des['Site Location'] == key[1]), 'Email'] = new_email[key]


# replace NaN values
des.loc[(des['Email'].isna()), 'Email'] = 'No'
des.loc[des['Phone'].isna(),'Phone'] = 'N/A'
des.loc[des['route'].isna(),'route'] = 'N/A'
des.loc[des['street_number'].isna(),'street_number'] = 'N/A'

# rename columns
des.rename(columns={'Org Name': 'Name','Speciality Description':'Speciality','Star Rating':'Rating','street_number':'Street',\
                   'route':'Route','administrative_area_level_2':'City','Site Location':'Site_Location','country':'Country',\
                   'postal_code':'Postal','New Website':'Website'},inplace = True)

# rearrange columns
des = des[['Name','Program','Speciality','Rating','Address','Street',\
           'Route','City','Site_Location','State','Country','Postal',\
           'Latitude','Longitude','Phone','Email','Website','URL']]





# to generate ID and divide the main dataframe into three dataframe based on relational structure

# des_name - DES_ID

des_name = des[['Name','Website']].copy()
# drop duplicates
des_name.drop_duplicates(keep='first',inplace=True)
des_name.reset_index(inplace = True)
des_name.drop('index',axis=1,inplace = True)
des_name.reset_index(inplace = True)
# generate ID
des_name['index'] = des_name['index'].apply(lambda x: x+1)
des_name.rename(columns={'index':'DES_ID'},inplace=True)

# des_site - SITE_ID
des_site = des[['Name','Website','Latitude','Longitude','Address','Street','Route','City','State','Country','Postal','URL','Phone','Email','Speciality']].copy()
# drop duplicates
des_site.drop_duplicates(keep='first',inplace=True)
des_site.reset_index(inplace = True)
des_site.drop('index',axis=1,inplace = True)
des_site.reset_index(inplace = True)
# generate ID
des_site['index'] = des_site['index'].apply(lambda x: x+1)
des_site.rename(columns={'index':'SITE_ID'},inplace=True)
# refer DES_ID from des_name dataframe
des_site = des_site.merge(des_name, on=['Name','Website'])


# des_service
des_service = des[['Name','Website','Latitude','Longitude','Program','Speciality','Rating']].copy()
# drop duplicates
des_service.drop_duplicates(keep='first',inplace=True)
# refer SITE_ID from des_site
des_service = des_service.merge(des_site[['Latitude','Longitude','SITE_ID','Speciality']],\
                                on =['Latitude','Longitude','Speciality'])
# refer DES_ID from des_name
des_service = des_service.merge(des_name, on=['Name','Website'])

# drop unnecessary columns
des_site.drop(['Name','Website','Speciality'],axis=1, inplace=True)
des_service.drop(['Name','Website','Latitude','Longitude'],axis=1, inplace=True)


# save to files
des.to_csv('Dataset/DES_full_list.csv',index=False)
des_name.to_csv('Dataset/DES_NAME.csv',index=False)
des_site.to_csv('Dataset/DES_SITE.csv',index=False)
des_service.to_csv('Dataset/DES_SERVICE.csv', index=False)