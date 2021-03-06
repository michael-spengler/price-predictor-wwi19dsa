from flask import Flask, request
from flask_restx import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
import uuid
from flask_cors import CORS, cross_origin

import sys
import json
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
    user_id = db.Column(db.Integer, primary_key=True)
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
    join_date = db.Column(db.String, nullable=True) 
    follower = db.Column(db.String, nullable=True)
    following = db.Column(db.String, nullable=True)
    posts = db.Column(db.String, nullable=True)
    trades = db.Column(db.String, nullable=True)
    correct_trades = db.Column(db.String, nullable=True)
    wrong_trades = db.Column(db.String, nullable=True)
    links = db.Column(db.String, nullable=True)
    portfolio = db.Column(db.String, nullable=True)

    def data(self):
        return {"user_id" : self.user_id, "email" : self.email, "username" : self.username, "firstName" : self.firstName, "lastName": self.lastName, "street" : self.street, "zip" : self.zip, "city" : self.city, "country" : self.country, "birthdate" : self.birthdate, "join_date": self.join_date, "follower": json.loads(self.follower), "following": json.loads(self.following), "posts":self.posts, "trades":self.trades, "correct_trades" : json.loads(self.correct_trades), "wrong_trades": json.loads(self.wrong_trades), "links":self.links, "portfolio": json.loads(self.portfolio)}
    def addFollower(self, someuser):
        follower = json.loads(self.follower)
        if someuser not in follower:
            follower.append(someuser)
            self.follower = json.dumps(follower)
    def delFollower(self, someuser):
        follower = json.loads(self.follower)
        if someuser in follower:
            follower.remove(someuser)
            self.follower = json.dumps(follower)
            return True
        else:
            return False
    def addFollowing(self, someuser):
        following = json.loads(self.following)
        if someuser not in following:
            following.append(someuser)
            self.following = json.dumps(following)
    def delFollowing(self, someuser):
        following = json.loads(self.following)
        if someuser in following:
            following.remove(someuser)
            self.following = json.dumps(following)
            return True
        else:
            return False

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
    fiatcurrency    = db.Column(db.String, nullable=False)
    cryptocurrency  = db.Column(db.String, nullable=False)
    startdate       = db.Column(db.String, nullable=False)
    enddate         = db.Column(db.String, nullable=False)
    expectedIncrease= db.Column(db.String, nullable=False)
    motivation      = db.Column(db.String, nullable=False)
    description     = db.Column(db.String, nullable=False)
    def data(self):
        return {"id":self.id, "author":self.author, "date":self.date, "type":self.type, "percent":self.percent, "fiatcurrency":self.fiatcurrency, "cryptocurrency":self.cryptocurrency, "startdate":self.startdate, "enddate":self.enddate, "expectedIncrease":self.expectedIncrease, "motivation":self.motivation, "description":self.description}
    
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
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

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
    @api.doc(params={"type":"", "percent":"", "fiatcurrency":"", "cryptocurrency":"", "motivation":"", "startdate":"", "enddate":"", "expectedIncrease":"", "description":""})
    def post(self):
        args = f.loadArgs(tradeArgs)
        token = request.headers.get("Authorization")
        return f.createTradeEntry(args, TradeModel, db, token, UserModel)

@api.route("/trades")
class Trade(Resource):
    def get(self):
        return f.loadTradeEntries(TradeModel)

@api.route("/trades/<string:tradeAuthor>")
class Blogauthor(Resource):
    def get(self, tradeAuthor):
        return f.loadTradeEntriesByAuthor(TradeModel, tradeAuthor)

@api.route("/trades/<int:tradeID>")
class Blogauthor(Resource):
    def get(self, tradeID):
        return f.loadTradeEntriesByID(TradeModel, tradeID)

@api.route("/users")
class Blogauthor(Resource):
    def get(self):
        return f.loadUsers(UserModel)

@api.route("/user/<string:username>")
class Blogauthor(Resource):
    def get(self, username):
        try:
            token = request.headers.get("Authorization")
            requestor = f.getUsernameFromToken(token, UserModel)
        except:
            requestor = " "
        return f.loadUserByUsername(UserModel, username, requestor, TradeModel, BlogModel)

@api.route("/user/<string:username>/follow")
class Blogauthor(Resource):
    @api.doc(description="valid Token needs to be provided in the header")
    def get(self, username):
        token = request.headers.get("Authorization")
        if token is None:
            abort(400, "False token")
        requestor = f.getUsernameFromToken(token, UserModel)
        return f.follow(UserModel, username, requestor, db)

@api.route("/user/<string:username>/unfollow")
class Blogauthor(Resource):
    @api.doc(description="valid Token needs to be provided in the header")
    def get(self, username):
        token = request.headers.get("Authorization")
        if token is None:
            abort(400, "False token")
        requestor = f.getUsernameFromToken(token, UserModel)
        return f.unfollow(UserModel, username, requestor, db)

@api.route("/getCurrencies")
class getCurrencies(Resource):
    def get(self):
        return f.getCurrencies()

if __name__ == "__main__":
    #with app.app_context():
    #    if db.engine.url.drivername == 'sqlite':
    #        migrate.init_app(app, db, render_as_batch=True)
    #    else:
    #        migrate.init_app(app, db)
    #manager.run()
    # run server.py db init, migrate, upgrade
    hostip = sys.argv[1]
    debugmode = sys.argv[2] == "True"
    app.run(debug=debugmode, host=hostip)
