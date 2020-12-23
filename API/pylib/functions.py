def createHashAndSalt(password):
    import os
    import hashlib
    #Generation of Salt and Hash-Key
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

    # Store them as:
    StorageKey = salt + key
    return StorageKey
    # Getting the values back out
    #salt_from_storage = StorageKey[:32] # 32 is the length of the salt
    #key_from_storage = StorageKey[32:]

def matchingPassword(StorageKey, password):
    import hashlib

    salt = (StorageKey[:32]) # Get the salt you stored for *this* user
    key = StorageKey[32:] # Get this users key calculated

    password_to_check = password # The password provided by the user to check

    # Use the exact same setup you used to generate the key, but this time put in the password to check
    new_key = hashlib.pbkdf2_hmac('sha256', password_to_check.encode('utf-8'), salt, 100000)

    if new_key == key:
        return True
    else:
        return False

def secretKey():
    f = open("lib/secret_key.bin", 'rb')
    secret = f.read()
    f.close()
    return secret

def createToken(email):
    import jwt
    import datetime
    #Reading Secret Key
    secret = secretKey()
    bearer = "Bearer "
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'sub': email
        }
        return bearer + str(jwt.encode(payload, secret, algorithm='HS256'), 'utf-8')
    except Exception as e:
        return e

def verifyToken(auth_token):
    import jwt
    from flask_restx import abort
    #removing "Bearer " from token
    auth_token = auth_token[7:]
    #Reading Secret Key
    secret = secretKey()
    #decoding Token
    try:
        payload = jwt.decode(auth_token, secret)
        return True
    except jwt.ExpiredSignatureError:
        abort(404, message="Token expired")
        return False

    except jwt.InvalidTokenError:
        abort(404, message="Token invalid")
        return False
    
def loadArgs(Args):
    args = Args.parse_args()
    try:
        args.email = args.email.lower()
    except:
        pass
    return args

def abortIfEmailIsInDB(args, UserModel, abort, abortMessage):
    result = UserModel.query.filter_by(email=args.email).first()
    if result:
        abort(409, message=abortMessage)

def abortIfEmailIsNotInDB(args, UserModel, abort, abortMessage):
    result = UserModel.query.filter_by(email=args.email).first()
    if not result:
        abort(409, message=abortMessage)

def abortIfPasswordIncorrect(args, UserModel, abort, abortMessage):
    result = UserModel.query.filter_by(email=args.email).first()
    storedKey = result.password #loading stored Key
    if not matchingPassword(storedKey, args.password):
        abort(401, message=abortMessage)

def loadSignInArgs(userSignInArgs):
    userSignInArgs.add_argument("email", type=str, help="email missing", required=True)
    userSignInArgs.add_argument("password", type=str, help="password missing", required=True)
    return userSignInArgs

def loadSignUpArgs(userSignUpArgs):
    userSignUpArgs.add_argument("username", type=str, help="username missing", required=True)
    userSignUpArgs.add_argument("email", type=str, help="email missing", required=True)
    userSignUpArgs.add_argument("password", type=str, help="password missing", required=True)
    userSignUpArgs.add_argument("firstName", type=str, help="firstName missing", required=True)
    userSignUpArgs.add_argument("lastName", type=str, help="lastName missing", required=True)
    userSignUpArgs.add_argument("street", type=str, help="street missing", required=False)
    userSignUpArgs.add_argument("zip", type=int, help="zip missing", required=False)
    userSignUpArgs.add_argument("country", type=str, help="country missing", required=False)
    userSignUpArgs.add_argument("birthdate", type=str, help="birthdate missing", required=False)
    userSignUpArgs.add_argument("city", type=str, help="birthdate missing", required=False)
    return userSignUpArgs

def loadTokenVerifivationArgs(tokenVerifivationArgs):
    tokenVerifivationArgs.add_argument("token", type=str, help="token missing", required=True)
    return tokenVerifivationArgs

def loadSignUpFields(fields):
    return {
    'id': fields.String,
    'username': fields.String,
	'email': fields.String,
    'name': fields.String,
    'firstName': fields.String,
    'street': fields.String,
    'zip': fields.Integer,
    'city': fields.String,
    'country': fields.String,
    'birtdate': fields.String
    }

def loadBlogFields(fields):
    return {
        'id' : fields.String,
        'author' : fields.String,
        'title' : fields.String,
        'date' : fields.String,
        'content' : fields.String
    }

def createUser(args, UserModel, db):
    hashedPassword = createHashAndSalt(args.password)
    user = UserModel(email=args.email, password=hashedPassword, username=args.username, \
        firstName=args.firstName, lastName=args.lastName, country=args.country, zip=int(args.zip), street=args.street, birthdate=args.birthdate, city=args.city)
    db.session.add(user)
    db.session.commit()
    return user

def updateDB(db, app):
    import os.path
    if os.path.exists("/home/ubuntu"):
        print("if")
        if os.path.isfile('/home/ubuntu/database.db'):
            app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////home/ubuntu/database.db"	
        else:
            app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////home/ubuntu/database.db"
            db.create_all()
            print ("DB File created")
    elif os.path.isfile("tmp/database.db"):
        pass
    else:
        os.mkdir("tmp")
        db.create_all()

def createBlogEntry(args, BlogModel, db):
    blog = BlogModel(author=args.author, date=args.date, title=args.title, content=args.content)
    db.session.add(blog)
    db.session.commit()
    return blog

def loadToken(args):
    return createToken(args.email)

def loadUsername(args, UserModel):
    result = UserModel.query.filter_by(email=args.email).first()
    return result.username

def loadBlogArgs(BlogArgs):
    BlogArgs.add_argument("author", type=str, help="author missing", required=True)
    BlogArgs.add_argument("content", type=str, help="content missing", required=True)
    BlogArgs.add_argument("date", type=str, help="date missing", required=True)
    BlogArgs.add_argument("title", type=str, help="title missing", required=True)
    BlogArgs.add_argument("id", type=str, help="ID missing", required=False)
    return BlogArgs

def loadBlogEntries(BlogModel):
    result = BlogModel.query.all()
    entries = {}
    for blog in result:
        entries[int(blog.id)]=blog.data()
    return entries
