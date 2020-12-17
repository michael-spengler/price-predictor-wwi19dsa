from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from functions import createHashAndSalt, matchingPassword, createToken, verifyToken
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_cors import CORS, cross_origin


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///tmp/database.db"
db = SQLAlchemy(app)
CORS(app, support_credentials=True)

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    street = db.Column(db.String, nullable=False)
    plz = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)

    def _repr_(self):
        return f"id : {id}, email : {email}, username : {username}, firstName : {firstName}, lastname : {lastname}, street : {street}, plz : {plz}, city : {city}, country : {country}"

resource_fields = {
    'id': fields.String,
    'username': fields.String,
    'email': fields.String,
    'lastname': fields.String,
    'firstName': fields.String,
    'street': fields.String,
    'plz': fields.Integer,
    'city': fields.String,
    'country': fields.String,
}

#db.drop_all()
#db.create_all()

#Args that need to be provided per request
user_signin_args = reqparse.RequestParser()
user_signin_args.add_argument("email", type=str, help="email missing", required=True)
user_signin_args.add_argument("password", type=str, help="password missing", required=True)

user_signup_args = reqparse.RequestParser()
user_signup_args.add_argument("email", type=str, help="email missing", required=True)
user_signup_args.add_argument("username", type=str, help="username missing", required=True)
user_signup_args.add_argument("lastname", type=str, help="lastname missing", required=True)
user_signup_args.add_argument("password", type=str, help="password missing", required=True)


user_args = reqparse.RequestParser()
user_args.add_argument("token", type=str, help="token missing", required=True)



class SignIn(Resource):
    @cross_origin(supports_credentials=True)
    def post(self):
        args = user_signin_args.parse_args() #reading args from json
	args.email= args.email.lower()
        result = UserModel.query.filter_by(email=args.email).first()

        #Test Case
        if args.email == 'demo@test.de' and args.password == "Test1":
            token = "Bearer " +  str(createToken(args.email))
            return {"message" : "Successfully authenticated"}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header
        #End of Test Case 

        if not result:
            abort(401, message="Email or Password incorrect")
        storedKey = result.password #loading stored Key
        if not matchingPassword(storedKey, args.password):
            abort(401, message="Email or Password incorrect")
        else:
            token = "Bearer " +  str(createToken(args.email))
            return {"message" : "Successfully authenticated"}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},  #body, status, header

class SignUp(Resource):

    @marshal_with(resource_fields)
    @cross_origin(supports_credentials=True)
    def post(self):
        args = user_signup_args.parse_args()
	args.email= args.email.lower()
        result = UserModel.query.filter_by(email=args.email).first()
        if result:
            abort(409, message="Email is taken...")
        hashedPassword = createHashAndSalt(args.password)
        print(str(hashedPassword))
        user = UserModel(email=args.email, password=hashedPassword, username=args.username, name=args.name)
        db.session.add(user)
        db.session.commit()
        return user, 201

class CheckToken(Resource):
    @cross_origin(supports_credentials=True)
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
    app.run(debug=True, host="0.0.0.0")
