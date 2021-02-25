#Token shit
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
    if auth_token is None:
        abort(404, message="No token provided in Header")
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

def getUsernameFromToken(auth_token, UserModel):
    import jwt
    #removing "Bearer " from token
    auth_token = auth_token[7:]
    #Reading Secret Key
    secret = secretKey()
    #decoding Token
    payload = jwt.decode(auth_token, secret)
    email = payload["sub"]
    result = UserModel.query.filter_by(email=email).first()
    return result.username

def loadToken(args):
    return createToken(args.email)

def signIn(args, UserModel, abort):
    #Check if Email and Password are matching
    abortIfEmailIsNotInDB(args, UserModel, abort, "Email or Password incorrect")
    abortIfPasswordIncorrect(args, UserModel, abort, "Email or Password incorrect")
    #login successful
    username = loadUsername(args, UserModel)
    token = loadToken(args) 
    return {"message" : "Successfully authenticated", "username" : username}, 201, {"Authorization" :  token, "Access-Control-Expose-Headers": "Authorization"},    #body, status, header

#loading setting shit
def loadArgs(Args):
    args = Args.parse_args()
    try:
        args.email = args.email.lower()
    except:
        pass
    return args

#loading Args & fields shit
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
    userSignUpArgs.add_argument("zip", type=str, help="zip missing", required=False)
    userSignUpArgs.add_argument("country", type=str, help="country missing", required=False)
    userSignUpArgs.add_argument("birthdate", type=str, help="birthdate missing", required=False)
    userSignUpArgs.add_argument("city", type=str, help="birthdate missing", required=False)
    return userSignUpArgs

def loadTradeArgs(tradeArgs):
    tradeArgs.add_argument("type", type=str, help="type missing", required=True)
    tradeArgs.add_argument("percent", type=str, help="percentage missing", required=True)
    tradeArgs.add_argument("fiatcurrency", type=str, help="fiat missing", required=True)
    tradeArgs.add_argument("cryptocurrency", type=str, help="fiat missing", required=True)
    tradeArgs.add_argument("motivation", type=str, help="motivation missing", required=True)
    tradeArgs.add_argument("startdate", type=str, help="startdate missing", required=True)
    tradeArgs.add_argument("enddate", type=str, help="enddate missing", required=True)
    tradeArgs.add_argument("expectedIncrease", type=str, help="expectedIncrease missing", required=True)
    tradeArgs.add_argument("description", type=str, help="description missing", required=True)
    tradeArgs.add_argument("author", type=str, help="author missing", required=False)
    return tradeArgs

def loadTokenVerifivationArgs(tokenVerifivationArgs):
    tokenVerifivationArgs.add_argument("token", type=str, help="token missing", required=True)
    return tokenVerifivationArgs

def loadSignUpFields(fields):
    return {
    'id': fields.String,
    'username': fields.String,
	'email': fields.String,
    'lastName': fields.String,
    'firstName': fields.String,
    'street': fields.String,
    'zip': fields.String,
    'city': fields.String,
    'country': fields.String,
    'birthdate': fields.String
    }

def loadBlogFields(fields):
    return {
        'id' : fields.String,
        'author' : fields.String,
        'title' : fields.String,
        'date' : fields.String,
        'content' : fields.String
    }

def loadBlogArgs(BlogArgs):
    BlogArgs.add_argument("author", type=str, help="author missing", required=False)
    BlogArgs.add_argument("content", type=str, help="content missing", required=True)
    BlogArgs.add_argument("date", type=str, help="date missing", required=False)
    BlogArgs.add_argument("title", type=str, help="title missing", required=True)
    BlogArgs.add_argument("id", type=str, help="ID missing", required=False)
    return BlogArgs

#abort shit
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

#db shit

def loadUsers(UserModel):
    users = UserModel.query.all()
    res = []
    for user in users:
        res.append(user.username)
    return {"data":res}, 201

def loadUsername(args, UserModel):
    result = UserModel.query.filter_by(email=args.email).first()
    return result.username

def createUser(args, UserModel, db, abort):
    import datetime
    import json
    abortIfEmailIsInDB(args, UserModel, abort, "Email is already registered...")
    hashedPassword = createHashAndSalt(args.password)
    args.password = hashedPassword
    args.join_date = str(datetime.datetime.today())
    args.follower = json.dumps([])
    args.following = json.dumps([])
    args.correct_trades = json.dumps([])
    args.wrong_trades = json.dumps([])
    args.links = json.dumps([])
    args.portfolio = json.dumps([])
    user = UserModel(**args)
    db.session.add(user)
    db.session.commit()
    return user, 201

