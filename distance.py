'''
IE - Team 32 Bright - DES-Able


This file is to calculate the radial distance and retrieve travelling distance from user's location and DES providers
location. The top 5 nearest DES providers are then recommended to the user along with the distance information.


Note:
For MacOS user, in case the program raise SSL:CERTIFICATE_VERIFY_FAILED Error,type the following command in the terminal
pip install certifi
/Applications/Python\ 3.6/Install\ Certificates.command



'''

import re
import json
import urllib.request
import pandas as pd
from math import radians, acos, sin, cos, sqrt, asin, log


# read data
des_site = pd.read_csv("./Dataset/DES_SITE.csv")
des_name = pd.read_csv("./Dataset/DES_name.csv")

# user_loc = input('Please type down your address:', )
# user_loc = '5 Dudley street 3145'
user_loc = '17 Darling Road 3145'

# Google Place API to gt user longitude and latitude
api_place = 'AIzaSyD69eksEStdVqffwHzc2L_Y5btC5ePv_Ls'

find_user_loc = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='
                 + user_loc+'&inputtype=textquery&fields=name,place_id,opening_hours,geometry&key='
                 + api_place).replace(" ", "%20")

user_response = urllib.request.urlopen(find_user_loc).read()
user_loc_detail = json.loads(user_response)

# retrieve Latitude and Longitude
access_loc = user_loc_detail['candidates'][0]['geometry']['location']
(user_lat, user_lng) = access_loc['lat'], access_loc['lng']

user_lat_lng = (user_lat, user_lng)


# Calculating radial distance
# distance is calculated with Haversine formula with the radius of the earth equal to 6,378 km.


def get_radial_distance(user_lat_lng, des_lat_lng):
    # converts to spherical coordinates in radians
    lat1, lon1 = map(radians, user_lat_lng)

    lat2, lon2 = map(radians, des_lat_lng)
    # find distance between two coordinates
    dist_lon = lon2 - lon1
    dist_lat = lat2 - lat1

    # calculate the arc using Haversine formula
    arc = (sin(dist_lat / 2) ** 2) + (cos(lat1)
                                      * cos(lat2) * (sin(dist_lon / 2) ** 2))

    # calculate the arc distance in km.
    arc_dist = asin(sqrt(arc)) * 6378 * 2
    return round(arc_dist, 2)


# compute the distance between user location and all DES provideres
for inx, row in des_site.iterrows():
    des_lat_lng = (des_site.loc[inx, 'Latitude'],
                   des_site.loc[inx, 'Longitude'])

    des_site.loc[inx, 'Radial_distance'] = get_radial_distance(
        user_lat_lng, des_lat_lng)

# sort Radial distance by ascending order
des_site = des_site.sort_values(by=['Radial_distance'])
des_site.reset_index(inplace=True)
des_site.drop('index', axis=1, inplace=True)


# select the top 10 DES with the shortest radial distance
des_site_10 = des_site.loc[0:9, :]

des_site_10 = des_site_10.copy()

des_site_10['Direction_API'] = ''

# get travelling distance and mode of transit from Google Directions API
# here only top 10 selected previously are sent for responses

direction_api = 'AIzaSyC43uAA_FBmpqw5mcarSzlOs16pwDG6aXs'
start = 'origin=' + str(user_lat) + ',' + str(user_lng)
for inx, row in des_site_10.iterrows():
    des_lat = des_site_10.loc[inx, 'Latitude']
    des_lng = des_site_10.loc[inx, 'Longitude']
    stop = '&destination=' + str(des_lat) + ',' + str(des_lng)

    direction = ('https://maps.googleapis.com/maps/api/directions/json?'
                 + start + stop + '&mode=transit' + '&key='
                 + direction_api)

    direction_response = urllib.request.urlopen(direction).read()
    direction_detail = json.loads(direction_response)
    des_site_10.loc[inx, 'Direction_API'] = [direction_detail]


des_site_10['Direction_API'] = des_site_10['Direction_API'].apply(
    lambda x: dict(x))

# retrieve information from API response
for inx, row in des_site_10.iterrows():

    access_val = des_site_10.loc[inx, 'Direction_API']['routes'][0]['legs'][0]

    # get travelling distance (in km)
    des_site_10.loc[inx, 'Travel_distance'] = float(
        (access_val['distance']['text']).replace('km', ''))

    # get all travel modes
    travel_mode = str(set(re.findall(
        r"travel_mode': '(\w+)\'}|'name': '(\w+)\'", str(des_site_10.loc[inx, 'Direction_API']))))

    travel_mode = set(re.findall(r"(\w+)", travel_mode)) - {'PTV', 'TRANSIT'}
    travel_mode = set([x.upper() for x in travel_mode])

    des_site_10.loc[inx, 'Travel_mode'] = [travel_mode]


des_site_10 = des_site_10.sort_values(by='Travel_distance')
des_site_10.reset_index(inplace=True)
des_site_10.drop('index', axis=1, inplace=True)

# select the top 5 nearest DES providers based on travelling distance
des_top_5 = des_site_10.loc[0:4, :]
# get the DES provider names from des_name dataframe
des_top_5.merge(des_name, on='DES_ID')

print(des_top_5['Direction_API'][0])
