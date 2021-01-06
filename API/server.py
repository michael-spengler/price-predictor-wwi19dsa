from flask import Flask, request
from flask_restx import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_cors import CORS, cross_origin

import sys
#import f from lib/f.py
from pylib import functions as f

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
    zip = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    country = db.Column(db.String, nullable=True)
    password = db.Column(db.LargeBinary, nullable=False)
    birthdate = db.Column(db.String, nullable=False)
    def data(self):
        return {"id" : self.id, "email" : self.email, "username" : self.username, "firstName" : self.firstName, "lastName": self.lastName, "street" : self.street, "zip" : self.zip, "city" : self.city, "country" : self.country, "birthdate" : self.birthdate}

class BlogModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    def data(self):
        return {"id" : self.id, "author" : self.author, "date" : self.date, "title" : self.title, "content" : self.content}

class TradeModel(db.Model):
    id              = db.Column(db.Integer, primary_key=True)
    author          = db.Column(db.String, nullable=False)
    date            = db.Column(db.String, nullable=False)
    type            = db.Column(db.String, nullable=False)
    percent         = db.Column(db.String, nullable=False)
    fiat            = db.Column(db.String, nullable=False)
    motivation      = db.Column(db.String, nullable=False)
    startdate       = db.Column(db.String, nullable=False)
    enddate         = db.Column(db.String, nullable=False)
    expectedIncrease= db.Column(db.String, nullable=False)
    description     = db.Column(db.String, nullable=False)
    def data(self):
        return {"id":self.id, "author":self.author, "date":self.date, "type":self.type, "percent":self.percent, "fiat":self.fiat, "motivation":self.motivation, "startdate":self.startdate, "enddate":self.enddate, "expectedIncrease":self.expectedIncrease, "description":self.description}
    

#Set Resourcefields for Requestparser
SignUpFields = f.loadSignUpFields(fields)
BlogFields = f.loadBlogFields(fields)

##Args that need to be provided per HTTP Request[Post, Get, PUT, ...]
userSignInArgs = reqparse.RequestParser()
userSignInArgs = f.loadSignInArgs(userSignInArgs)

userSignUpArgs = reqparse.RequestParser()
userSignUpArgs = f.loadSignUpArgs(userSignUpArgs)

tokenVerifivationArgs = reqparse.RequestParser()
tokenVerifivationArgs = f.loadTokenVerifivationArgs(tokenVerifivationArgs)

blogArgs = reqparse.RequestParser()
blogArgs = f.loadBlogArgs(blogArgs)

tradeArgs = reqparse.RequestParser()
tradeArgs = f.loadTradeArgs(tradeArgs)

#In case of changes, the db needs to be reconfigured
f.updateDB(db, app)

@api.route("/signin")
class SignIn(Resource):
    @api.doc(params={"email": "", "password": ""})
    @cross_origin(supports_credentials=True)
    def post(self):
        args = f.loadArgs(userSignInArgs)
        return f.signIn(args, UserModel, abort)

@api.route("/signup")
class SignUp(Resource):
    @api.doc(params={"email": "", "password": "", "username":"", "lastName":"", "firstName":"", "country":"", "birthdate": "", "street":"", "zip": "", "city": ""}, description="No authentication needed")
    @cross_origin(supports_credentials=True)
    @marshal_with(SignUpFields)
    def post(self):
        args = f.loadArgs(userSignUpArgs)
        return f.createUser(args, UserModel, db, abort)

@api.route("/verify-token")
class VerifyToken(Resource):
    @api.doc(params={"token":"example: \"Bearer sometokenvalue\""})
    @cross_origin(supports_credentials=True)
    def post(self):
        args = f.loadArgs(tokenVerifivationArgs)
        if f.verifyToken(args.token):
            return {"message" : "worked"}, 201
        else:
            return {"message" : "Token invalid"}, 404

@api.route("/blog")
class Blog(Resource):
    @api.doc(params={"content":"", "title":"", "date":""}, description="valid Token needs to be provided in the header")
    @marshal_with(BlogFields)
    def post(self):
        args = f.loadArgs(blogArgs)
        token = request.headers.get("Authorization")
        return f.createBlogEntry(args, BlogModel, db, token, UserModel)

    def get(self):
        return f.loadBlogEntries(BlogModel)

@api.route("/blog/<int:blogID>")
class BlogID(Resource):
    def get(self, blogID):
        return f.loadBlogEntryByID(BlogModel, blogID, abort)

@api.route("/blog/<string:blogAuthor>")
class Blogauthor(Resource):
    def get(self, blogAuthor):
        return f.loadBlogEntriesByAuthor(BlogModel, blogAuthor)

@api.route("/trade")
class Trade(Resource):
    @api.doc(params={"type":"", "percent":"", "fiat":"", "motivation":"", "startdate":"", "enddate":"", "expectedIncrease":"", "description":""}, description="No authentication needed")
    def post(self):
        args = f.loadArgs(tradeArgs)
        token = request.headers.get("Authorization")
        return f.createTradeEntry(args, TradeModel, db, token, UserModel)

    def get(self):
        return f.loadTradeEntries(TradeModel)

@api.route("/trade/<string:tradeAuthor>")
class Blogauthor(Resource):
    def get(self, tradeAuthor):
        return f.loadTradeEntriesByAuthor(TradeModel, tradeAuthor)


if __name__ == "__main__":
    hostip = sys.argv[1]
    debugmode = sys.argv[2] == "True"
    app.run(debug=debugmode, host=hostip)
