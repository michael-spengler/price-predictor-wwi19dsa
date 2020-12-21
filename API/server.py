from flask import Flask, request
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
    def data(self):
        return {"id" : self.id, "email" : self.email, "username" : self.username, "firstName" : self.firstName, "name" : self.name, "street" : self.street, "zip" : self.zip, "city" : self.city, "country" : self.country, "birtdate" : self.birtdate}

class BlogModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    def data(self):
        return {"id" : self.id, "author" : self.author, "date" : self.date, "title" : self.title, "content" : self.content}

#Set Resourcefields for Requestparser
SignUpFields = functions.loadSignUpFields(fields)
BlogFields = functions.loadBlogFields(fields)

##Args that need to be provided per HTTP Request[Post, Get, PUT, ...]
userSignInArgs = reqparse.RequestParser()
userSignInArgs = functions.loadSignInArgs(userSignInArgs)

userSignUpArgs = reqparse.RequestParser()
userSignUpArgs = functions.loadSignUpArgs(userSignUpArgs)

tokenVerifivationArgs = reqparse.RequestParser()
tokenVerifivationArgs = functions.loadTokenVerifivationArgs(tokenVerifivationArgs)

blogArgs = reqparse.RequestParser()
blogArgs = functions.loadBlogArgs(blogArgs)

#In case of changes, the db needs to be reconfigured
functions.updateDB(db, app)

@api.route("/signin")
@api.doc(params={"email": "", "password": ""})
class SignIn(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        args = functions.loadArgs(userSignInArgs)
         #Check if Email and Password are matching
        functions.abortIfEmailIsNotInDB(args, UserModel, abort, "Email or Password incorrect")
        functions.abortIfPasswordIncorrect(args, UserModel, abort, "Email or Password incorrect")
        #login successful
        username = functions.loadUsername(args, UserModel)
        token = functions.loadToken(args) 
        return {"message" : "Successfully authenticated", "username" : username}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header

        
@api.route("/signup")
@api.doc(params={"email": "", "password": "", "username":"", "lastName":"", "firstName":"", "country":"", "birthdate": "", "zip": "requires int!", "city": ""})
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
@api.doc(params={"token":"Bearer sometokenvalue"})
class VerifyToken(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        args = functions.loadArgs(tokenVerifivationArgs)
        if functions.verifyToken(args.token):
            return {"message" : "worked"}, 201
        else:
            return {"message" : "Token invalid"}, 404

@api.route("/blog")

class Blog(Resource):
    @api.doc(params={"content":"", "author":"", "title":"", "date":""})
    @marshal_with(BlogFields)
    def post(self):
        args = functions.loadArgs(blogArgs)
        if functions.verifyToken(request.headers.get("Authorization")):
            res = functions.createBlogEntry(args, BlogModel, db)
            return res, 201
        else:
            return {"message" : "Token not valid, please sign in"}, 201

    def get(self):
        res = functions.loadBlogEntries(BlogModel)
        return {"blog entries": res}, 200


if __name__ == "__main__":
    hostip = sys.argv[1]
    debugmode = sys.argv[2] == "True"
    app.run(debug=debugmode, host=hostip)
