# DES-Able

This project focus on showing the information of DES (Disability Employment Services) Providers for disabled people. 

Our website: http://des-able.ml/iteration3/DES-Normal/
Username and password are required. 

# How to run the file locally.

1. Download 'Iterations' folder. 

For **Iteration 3** and iteration 2.
  2. Go to prefer iteration folder; 'iteration2' or **'iteration3'** .
  3. Access the 'DES-Normal' folder and open 'index.html' file to start the website with normal version. In case, a color blind version is preferred instead go to 'DES-Colorblind' folder and open 'index.html'. 

  Itertaion2 website: https://des-able.ml/iteration2/vic/DES-Normal/index.html

For iteration 1 website
  2. Download 'Iterations' folder. 
  3. Go to 'DES-Normal' folder and open 'index.html' file to start the website with normal version.

  Iteration 1 website: http://www.des-able.ml/iteration1/DES-Normal 

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
  
## Directory Guide
### 1.Iterations 
  The frontend code (based on vue.js), html and css files of the build from iteration 1 to iteration 3 are stored in this folder.   
      - 'DES-Normal' contains normal version of iteration 1 website.
      - 'DES-Colorblind' contains colorblind version of iteration 1 website. 
      - 'iteration2' contains the build of iteration 2 website which including 2 sub folders; 'DES-Normal' and 'DES-Colorblind'.  
      - 'iteration2_api'

For api code deployed on AWS Lambda, see informationProcessor folder.




