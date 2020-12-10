from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from functions import createHashAndSalt, matchingPassword, createToken, verifyToken
from flask_sqlalchemy import SQLAlchemy
import uuid


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///tmp/database.db"
db = SQLAlchemy(app)

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # id = db.Column('id', db.Text(length=36), default=lambda: str(uuid.uuid4()), primary_key=True, nullable=False)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    street = db.Column(db.String, nullable=False)
    plz = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String, nullable=False)
    country = db.Column(db.String, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)

    def __repr__(self):
        return f"id : {id}, email : {email}, username : {username}, firstName : {firstName}, name : {name}, street : {street}, plz : {plz}, city : {city}, country : {country}"

resource_fields = {
	'email': fields.String,
    'id': fields.String,
    'username': fields.String,
    'name': fields.String,
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
user_signup_args.add_argument("name", type=str, help="name missing", required=True)
user_signup_args.add_argument("password", type=str, help="password missing", required=True)


user_args = reqparse.RequestParser()
user_args.add_argument("token", type=str, help="token missing", required=True)



class SignIn(Resource):
    def post(self):
        args = user_signin_args.parse_args() #reading args from json
        result = UserModel.query.filter_by(email=args.email).first()
        if not result:
            abort(404, message="Email not registered...")
        storedKey = result.password #loading stored Key
        if not matchingPassword(storedKey, args.password):
            abort(404, message="Password incorrect")
        else:
            #resp = flask.make_response()
            token = createToken(args.email)
            #resp.headers["bearer"] = str(token)
            #print(resp)
            return {"message" : "Successfully authenticated"}, 201, {"token" : str(token)} #body, status, header

class SignUp(Resource):

    @marshal_with(resource_fields)
    def post(self):
        args = user_signup_args.parse_args()
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