# Powernet
This project has been fully tested on Ubuntu 14

## Project Introduction
The project "Powernet" is an initiative of Stanford Linear Accelerator Laboratory (SLAC) operated by Stanford on behalf of DOE (Department of Energy, US).  

The main objective of "Powernet" project is to provide an end to end open source technology for economically efficient, scalable and secured coordination of grid resources.  

The project is being developed in collaboration with Carnegie Mellon University (SV) students, under the guidance of Prof Osman Yagan (Assistant Prof (E&C) at CMU) and Sila Kilicotte, Staff scientist at SLAC.  

The project was started as a proof of concept to identify the potential use of information technology in the grid system to harness the information/data available and to exploit data driven approach in making intelligent decision.  

## System Design
"Powernet" is composed of the "Cloud Control" (CC) and the Home Hub (HH). The Home Hub monitors and controls the local devices based on the power price, and periodically send device status (power consumption) to the "Cloud Control" (CC). "Cloud Control" collects device statuses from "Home Hub", determines the desired net load and optimizes the power flow based on the aggregated data.  

Our project mainly focuses on the "Cloud Control" part, and provides the Power Protocol Layer to Home Hubs. Additionally "Dashboard" is implemented to provide real time power usage by the Home Hub using informative graphs.

## High Level Design
### Cloud Control
The cloud control is the main component that is hosted on the cloud infrastructure (Amazon Web Service) and is intended to interface with the OpenADR for price information. It also provided a host of webservers for "Homehub" and "Dashboard" via RESTful API.

### Home Hub
The Homehub represents a component in the house that interacts with the Cloud control over the TCP/IP network and retrieves useful information e.g. "pricing information" from the web service provided by "Cloud Control". Additionally it sends useful information to the "Cloud Control" for e.g. "total power usag"” that could be utilized for future data analytics.

### Dashboard
The dashboard provided power usage by Home Hubs using informative graphs. It directly interacts with the "Cloud Control" via RestFul API for real time data.

## Low Level Design
### Cloud Control
The "Cloud Control", hosted on AWS(Amazon Web Service) is implemented using node.js and backend database "mongoDB". An in memory cache  "redis" is used to improve the performance of data exchange between the dash board and the "Cloud Control"

### Dashboard
The dashboard is implemented using the "bootstrap" and "React-NVD3" library. "React-NVD3" provides predefined components such as maps, charts and line graph which can be incorporated to present rich UI. Additionally, "Leaflet" library is used to provide/represent location information.

### HomeHub
This is being implemented by the OpenBMS team.

## How to Use
1. Install mongoDB and start mongod service 
2. git clone https://github.com/Cpruce/OpenDER.git && cd OpenDER/bootstrap_dashboard
3. Install dependencies: npm install
4. Build: gulp build
5. Lauch: gulp run

## Public RESTful APIs
### /api/homehubs
Function: Register a new homehub, and return its uid
Type: POST  
Parameters:  
{
　"uuid" : Universally Unique ID for HH,  
　"label": User configured label for HH,  
　"total_power": aggregate power consumption at HH,  
　"location": location information,  
　"callback_url": URL to post data from CC to HH,  
　"state":{  
　　device id: {  
　　　"power" : device power consumption,  
　　　"status"  : device status,  
　　　…  
　　},  
　　…  
　}  
}  
Response - Status code 201 with {“uuid” : uuid of the newly registered Home Hub}  

### /api/homehubs/\<uuid\>/
Function: Send Homehub status to Cloud Control  
Type: PATCH  
Parameters:  
{
	"total_power" : consumption  
}  
Response - Status code 200  

### /api/homehubs/aggregation/\<timestamp\>/
Function: Get Homehub status during a specified time period
Type: GET  
Parameters: None  
Response - Status code 200 with following JSON response string  
[  
　{ "key": Home Hub Label 1,  
　"values": [  
　　[timestamp1, power_consumption1], [timestamp2, power_consumption2], ...]  
　},  
　{ "key": Home Hub Label 2,  
　"values": [  
　[timestamp1, power_consumption1], [timestamp2, power_consumption2], ...]  
　}  
]  


### /api/homehubs/  
Function: Get Homehub current status
Type: GET  
Parameters: None  
Response - Status code 200 with following JSON response string
[  
　{  
　　"hh_id": Home Hub uuid 1,  
　　"name": Home Hub Label 1,  
　　"total_power": consumption 1  
　},  
　{  
　　"hh_id": Home Hub uuid 2,  
　　"name": Home Hub Label 2,  
　　"total_power": consumption 2  
　},  
]  

### /api/price
Function: Set power price
Type: POST  
Parameters:  
{  
　"price" : latest power price  
}  
Response - Status code 200

## MongoDB Collections
1. homehubs - Store the basic information of a homehub, including uuid, name, longitude, latitude and device list, current power price
2. hhstatus - Store the homehub status, including uuid, reporting timestamp

## Security Considerations
1. Using ReactJS, which does not produce html. Arguably defeating XSS attacks.
2. Load balancing for DDOS attacks.

## TODOs
1. Perfomance evaluation
2. Security assessment
