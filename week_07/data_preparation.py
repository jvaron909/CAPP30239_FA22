import json
import csv
import os
import pandas as pd
import calendar
import numpy as np



os.chdir('C:\\Users\\17086\\OneDrive - The University of Chicago\\Documents\\GitHub\\CAPP30239_FA22\\week_07')
# Opening JSON file and loading the data
# into the variable data
with open('a3cleanedonly2015.json', errors="ignore") as json_file:
    data = json.load(json_file)

print("data", type(data), len(data))

data = pd.DataFrame(data)
data = pd.DataFrame.from_dict(data)
data = pd.DataFrame.from_records(data)

#Creating by_race_by_gender df

# count_by_race_by_gender = pd.DataFrame(data.groupby(['Race', 'Gender'])['FIELD1'].count())

# count_by_race_by_gender.columns.values[-1] = "count"
# count_by_race_by_gender.to_csv("count_by_race_by_gender.csv")

# count_by_race_by_gender = pd.read_csv('count_by_race_by_gender.csv')
# count_by_race_by_gender = count_by_race_by_gender.pivot_table(values='count', 
#     index=count_by_race_by_gender["Race"], columns='Gender', aggfunc='first') 
# count_by_race_by_gender.to_csv("count_by_race_by_gender.csv")

#Creating by month df
#data['month'] = pd.DatetimeIndex(data['Date']).month
#d = dict(enumerate(calendar.month_abbr))
#data['month'] = data['month'].map(d)


data['month'] = pd.to_datetime(data['Date']).dt.to_period('M')

#largest = pd.read_csv('25_largest cities.csv')



#by_state = pd.merge(largest, data ,how='inner',left_on=['City'],right_on=['City'])

#print(data.iloc[0:10])

by_month = pd.DataFrame(data.groupby(['month'])['FIELD1'].count())
by_month.columns.values[-1] = "Value"





by_month.to_csv("by_month.csv")
