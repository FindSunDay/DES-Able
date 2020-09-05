from math import radians, acos, sin, cos, sqrt, asin, log
import pandas as pd
import urllib.request
import json

'''
For MacOS user, in case the program raise SSL:CERTIFICATE_VERIFY_FAILED Error,type the following command in the terminal

pip install certifi
/Applications/Python\ 3.6/Install\ Certificates.command

'''


des_site = pd.read_csv("./Dataset/DES_SITE.csv")
des_name = pd.read_csv("./Dataset/DES_name.csv")
# user_loc = input('Please type down your address:', )
user_loc = '5 Dudley street 3145'


api_place = 'AIzaSyD69eksEStdVqffwHzc2L_Y5btC5ePv_Ls'

find_user_loc = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='\
                 + user_loc+'&inputtype=textquery&fields=name,place_id,opening_hours,geometry&key='\
                 + api_place).replace(" ","%20")

user_response = urllib.request.urlopen(find_user_loc).read()
user_loc_detail = json.loads(user_response)

access_loc = user_loc_detail['candidates'][0]['geometry']['location']
(user_lat,user_lng) = access_loc['lat'], access_loc['lng']

user_lat_lng = (user_lat,user_lng)


# distance is calculated with Haversine formula with the radius of the earth equal to 6,378 km.

# input loc1 = a tuple of (lat, lng)

def get_radial_distance(user_lat_lng, des_lat_lng):
    # converts to spherical coordinates in radians
    lat1, lon1 = map(radians, user_lat_lng)

    lat2, lon2 = map(radians, des_lat_lng)
    # find distance between two coordinates
    dist_lon = lon2 - lon1
    dist_lat = lat2 - lat1

    # calculate the arc using Haversine formula
    arc = (sin(dist_lat / 2) ** 2) + (cos(lat1) * cos(lat2) * (sin(dist_lon / 2) ** 2))

    # calculate the arc distance in km.
    arc_dist = asin(sqrt(arc)) * 6378 * 2
    return round(arc_dist, 2)


for inx, row in des_site.iterrows():
    des_lat_lng = (des_site.loc[inx, 'Latitude'], des_site.loc[inx, 'Longitude'])

    des_site.loc[inx, 'Radial_distance'] = get_radial_distance(user_lat_lng, des_lat_lng)

# sort Radial distance by ascending order
des_site = des_site.sort_values(by=['Radial_distance'])
des_site.reset_index(inplace=True)
des_site.drop('index',axis=1,inplace = True)

# select the top 10 DES with the shortest radial distance
des_site_10 = des_site.loc[0:10,:]

