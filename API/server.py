from flask import Flask
from flask_restx import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_cors import CORS, cross_origin

import sys
#import functions from lib/functions.py
from pylib import functions

#Set API Settings
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///tmp/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "False"
db = SQLAlchemy(app)
CORS(app, support_credentials=True)
api = Api(app)

#Set DataBase Setup
class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    street = db.Column(db.String, nullable=True)
    zip = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String, nullable=True)
    country = db.Column(db.String, nullable=True)
    password = db.Column(db.LargeBinary, nullable=False)
    birthdate = db.Column(db.String, nullable=False)
    def _repr_(self):
        return f"id : {id}, email : {email}, username : {username}, firstName : {firstName}, name : {name}, street : {street}, plz : {plz}, city : {city}, country : {country}, birtdate : {birtdate}"
#In case of changes, the db needs to be reconfigured and the next commands need to be run (once!)
#db.drop_all()
#db.create_all()

#Set Resourcefields for Requestparser
SignUpFields = functions.loadSignUpFields(fields)

##Args that need to be provided per HTTP Request[Post, Get, PUT, ...]
userSignInArgs = reqparse.RequestParser()
userSignInArgs = functions.loadSignInArgs(userSignInArgs)

userSignUpArgs = reqparse.RequestParser()
userSignUpArgs = functions.loadSignUpArgs(userSignUpArgs)

tokenVerifivationArgs = reqparse.RequestParser()
tokenVerifivationArgs = functions.loadtokenVerifivationArgs(tokenVerifivationArgs)


@api.route("/signin")
@api.doc(params={"email": "", "password": ""})
class SignIn(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        args = functions.loadArgs(userSignInArgs)

        #Test Case
        if args.email == 'demo@test.de' and args.password == "Test1":
            token = functions.createToken(args.email)
            return {"message" : "Successfully authenticated"}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header
        #End of Test Case 
        
        #Check if Email and Password are matching
        functions.abortIfEmailIsNotInDB(args, UserModel, abort, "Email or Password incorrect")
        functions.abortIfPasswordIncorrect(args, UserModel, abort, "Email or Password incorrect")
        #login successful
        return functions.returnToken(args)    
        
@api.route("/signup")
@api.doc(params={"email": "", "password": "", "username":"", "lastName":"", "firstName":"", "country":"", "birthdate": "t", "zip": ""})
class SignUp(Resource):
    @cross_origin(supports_credentials=True)
    @marshal_with(SignUpFields)
    def post(self):
        args = functions.loadArgs(userSignUpArgs)
        #check if Email already registered
        functions.abortIfEmailIsInDB(args, UserModel, abort, "Email is already registered...")
        #add User to DB    
        res = functions.createUser(args, UserModel, db)
        return res, 201

@api.route("/verify-token")
@api.doc(params={"token":""})
class VerifyToken(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        args = functions.loadArgs(tokenVerifivationArgs)
        if functions.verifyToken(args.token):
            return {"message" : "worked"}, 201
        else:
            return {"message" : "Token invalid"}, 404






if __name__ == "__main__":
    hostip = sys.argv[1]
    debugmode = sys.argv[2] == "True"
    app.run(debug=debugmode, host=hostip)
