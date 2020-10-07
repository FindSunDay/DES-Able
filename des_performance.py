
'''

IE - Team 32 Bright - DES-Able


This file is to integrate 110 files (excel and PDF) in DES_monthly_reports into a single dataframe.
The data is as of August 2020.

'''

import pandas as pd

data = pd.DataFrame(columns=['Year','Month','Referred','Suspended','Commenced','Total'\
                             ,'Commenced_Employment','Commenced_Placement','Commenced_Ongoing' ])

idx = 0

for year in range(2011, 2021):

    for month in range(1, 13):

        # ignore unavailable data

        # change the month here to increase data coverage
        # current set up is considered data up to August 2020
        if year == 2020 and month > 8:
            break

        elif year == 2011 and month in range(1, 7):
            pass

        # handle data from PDF files
        elif year == 2018 and month in range(7, 13):

            if month == 7:

                ref = 14762
                com = 131118
                sus = 51735
                total = ref + com + sus

                emp = 91373
                plc = 26567
                sup = 13178

            elif month == 8:

                ref = 12312
                com = 134944
                sus = 54299
                total = ref + com + sus

                emp = 93502
                plc = 28564
                sup = 12878

            elif month == 9:

                ref = 11764
                com = 139029
                sus = 53885
                total = ref + com + sus

                emp = 95288
                plc = 30772
                sup = 12969

            elif month == 10:

                ref = 11050
                com = 142245
                sus = 55199
                total = ref + com + sus

                emp = 96631
                plc = 32731
                sup = 12883

            elif month == 11:

                ref = 10730
                com = 145989
                sus = 55507
                total = ref + com + sus

                emp = 98410
                plc = 34752
                sup = 12827

            elif month == 12:

                ref = 11123
                com = 149539
                sus = 53041
                total = ref + com + sus

                emp = 102315
                plc = 35818
                sup = 11406

            data.loc[idx, 'Year'] = year
            data.loc[idx, 'Month'] = month
            data.loc[idx, 'Referred'] = ref
            data.loc[idx, 'Suspended'] = sus
            data.loc[idx, 'Commenced'] = com
            data.loc[idx, 'Total'] = total

            data.loc[idx, 'Commenced_Employment'] = emp
            data.loc[idx, 'Commenced_Placement'] = plc
            data.loc[idx, 'Commenced_Ongoing'] = sup

            idx += 1

        # old template
        elif year < 2019:
            df = pd.read_excel("Dataset/DES_monthly_reports/DES_" + str(month) + "_" + str(year) + ".xlsx", \
                               sheet_name="Current Caseload", \
                               skiprows=5)
            df = df.iloc[:, 0:4]
            df.columns = ['Status', 'DMS', 'ESS', 'Total']

            df.iloc[9, 0] = df.iloc[9, 0].strip()

            ## STATUS
            # Referred but not Commenced
            ref = df[df['Status'] == 'Referred but not Commenced']['Total']
            # Commencements
            com = df[df['Status'] == 'Commencements']['Total']
            # Suspended
            sus = list(df[df['Status'] == 'Suspended']['Total'])[0]

            total = list(df[df['Status'] == 'Total']['Total'])[0]

            ## PHASE
            # Employment Assistance
            if len(df[df['Status'] == 'Employment Assistance']['Total']) > 0:
                emp = list(df[df['Status'] == 'Employment Assistance']['Total'])[0]
            else:
                emp = list(df[df['Status'] == 'Employment Assistance Phase']['Total'])[0]

            # Post Placement
            if len(df[df['Status'] == 'Post Placement']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement']['Total']
            elif len(df[df['Status'] == 'Post Placement Support']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement Support']['Total']
            elif len(df[df['Status'] == 'Post Placement Phase']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement Phase']['Total']

            # Ongoing Support
            if len(df[df['Status'] == 'Ongoing Support']['Total']) > 0:
                sup = df[df['Status'] == 'Ongoing Support']['Total']
            elif len(df[df['Status'] == 'Ongoing support']['Total']) > 0:
                sup = df[df['Status'] == 'Ongoing support']['Total']

            data.loc[idx, 'Year'] = year
            data.loc[idx, 'Month'] = month
            data.loc[idx, 'Referred'] = int(ref)
            data.loc[idx, 'Commenced'] = int(com)
            data.loc[idx, 'Suspended'] = int(sus)
            data.loc[idx, 'Total'] = int(total)

            data.loc[idx, 'Commenced_Employment'] = int(emp)
            data.loc[idx, 'Commenced_Placement'] = int(plc)
            data.loc[idx, 'Commenced_Ongoing'] = int(sup)

            idx += 1

        # new template
        elif year >= 2019:

            df = pd.read_excel("Dataset/DES_monthly_reports/DES_" + str(month) + "_" + str(year) + ".xlsx", \
                               sheet_name="Summary", \
                               skiprows=8)

            df = df.iloc[0:9, 6:10]
            df.columns = ['Status', 'DMS', 'ESS', 'Total']

            ## STATUS
            # Referred but not Commenced
            ref = df[df['Status'] == 'Referred but not Commenced']['Total']

            # Commencements
            if len(df[df['Status'] == 'Commenced']['Total']) > 0:
                com = df[df['Status'] == 'Commenced']['Total']
            elif len(df[df['Status'] == 'Commencements']['Total']) > 0:
                com = df[df['Status'] == 'Commencements']['Total']
            # Suspended
            sus = list(df[df['Status'] == 'Suspended']['Total'])[0]

            total = int(ref) + int(com) + int(sus)

            ## PHASE
            # Employment Assistance
            if len(df[df['Status'] == 'Employment Assistance']['Total']) > 0:
                emp = list(df[df['Status'] == 'Employment Assistance']['Total'])[0]
            else:
                emp = list(df[df['Status'] == 'Employment Assistance Phase']['Total'])[0]

            # Post Placement
            if len(df[df['Status'] == 'Post Placement']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement']['Total']
            elif len(df[df['Status'] == 'Post Placement Support']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement Support']['Total']
            elif len(df[df['Status'] == 'Post Placement Phase']['Total']) > 0:
                plc = df[df['Status'] == 'Post Placement Phase']['Total']

            # Ongoing Support
            if len(df[df['Status'] == 'Ongoing Support']['Total']) > 0:
                sup = df[df['Status'] == 'Ongoing Support']['Total']
            elif len(df[df['Status'] == 'Ongoing support']['Total']) > 0:
                sup = df[df['Status'] == 'Ongoing support']['Total']

            data.loc[idx, 'Year'] = year
            data.loc[idx, 'Month'] = month
            data.loc[idx, 'Referred'] = int(ref)
            data.loc[idx, 'Commenced'] = int(com)
            data.loc[idx, 'Suspended'] = int(sus)
            data.loc[idx, 'Total'] = int(total)

            data.loc[idx, 'Commenced_Employment'] = int(emp)
            data.loc[idx, 'Commenced_Placement'] = int(plc)
            data.loc[idx, 'Commenced_Ongoing'] = int(sup)

            idx += 1

for index, row in data.iterrows():
    if index == 0:
        data.loc[index, 'MOM'] = 0

    elif index > 0:
        current_month = data.loc[index, 'Total']
        prev_month = data.loc[index - 1, 'Total']
        data.loc[index, 'MOM'] = round((current_month - prev_month) * 100 / prev_month, 2)

    if data.loc[index, 'MOM'] == 0:
        data.loc[index, 'Direction'] = ''
    elif data.loc[index, 'MOM'] < 0:
        data.loc[index, 'Direction'] = 'Decreased'
    elif data.loc[index, 'MOM'] > 0:
        data.loc[index, 'Direction'] = 'Increased'

    data.loc[index, 'Referred%'] = round(data.loc[index, 'Referred'] * 100 / data.loc[index, 'Total'])
    data.loc[index, 'Suspended%'] = round(data.loc[index, 'Suspended'] * 100 / data.loc[index, 'Total'])
    data.loc[index, 'Commenced%'] = round(data.loc[index, 'Commenced'] * 100 / data.loc[index, 'Total'])

    data.loc[index, 'Commenced_Employment%'] = round(
        data.loc[index, 'Commenced_Employment'] * 100 / data.loc[index, 'Commenced'])
    data.loc[index, 'Commenced_Placement%'] = round(
        data.loc[index, 'Commenced_Placement'] * 100 / data.loc[index, 'Commenced'])
    data.loc[index, 'Commenced_Ongoing%'] = round(
        data.loc[index, 'Commenced_Ongoing'] * 100 / data.loc[index, 'Commenced'])


# save to csv
data.to_csv('Dataset/DES_PERFORMANCE.csv', index=False)

# save to json
data.to_json('Dataset/DES_PERFORMANCE.json')