def updateDB(db, app):
    import os.path
    if os.path.exists("/home/ubuntu"):
        if os.path.isfile('/home/ubuntu/database.db'):
            app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////home/ubuntu/database.db"	
            db.create_all()
        else:
            app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////home/ubuntu/database.db"
            db.create_all()
            print ("DB File created")
    elif os.path.isfile("tmp/database.db"):
        db.create_all()
    else:
        os.mkdir("tmp")
        db.create_all()

def createBlogEntry(args, BlogModel, db, token, UserModel):
    import datetime
    if verifyToken(token):
            #set date and author by token (fake naming impossible)
            args.author = getUsernameFromToken(token, UserModel)
            args.date=str(datetime.datetime.today())
            #create Blog entry
            blog = BlogModel(**args)
            db.session.add(blog)
            db.session.commit()
            return blog.data(), 201
    else:
        return {"message" : "Token not valid, please sign in"}, 201

def loadBlogEntries(BlogModel):
    result = BlogModel.query.all()
    entries = []
    for blog in result:
        if len(blog.content) > 150:
            blog.content=blog.content[:150] + "..."
        entries.append(blog.data())       
    return {"data": entries}, 200
    
def loadBlogEntryByID(BlogModel, blogID, abort):
    result = BlogModel.query.filter_by(id=blogID).first()
    if result is None:
        abort(404, message="ID not found")
    else:
        return {"data": result.data()}, 200

def loadBlogEntriesByAuthor(BlogModel, blogAuthor):
    try:
        result = BlogModel.query.filter_by(author=blogAuthor).all()
        entries = []
        for blog in result:
            entries.append(blog.data())
    except:
        entries = []
    return {"data": entries}, 200

def createTradeEntry(args, TradeModel, db, token, UserModel):
    import datetime
    if verifyToken(token):
        #set date and author by token (fake naming impossible)
        args.date = str(datetime.datetime.today())
        args.author = getUsernameFromToken(token, UserModel)
        print(args)
        trade = TradeModel(**args)
        db.session.add(trade)
        db.session.commit()
        return trade.data(), 201
    else:
        return {"message" : "Token not valid, please sign in"}, 201

def loadTradeEntries(TradeModel):
    result = TradeModel.query.all()
    entries = []
    for trade in result:
        data = trade.data()
        del data["motivation"]
        del data["description"]
        entries.append(data)       
    return {"data": entries}, 200

def loadTradeEntriesByAuthor(TradeModel, tradeAuthor):
    try:
        result = TradeModel.query.filter_by(author=tradeAuthor).all()
        entries = []
        for entry in result:
            entries.append(entry.data())
    except:
        entries = []
    return {"data": entries}, 200

def loadTradeEntriesByID(TradeModel, tradeID):
    result = TradeModel.query.filter_by(id=tradeID).first()
    return {"data": result.data()}, 200

def loadUserByUsername(UserModel, username, requestor, TradeModel, BlogModel):
    user = UserModel.query.filter_by(username=username).first()
    result = user.data()
    if requestor in result["follower"]:
        result["follows"] = True
    else:
        result["follows"] = False
    result["follower"] = len(result["follower"])
    result["following"] = len(result["following"])
    result["trades"] = len(loadTradeEntriesByAuthor(TradeModel, username)[0]["data"])
    result["posts"] = len(loadBlogEntriesByAuthor(BlogModel, username)[0]["data"])
    result["portfolio"] = [["BTC", 32100], ["ETH", 4200],["USD", 2300],["EUR", 5012.123]]
    return {"data" : result}, 201

def follow(UserModel, Username, requestor, db):
    follower = UserModel.query.filter_by(username=requestor).first()
    follower.addFollowing(Username)
    following = UserModel.query.filter_by(username = Username).first()
    following.addFollower(requestor)
    db.session.commit()
    return 201

def unfollow(UserModel, Username, requestor, db):
    follower = UserModel.query.filter_by(username=requestor).first()
    follower.delFollowing(Username)
    following = UserModel.query.filter_by(username = Username).first()
    following.delFollower(requestor)
    db.session.commit()
    return 201

def getCurrencies():
    crypto = ["Ethereum (ETH)", "Litecoin (LTC)", "Cardano (ADA)", "Polkadot (DOT)", "Bitcoin Cash (BCH)", "Stellar (XLM)", "Chainlink", "Binance Coin (BNB)", "Tether (USDT)", "Ripple (XRP)", "Bitcoin (BTC)", "Tether (USDT)"]
    fiat = ["Japanese Yen (JPY)", "U.S. Dollar (USD)", "Korean won (KRW)", "Euro (EUR)", "Australian Dollar (AUD)", "Canadian Dollar (CAD)", "Chinese Yuan Renminbi (CNY)", "Pound Sterling (GBP)"]
    return {"data": {"Crypto":crypto, "Fiat":fiat}}, 200