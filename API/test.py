import requests

Base = "http://127.0.0.1:5000/"

response = requests.post(Base + "signup", {"email": "demo@test.de", "password": "Test1", "username":"Test", "name":"Piet"})
print(response)
print(response.json())

input()

response = requests.post(Base + "signin", {"email": "demo@test.de", "password": "Test1"})
print(response.headers)
print(response.json())
token= response.headers["token"]


print("Use correct token? \n Type \"1\" for yes \nAny other thing for No")
if str(input()) != "1":
    token = "abc"

response = requests.post(Base + "checkToken", {"token": token})
print(response.json())

#input()
#response = requests.get(Base + "video/2")
#print(response.json())