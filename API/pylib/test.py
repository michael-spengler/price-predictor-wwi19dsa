import requests

enter = input("1 for 3.131.4.23")
if enter == "1":
    Base = "http://3.131.4.23:5000/"
else:
    Base = "http://127.0.0.1:5000/"

response = requests.post(Base + "signup", {"email": "demo@test.de", "password": "Test1", "username":"Test", "lastName":"Piet", "firstName":"TestName", "country":"DHBWstinkt", "birthdate": "100202000", "zip": "61476"})
print(response)
print(response.json())

input()

response = requests.post(Base + "signin", {"email": "demo@test.de", "password": "Test1"})
print(response.headers)
print(response.json())
input()
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