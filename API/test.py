import requests

Base = "http://127.0.0.1:5000/"

response = requests.post(Base + "signup", {"email": "ferdi1@muth.de", "password": "Test1", "username":"femu1", "lastName":"Muth", "firstName":"Ferdi", "country":"Deutschland", "birthdate": "10022000", "zip": "61476"})
print(response)
print(response.json())

input()

response = requests.post(Base + "signin", {"email": "ferdi1@muth.de", "password": "Test1"})
print(response.headers)
print(response.json())
print(response.headers)
token= response.headers["Authorization"]


print("Use correct token? \n Type \"1\" for yes \nAny other thing for No")
if str(input()) != "1":
    token = "abc"

response = requests.post(Base + "verify-token", {"token": token})
print(response.json())

#input("Post Blog")
#response = requests.post(Base + "trade", {"type":"test", "percent":"test", "fiatcurrency":"test", "cryptocurrency":"test", "motivation":"test", "startdate":"test", "enddate":"test", "expectedIncrease":"test", "description":"test"}, headers={"Authorization" : token})
#print(response.json())

input("loadUser")
response = requests.get(Base + "user/femu", headers={"Authorization" : token})
print(response.json())

input("follow")
response = requests.get(Base + "user/femu/follow", headers={"Authorization" : token})
print(response.json())

input("loadUser")
response = requests.get(Base + "user/femu", headers={"Authorization" : token})
print(response.json())