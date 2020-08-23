
'''

IE - Team 32 Bright - Dis-Able


This file is to collect contact details of DES providers via Google Places APIs
*** Due to limited of APIs budget, the APIs connection will only be used to update new data.
Please use the previous response of API from 'API_place_responses.csv' file.


run  pip3 install -r requirements.txt on terminal to install required libraries

'''

import urllib.request
import pandas as pd
import json
import ast



des_full = pd.read_excel('Dataset/1.3des-star-ratings-march-2020.xlsx', sheet_name = 'Star Ratings', skiprows= 2)
des_email = pd.read_excel('Dataset/DES contact list.xlsx')


des_full = des_full[des_full['State'] == 'VIC']
des_full = des_full[~des_full['Site Location'].isnull()]
des_full.drop(des_full.columns[[1,2,3,5,7,8,9,10,13,14,15,17,18]],\
              axis=1,inplace=True)

des_full.reset_index(inplace=True)
des_full.drop('index',axis=1,inplace=True)


# retrieve only unique locations (to reduce API traffics)
des_unique = des_full[des_full.duplicated(subset=['Org Name','Site Location'],keep='first')].\
sort_values(by=['Org Name','Site Location'])

des_unique.reset_index(inplace=True)
des_unique.drop('index',axis=1,inplace=True)
des_unique['API_Place_Search'] = ''
des_unique['API_Place_Detail'] = ''

# # take few minutes - UNCOMMENT TO RUN otherwise read from 'API_place_reponses.csv' below


# api_place = 'AIzaSyD69eksEStdVqffwHzc2L_Y5btC5ePv_Ls'

# for index, row in des_unique.iterrows():

#     # search for place_id with company name and site location
#     place = des_unique.iloc[index,1].replace("–","").replace(" ","%20")
#     site = '%20'+ des_unique.iloc[index,2]
#     vic = '%20' + 'Victoria'
#     aus = '%20' + 'Australia'

#     find_place_id = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='\
#                 + place + site + vic + aus +\
#                 '&inputtype=textquery&fields=name,place_id,opening_hours,geometry&key='\
#                 + api_place).replace(" ","%20")

#     response = urllib.request.urlopen(find_place_id).read()
#     place_search = json.loads(response)

#     des_unique.loc[index,'API_Place_Search'] = [place_search]

#     if 'candidates' in place_search.keys() and len(place_search['candidates']) >0:
#         place_id = place_search['candidates'][0]['place_id']

#         find_phone = ('https://maps.googleapis.com/maps/api/place/details/json?place_id='\
#                     +place_id\
#                     +'&fields=address_component,formatted_address,formatted_phone_number,website,url&key='\
#                     +api_place).replace(" ","%20")

#         response2 = urllib.request.urlopen(find_phone).read()
#         place_detail = json.loads(response2)

#         des_unique.loc[index,'API_Place_Detail'] = [place_detail]


des_unique = pd.read_csv('Dataset/API_place_responses.csv')


des_unique = des_unique[des_unique['API_Place_Detail'].isna() == False]
des_unique = des_unique[['Org Name','Site Location','API_Place_Search','API_Place_Detail']]
des_full = des_full.merge(des_unique, how='left', on=['Org Name','Site Location'])
des_full = des_full[(des_full['API_Place_Search'].isna() == False) & (des_full['API_Place_Detail'].isna() == False)]

des_full.reset_index(inplace=True)
des_full.drop('index',axis=1,inplace=True)

des_full['API_Place_Search'] = des_full['API_Place_Search'].apply(lambda x: (ast.literal_eval(x))[0])
des_full['API_Place_Detail'] = des_full['API_Place_Detail'].apply(lambda x: (ast.literal_eval(x))[0])


def get_info(df):
    place_search = df['API_Place_Search']

    place_search_info = place_search['candidates'][0]

    # location
    if 'geometry' in place_search_info.keys():
        if 'location' in place_search_info['geometry'].keys():
            df['Latitude'] = place_search_info['geometry']['location']['lat']
            df['Longitude'] = place_search_info['geometry']['location']['lng']

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
des = des[des['administrative_area_level_1'] == 'Victoria']
des = des.drop_duplicates(subset=['Org Name','Program','Latitude','Longitude','Address','Speciality Description'], keep='first')

des = des.copy()

des.drop(['API_Place_Detail','API_Place_Search','administrative_area_level_1','establishment',\
          'floor','premise','subpremise','locality'],axis=1, inplace=True)


des_email['Site Location'] = des_email['Site Location'].str.upper()

new_web = dict(zip(tuple(zip(des_email['Org Name'], des_email['Site Location'])),des_email['Website']))
new_email = dict(zip(tuple(zip(des_email['Org Name'], des_email['Site Location'])),des_email['email']))

for key, info in new_web.items():

    des.loc[(des['Org Name'] == key[0]), 'New Website'] = info

    if key[1] == 'ALL':
        des.loc[(des['Org Name'] == key[0]), 'Email'] = new_email[key]
    else:
        des.loc[(des['Org Name'] == key[0]) & (des['Site Location'] == key[1]), 'Email'] = new_email[key]

des.loc[(des['Email'].isna()), 'Email'] = 'No'
des.loc[des['Phone'].isna(),'Phone'] = 'N/A'
des.loc[des['route'].isna(),'route'] = 'N/A'
des.loc[des['street_number'].isna(),'street_number'] = 'N/A'

des.rename(columns={'Org Name': 'Name','Speciality Description':'Speciality','Star Rating':'Rating','street_number':'Street',\
                   'route':'Route','administrative_area_level_2':'City','Site Location':'Site_Location','country':'Country',\
                   'postal_code':'Postal','New Website':'Website'},inplace = True)


des = des[['Name','Program','Speciality','Rating','Address','Street',\
           'Route','City','Site_Location','State','Country','Postal',\
           'Latitude','Longitude','Phone','Email','Website','URL']]


des_name = des[['Name','Website']].copy()
des_name.drop_duplicates(keep='first',inplace=True)
des_site = des[['Name','Website','Latitude','Longitude','Address','Street','Route','City','State','Country','Postal','URL','Phone','Email']]
des_service = des[['Name','Website','Latitude','Longitude','Program','Speciality','Rating']]


des.to_csv('Dataset/DES_full_list.csv',index=False)
des_name.to_csv('Dataset/DES_NAME.csv',index=False)
des_site.to_csv('Dataset/DES_SITE.csv',index=False)
des_service.to_csv('Dataset/DES_SERVICE.csv', index=False)