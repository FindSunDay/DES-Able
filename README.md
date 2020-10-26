# DES-Able

This project focus on showing the information of DES (Disability Employment Services) Providers for disabled people. 

Our website: https://des-able.ml
Username and password are required. 

# How to run the file locally.
**Run Final System**
1) Go to 'Iterations' folder.
2) Choose 'final' folder.
3) To run normal version of the website, click on 'index.html. On the other hand, to run color blind version, visit 'colorblind' folder and open 'index.html'.

*For Iteration Development.*
1) Go to prefer iteration folder; 'iteration1', 'iteration2' or 'iteration3'.
2) Access the 'DES-Normal' folder and open 'index.html' file to start the website with normal version. In case, a color blind version is preferred instead go to 'DES-Colorblind' folder and open 'index.html'.
Iteration 1 website: http://www.des-able.ml/iteration1/DES-Normal 
Itertaion 2 website: https://des-able.ml/iteration2/vic/DES-Normal/index.html 
Iteration 3 website: https://des-able.ml/iteration3/DES-Normal/

      
## Frontend Development - Folder 'iterations'
The frontend code (based on vue.js), html and css files of the build from iteration 1 to iteration 3 and the final system are stored in this folder.   
    1) 'iteration1' contains the build of iteration 1 website which including 2 sub folders; 'DES-Normal' and 'DES-Colorblind'.
    2) 'iteration2' contains the build of iteration 2 website which including 2 sub folders; 'DES-Normal' and 'DES-Colorblind'.  
    3) 'iteration3' contains the build of iteration 3 website which including 2 sub folders; 'DES-Normal' and 'DES-Colorblind'. 
    4) 'final' contains the build of final system.
          
For api code deployed on AWS Lambda, see informationProcessor folder.

## Dataset
For the dataset and processing python script used in this project, see Dataset folder which contains the followings.
  - 'DES_monthly_report'subfolder - contains 111 excel files which are used to for DES performance analysis and projection. (Iteration 3 work) 
  - 2 excel files, 7 csv files and a json file, which are the sources of the project virtual database. 
      1) 1.1.des-star-ratings-march-2020.xlsx - original dataset with detail name list and rating of DES providers in Australia.
      2) DES Contact list.xlsx - contain the website and email of DES providers in Victoria.
      3) API_RESPONSE - API responses contain the address, latitude, longitude and contact details of DES providers in Victoria.
      4) DES_full_list.csv - Integrated version of DES provider information. (Combination of DES_NAME, DES_SERVICE, and DES_SITE)
      5) DES_NAME.csv - DES provider names and websites.
      6) DES_SITE.csv - DES provider's address and location.
      7) DES_SERVICE.csv - DES provider's program, speciality, and rating. 
      8) DES_PERFORMANCE.csv - Number of caseloads, statuses and phases from 2011 to 2020. The number of caseloads are in string format which to be shown on the web.  
      9) DES_PERFORMANCE_NUMERICAL.csv - Similar to 8) but the number of caseloads are in numerical types which to be used for line graph visualisation. 
      10) DES_PERFORMANCE_NUMERICAL.json - Similar to 9) but in json. 

### Collect DES providers detail from Google API -`des_data.py` (Python)
This file is to collect contact details of DES providers via Google Places APIs (saved as `API_RESPONSE.csv`), then perform wrangling and integrated data from `1.1.des-star-ratings-march-2020.xlsx` and `DES Contact list.xlsx`. It produces 4 output files; `DES_full_list`, `DES_NAME`, `DES_SITE`, and `DES_SERVICE`.

### Algorithm for Nearby Provider function - `distance.py` (Python)
This file is to calculate the radial distance and retrieve travelling distance from user's location and DES providers
location. The top 5 nearest DES providers are then recommended to the user along with the distance information.

### DES Performance detail - `des_performance.py` (Python)
This file is to integrate 110 files (excel and PDF) in DES_monthly_reports into a single dataframe. It produces `DES_PERFORMANCE.csv`, `DES_PERFORMANCE_NUMERICAL.csv` and `DES_PERFORMANCE_NUMERICAL.json` as outputs. 

### Modeling and analysis on DES Performance - Folder 'analysis_model'.
It contains 2 Jupyter notebooks. 
1) `caseload_prediction_model.ipynb` (Python) - Train and evaluate 3 models, and select the best model for DES provider's caseload projection. 
2) `identify_high_low_season.ipynb` (R) - Perform analysis on the trends and identify hign and low application seasons.

### DES Performance Data Visualisation - Folder Tableau - `DESPerformanceVisualisation`
The dashboard is created locally and published to Tableau Public in order to embed view on the website. 


## Api code deployed on AWS Lambda - Folder 'AWS'
It contains 4 folders deployed on AWS Lambda as apis and 1 folder contain EC2 key.
1) `informationProcessor` - Provide general information which will initially display on the website includes DES PROVIDER INFO page, NEARBY PROVIDER page and DES PERFORMANCE page.
2) `desQueryProcessor` - Provide search interface which allow user to input name, speciality, rating and postal to retrieve the filtered data for DES PROVIDER INFO page.
3) `desMapProcessor` - Provide search interface which allow user to input user_loc and user_spec to generate five nearest providers information together with routes to the inputed address.
4) `desPerformanceProcessor` - Provide search interface which allow user to input year and month to generate the selected performance data filtered by year and month.
5) `key` - pem key to link to EC2 server.
