import requests

Base = "http://3.131.4.23:5000/"

response = requests.post(Base + "signup", {"email": "demo@test.de", "password": "Test1", "username":"Test", "lastName":"Piet", "firstName":"TestName", "country":"DHBWstinkt", "birthdate": "today", "zip": "61476"})
print(response)
print(response.json())

input()

response = requests.post(Base + "signin", {"email": "demo@test.de", "password": "Test1"})
print(response.headers)
print(response.json())
print(response.headers)
token= response.headers["Authorization"]


print("Use correct token? \n Type \"1\" for yes \nAny other thing for No")
if str(input()) != "1":
    token = "abc"

response = requests.post(Base + "verify-token", {"token": token})
print(response.json())

input("Post Blog")
response = requests.post(Base + "trade", {"type":"test", "percent":"test", "fiat":"test", "motivation":"test", "startdate":"test", "enddate":"test", "expectedIncrease":"test", "description":"test"}, headers={"Authorization" : token})
print(response.json())