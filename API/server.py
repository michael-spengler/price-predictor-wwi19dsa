from flask import Flask
from flask_restx import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_cors import CORS, cross_origin
import sys
<<<<<<< HEAD



=======
#import functions from lib/functions.py
from pylib import functions
>>>>>>> develop

#Set API Settings
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///tmp/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "False"
db = SQLAlchemy(app)
CORS(app, support_credentials=True)
api = Api(app)

<<<<<<< HEAD

=======
#Set DataBase Setup
>>>>>>> develop
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
<<<<<<< HEAD

    def _repr_(self):
        return f"id : {id}, email : {email}, username : {username}, firstName : {firstName}, name : {name}, street : {street}, plz : {plz}, city : {city}, country : {country}, birtdate : {birtdate}"

resource_fields = {
    'id': fields.String,
    'username': fields.String,
    'email': fields.String,
    'lastname': fields.String,
    'firstName': fields.String,
    'street': fields.String,
    'zip': fields.Integer,
    'city': fields.String,
    'country': fields.String,
    'birtdate': fields.String
}

#db.drop_all()
#db.create_all()

#Args that need to be provided per request
user_signin_args = reqparse.RequestParser()
user_signin_args.add_argument("email", type=str, help="email missing", required=True)
user_signin_args.add_argument("password", type=str, help="password missing", required=True)

user_signup_args = reqparse.RequestParser()
user_signup_args.add_argument("username", type=str, help="username missing", required=True)
user_signup_args.add_argument("email", type=str, help="email missing", required=True)
user_signup_args.add_argument("password", type=str, help="password missing", required=True)
user_signup_args.add_argument("firstName", type=str, help="firstName missing", required=True)
user_signup_args.add_argument("lastName", type=str, help="lastName missing", required=True)
user_signup_args.add_argument("street", type=str, help="street missing", required=False)
user_signup_args.add_argument("zip", type=int, help="zip missing", required=False)
user_signup_args.add_argument("country", type=str, help="country missing", required=False)
user_signup_args.add_argument("birthdate", type=str, help="birthdate missing", required=False)


=======
    def _repr_(self):
        return f"id : {id}, email : {email}, username : {username}, firstName : {firstName}, name : {name}, street : {street}, plz : {plz}, city : {city}, country : {country}, birtdate : {birtdate}"
#In case of changes, the db needs to be reconfigured and the next commands need to be run (once!)
#db.drop_all()
#db.create_all()

#Set Resourcefields for Requestparser
SignUpFields = functions.loadSignUpFields(fields)
>>>>>>> develop

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
<<<<<<< HEAD
        args = user_signin_args.parse_args() #reading args from json
        args.email = args.email.lower()
=======
        args = functions.loadArgs(userSignInArgs)
>>>>>>> develop

        #Test Case
        if args.email == 'demo@test.de' and args.password == "Test1":
            token = functions.createToken(args.email)
            return {"message" : "Successfully authenticated"}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header
        #End of Test Case 
<<<<<<< HEAD

        result = UserModel.query.filter_by(email=args.email).first()
        if not result:
            abort(401, message="Email or Password incorrect")
        storedKey = result.password #loading stored Key
        if not matchingPassword(storedKey, args.password):
            abort(401, message="Email or Password incorrect")
        else:
            token = "Bearer " +  str(createToken(args.email))
            return {"message" : "Successfully authenticated"}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header

class SignUp(Resource):
    @cross_origin(supports_credentials=True)
    @marshal_with(resource_fields)
    @cross_origin(supports_credentials=True)
    def post(self):
        #load body
        args = user_signup_args.parse_args()
        args.email = args.email.lower()
        #check result
        result = UserModel.query.filter_by(email=args.email).first()
        if result:
            abort(409, message="Email is taken...")
        hashedPassword = createHashAndSalt(args.password)
        user = UserModel(email=args.email, password=hashedPassword, username=args.username, \
            firstName=args.firstName, lastName=args.lastName, country=args.country, zip=int(args.zip), street=args.street, birthdate=args.birthdate)
        db.session.add(user)
        db.session.commit()
        return user, 201

class CheckToken(Resource):
=======
        
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
>>>>>>> develop
    @cross_origin(supports_credentials=True)
    def post(self):
        args = functions.loadArgs(tokenVerifivationArgs)
        if functions.verifyToken(args.token):
            return {"message" : "worked"}, 201
        else:
            return {"message" : "Token invalid"}, 404






if __name__ == "__main__":
    hostip = sys.argv[1]
<<<<<<< HEAD
    debugmode = bool(sys.argv[2])
=======
    debugmode = sys.argv[2] == "True"
>>>>>>> develop
    app.run(debug=debugmode, host=hostip)
