import requests

Base = "http://127.0.0.1:5000/"

response = requests.post(Base + "signup", {"email": "demo1@demo.de", "password": "Test1"})
print(response.json())

input()

response = requests.get(Base + "signin")
print(response.json())

#input()
#response = requests.get(Base + "video/2")
#print(response.json())