import requests

Base = "http://3.131.4.23:5000/"

response = requests.post(Base + "signin", {"email": "bungesregierung@gmbh.de", "password": "Kanzlerin05!"})
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

input("follow")
response = requests.get(Base + "user/Ronho/follow", headers={"Authorization" : token})
print(response.json())

input("loadUser")
response = requests.get(Base + "user/Ronho", headers={"Authorization" : token})
print(response.json())
response = requests.get(Base + "user/Ronho", headers={"Authorization" : token})
print(response.json())

input("unfollow")
response = requests.get(Base + "user/Ronho/unfollow", headers={"Authorization" : token})
print(response.json())

input("loadUser")
response = requests.get(Base + "user/Ronho", headers={"Authorization" : token})
print(response.json())
response = requests.get(Base + "user/Ronho", headers={"Authorization" : token})
print(response.json())