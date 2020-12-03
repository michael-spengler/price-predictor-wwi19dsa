from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from functions import createHashAndSalt, matchingPassword, createToken, verifyToken

app = Flask(__name__)
api = Api(app)

#Loading Users
users = {"demo@demo.de" : {'password': 'Test1', "email" : "demo@demo.de"}}

#Args that need to be provided per request
user_signin_args = reqparse.RequestParser()
user_signin_args.add_argument("email", type=str, help="email missing", required=True)
user_signin_args.add_argument("password", type=str, help="password missing", required=True)

user_signup_args = reqparse.RequestParser()
user_signup_args.add_argument("email", type=str, help="email missing", required=True)
user_signup_args.add_argument("password", type=str, help="password missing", required=True)

user_args = reqparse.RequestParser()
user_args.add_argument("token", type=str, help="token missing", required=True)

#Abort functions
def abortIfUserNotExisting(email):
    if email not in users:
        abort(404, message="Email not found")
def abortIfUserExisting(email):
    if email in users:
        abort(404, message="Email already exists")



class SignIn(Resource):
    def post(self):
        args = user_signin_args.parse_args() #reading args from json
        abortIfUserNotExisting(args.email)
        storedKey = users[args.email]["password"] #loading stored Key
        if not matchingPassword(storedKey, args.password):
            abort(404, message="Password incorrect")
        else:
            token = createToken(args.email)
            return {"token" : token}, 201

class SignUp(Resource):
    def post(self):
        args = user_signup_args.parse_args()
        abortIfUserExisting(args.email)
        args.password = createHashAndSalt(args.password)
        users[args.email] = args
        return args.email + " has been successfully added to the DB", 201

class CheckToken(Resource):
    def post(self):
        args = user_args.parse_args()
        if verifyToken(args.token):
            return {"message" : "worked"}, 201
        else:
            return {"message" : "Token invalid"}, 404

api.add_resource(SignIn, "/signin")
api.add_resource(SignUp, "/signup")
api.add_resource(CheckToken, "/checkToken")


if __name__ == "__main__":
    app.run(debug=True)