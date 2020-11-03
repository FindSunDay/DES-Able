# DES-Able

This project focuses on helping disabled people to have easier access to information of DES (Disability Employment Services) Providers in Victoria. 

Our website: https://des-able.ml

# Directory 
This folder contains 7 sub folders as followings. 
1. iterations - contains the codes of frontend developments from iteration 1 to iteration 3 and the final system . 
2. Dataset - stores the script of database, original datasets and wrangled datasets. 
3. data_handling - holds two python scripts for wrangling tasks.
4. analysis_model - stores two Jupyter Notebooks for caseload prediction and high/low season identification.
5. Tableau - contains a Tableau Desktop workbook for the data visualisations on DES caselaod trends.  
6. data_archive - contains the archive dataset, the original datasets, which are required to recover all datasets.
7. backup - contains a copy of codes, AWS lambda functions, and database script.  


---------------------------------------------
# How to run the file locally.
**Run Final System**
1. Go to 'Iterations' folder.
2. Choose 'final' folder.
3. To run normal version of the website, click on 'index.html. On the other hand, to run color blind version, visit 'colorblind' folder and open 'index.html'.

*For Iteration Development.*
1. Go to prefer iteration folder; 'iteration1', 'iteration2' or 'iteration3'.
2. Access the 'DES-Normal' folder and open 'index.html' file to start the website with normal version. In case, a color blind version is preferred instead go to 'DES-Colorblind' folder and open 'index.html'.
- Iteration 1 website: http://www.des-able.ml/iteration1/DES-Normal 
- Itertaion 2 website: https://des-able.ml/iteration2/DES-Normal/ 
- Iteration 3 website: https://des-able.ml/iteration3/DES-Normal/

      
## 1. 'iterations' - Frontend Development
The frontend code (based on vue.js), html, css and image files of the build from iteration 1 to iteration 3 and the final system are stored in this folder. In each folder , it contains the build of website which including 2 sub folders; 'DES-Normal' and 'DES-Colorblind'.
1. 'iteration1'  
2. 'iteration2'  
3. 'iteration3' 
4. 'final' contains the build of final system.
          
For api code deployed on AWS Lambda, see informationProcessor folder inside backup/AWS.


## 2. Dataset
For the dataset and processing python script used in this project, see Dataset folder which contains the followings.
1. database_script - a folder contains a SQL script to recreate the database. 
2. original_dataset - contains the original datasets with 1 sub folder, and 2 excel files. 
3. wrangled_dataset - holds datasets that have been processed and ready to use. 


## 3. Data Handling ('data_handling')

1. `des_data.py` - Collect DES providers detail from Google API 
This file is to collect contact details of DES providers via Google Places APIs, then perform wrangling and integrated data from `des-star-ratings-march-2020.xlsx` and `DES Contact list.xlsx`. It produces 3 output files; `DES_NAME`, `DES_SITE`, and `DES_SERVICE`.
2. `des_performance.py` - DES Performance detail 
This file is to integrate 110 files (excel and PDF) in DES_monthly_reports into a single dataframe. It produces `DES_PERFORMANCE.csv` and `DES_PERFORMANCE_NUMERICAL.csv` as outputs. 

## 4. Analysis Models ('analysis_model')
It contains 2 Jupyter notebooks. 
1. `caseload_prediction_model.ipynb` (Python) - Train and evaluate 3 models, and select the best model for DES provider's caseload projection. 
2. `identify_high_low_season.ipynb` (R) - Perform analysis on the trends and identify hign and low application seasons.

## 5. Tableau - DES Performance Data Visualisation
The 'DESPerformanceVisualisation.twbd' workbook stores a dashboard, which was created locally and published to Tableau Public in order to embed view on the website. 


## Api code deployed on AWS Lambda - Folder 'backup/AWS'
It contains 4 folders deployed on AWS Lambda as apis and 1 folder contain EC2 key.
1) `informationProcessor` - Provide general information which will initially display on the website includes DES PROVIDER INFO page, NEARBY PROVIDER page and DES PERFORMANCE page.
2) `desQueryProcessor` - Provide search interface which allow user to input name, speciality, rating and postal to retrieve the filtered data for DES PROVIDER INFO page.
3) `desMapProcessor` - Provide search interface which allow user to input user_loc and user_spec to generate five nearest providers information together with routes to the inputed address.
4) `desPerformanceProcessor` - Provide search interface which allow user to input year and month to generate the selected performance data filtered by year and month.
5) `key` - pem key to link to EC2 server.
