'''
IE - Team 32 Bright - DES-Able


This file is to calculate the radial distance and retrieve travelling distance from user's location and DES providers
location. The top 5 nearest DES providers are then recommended to the user along with the distance information.


Note:
For MacOS user, in case the program raised 'SSL:CERTIFICATE_VERIFY_FAILED' Error,
type the following command in the terminal

pip install certifi
/Applications/Python\ 3.6/Install\ Certificates.command

'''

from math import radians, sin, cos, sqrt, asin
import urllib.request
import json
import csv

# read csv as dictionary (key = row)


def to_dict(filename):
    key = 0
    data = csv.DictReader(open(filename), delimiter=",")
    result = {}

    for line in data:
        if key in result:
            pass
        line = dict(line)
        result[key] = dict(line)
        key += 1
    return result


def get_user_loc(text):
    # Google Place API to gt user longitude and latitude
    api_place = 'AIzaSyD69eksEStdVqffwHzc2L_Y5btC5ePv_Ls'

    find_user_loc = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='
                     + text + '%20Victoria%20Australia' +
                     '&inputtype=textquery&fields=name,place_id,opening_hours,geometry&key='
                     + api_place).replace(" ", "%20")

    user_response = urllib.request.urlopen(find_user_loc).read()
    user_loc_detail = json.loads(user_response)

    return user_loc_detail

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


# main algorithm
def lambda_handler():

    des_site = to_dict("./Dataset/DES_SITE.csv")
    des_name = to_dict("./Dataset/DES_NAME.csv")
    des_serv = to_dict("./Dataset/DES_SERVICE.csv")

    # IDENTIFY USER LOCATION

    # -- Get input from Web

    # user_loc = input('Please type down your address:', )

    user_loc = '52 Osullivan Rd Glen Waverley VIC'
    user_loc_detail = get_user_loc(user_loc)

   # retrieve Latitude and Longitude
    try:
        access_loc = user_loc_detail['candidates'][0]['geometry']['location']
        (user_lat, user_lng) = access_loc['lat'], access_loc['lng']
    except:
        print('No Result')

    user_lat_lng = (user_lat, user_lng)

    # CALCULATE RADIAL DISTANCE

    for key, val in des_site.items():
        des_lat_lng = (float(val['Latitude']), float(val['Longitude']))
        val['Radial_distance'] = get_radial_distance(user_lat_lng, des_lat_lng)

    # update des service with distance and location information
    for key, val in des_serv.items():
        for row, data in des_site.items():
            # check the site_id (key)
            if val['SITE_ID'] == data['SITE_ID']:
                for item in data.keys():
                    des_serv[key][item] = data[item]

    # CREATE SPECIALITY FILTER

    # -- Get input from Web

    # default value

    # user_spec = 'All Client Types'
    user_spec = 'All Specialities'

    # get the set of speciality
    spec = {i['Speciality'] for i in des_serv.values()}
    # random value
    # user_spec = spec.pop()

    if user_spec != 'All Specialities':
        # filter matching speciality
        des_spec = dict((i, j) for i, j in des_serv.items()
                        if j['Speciality'] == user_spec)

    elif user_spec == 'All Specialities':
        des_spec = des_serv

    # IDENTIFY THE TOP 10 PROVIDERS WITH SHORTEST RADIAL DISTANCE

    find_min_dist = []
    for key, val in des_spec.items():
        find_min_dist.append((key, val['Radial_distance']))
    find_min_dist.sort(key=lambda x: x[1])

    top_10 = [i[0] for i in find_min_dist[:10]]
    des_site_10 = dict((i, j) for i, j in des_spec.items() if i in top_10)

    # CALLING GOOGLE 'Distance Matrix API' to get travelling distance

    # travel mode = transit

    distance_api = 'AIzaSyDO2l7Az6IJTCP4IHFmvWxdYsNBVcR56B8'
    start = 'origins=' + str(user_lat) + ',' + str(user_lng)

    find_top_5 = []

    for key, val in des_site_10.items():
        des_lat = val['Latitude']
        des_lng = val['Longitude']

        stop = '&destinations=' + str(des_lat) + ',' + str(des_lng)

        distance = ('https://maps.googleapis.com/maps/api/distancematrix/json?'
                    + start + stop + '&mode=transit' + '&key='
                    + distance_api)

        distance_response = urllib.request.urlopen(distance).read()
        distance_detail = json.loads(distance_response)

        val['Distance_API'] = distance_detail

        val['Distance'] = float(val['Distance_API']['rows'][0]['elements'][0]
                                ['distance']['text'].replace('km', ''))
        # val['Duration'] = float(val['Distance_API']['rows'][0]['elements'][0] \
        #                             ['duration']['text'].replace('mins', ''))

        find_top_5.append((key, val['Distance']))

    # SELECT THE TOP 5 DES PROVIDERS WITH THE SHORTEST TRAVELLING DISTANCE

    find_top_5.sort(key=lambda x: x[1])
    top_5 = [i[0] for i in find_top_5[:5]]

    des_site_5 = {}
    index = 0
    for item in top_5:
        for key, val in des_site_10.items():
            if index < 5 and key == item:
                des_site_5[index + 1] = val
                index += 1
            # else:
            #     break
            # index += 1

    # Collect name and website from des_name
    for key, val in des_site_5.items():
        for row, data in des_name.items():
            if val['DES_ID'] == data['DES_ID']:
                val['Name'] = data['Name']
                val['Website'] = data['Website']

    # result
    return(des_site_5)


# if __name__ == '__main__':
resp = lambda_handler()
print(resp)
