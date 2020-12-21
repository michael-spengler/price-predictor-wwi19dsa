import requests

Base = "http://127.0.0.1:5000/"

response = requests.post(Base + "signup", {"email": "ferdi@test.de", "password": "Test1", "username":"Test", "lastName":"Piet", "firstName":"TestName", "country":"DHBWstinkt", "birthdate": "today", "zip": "61476"})
print(response)
print(response.json())

input()

response = requests.post(Base + "signin", {"email": "ferdi@test.de", "password": "Test1"})
print(response.headers)
print(response.json())
token= response.headers["Authorization"]
print(token)


print("Use correct token? \n Type \"1\" for yes \nAny other thing for No")
if str(input()) != "1":
    token = "abc"

response = requests.post(Base + "verify-token", {"token": token})

print(response.json())

input()

response = requests.post(Base + "blog", {"content":"Test", "author":"author", "title":"title", "date":"today"}, headers={"Authorization" : token})
print(response.json())

input()
#response = requests.get(Base + "video/2")
#print(response.json())