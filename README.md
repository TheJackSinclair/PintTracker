## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Pint Tracker Documentation

We have 2 main directories:
    
/api: this contains all of our backend code
    
/app: this contains all of our frontend code

To run the project you can do

Backend:
    
    npm run flask-dev
Frontend:

    npm run next-dev
Both:

    npm run dev

---

### Index.py
This python script is responsible for routing all api calls that come to the backend.

Using flask we route our api calls with the following line of code for each page
that requires this info/data.

`@app.route(rule="call_address", methods=["HTTPS REQUEST"])`

A more clear example would be:
```python
from flask import Flask

app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
```
When the application calls the route "/api/python" it will return a paragrahp element
and display that content to the page.

Now we can move onto methods within the file:

#### search_beer
This function is takes an input "query" and passes it through to our beer database and returns the data
as a json object to the frontend.
```python
# routes to correct address and provides the queried beer name.
@app.route("/api/beer/search/<query>")
def search_beer(query):
    # Stores the searched beer from the query into a results variable.
    results = beer_api.search_data(query)
    # Which then returns this data a json object for frontend to display.
    return json.dumps({"search_results": results}, indent=4)
```
#### create
This function is responsible for creating user accounts. A POST request will send a JSON object to this
function and it will start to convert this data to an appropriate object for us to store and use.
```python
# routes to the correct address and sends a POST to create an account with supplied
# JSON object.
@app.route("/api/account/create", methods=["POST"])
def create():
    # allows us to try this code block and deal with any errors that may arise.
    try:
        # grabs the JSON object supplied from POST
        data = request.get_json()
        # checks to see if that JSON object exists, or if it contains a username or a password.
        # if not it will then return the error message and status.
        if not data or 'username' not in data or 'password' not in data:
            # jsonify is a function provided with flask that returns JSON data
            # with correct response headers and content type. 
            return jsonify({'error': 'Missing username, password'}), 400

        # checks to see if the username is already taken,
        # it will return an error message and status indicator
        if accountFinder.user_exists(data["username"]):
            return jsonify({'error': 'Username exists'}), 401

        # passes the JSON object to our create account method
        # and returns a status indicator showing success
        createAccount.create_account(data)
        return jsonify({'message': 'Account created successfully'}), 201
    
    # catches and deals with any internal server issues that may have happened during
    # the POST of data.
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500
```

#### return_user_analytics
Requires a username to gather the stats about the users drinking history.
A get request is made to gather the information about these analytics
and will be sent back to frontend display.
```python
# routes the url towards the functionality required.
@app.route("/api/analytics/<username>", methods=["GET"])
def return_user_analytics(username):
    # searches for the user from our account JSON's
    # and stores them into a user object.
    user = accountFinder.get_user(username)
    # passes the user towards the analytical analysis function
    # it will return the users stats in JSON object notation
    user_stats = userAnalytics.get_analytics(user)
    # passes the data back to front-end display
    return json.dumps({'user_statistics': user_stats}, indent=4)

```

#### pints_per_day_last_week
Requires the username same as the analytical stats above, get request is made
in order to find out the users pints per day.
```python
# routes the url towards required functionality
@app.route("/api/analytics/last_week/<username>")
def pints_per_day_last_week(username):
    # sends the username to analytical analysis file
    # and calls the pints per day function this then
    # returns JSON object contains data
    pints_per_day = userAnalytics.pints_per_day_last_week(username)
    # sends data towards frontend.
    return pints_per_day
```

#### login
Takes in the clients username and password and attempts to sign them into their account. if successful it will generate
a jwt token to authenticate the user each time they access another page.
```python
@app.route("/api/account/login", methods=["POST"])
def login():
    # grabs the JSON object from post
    data = request.get_json()
    # stores the username into a username variable.
    username = data["username"]
    # stores the password from data into password variable.
    password = data["password"]
    # holds account directory path.
    directory = "api/accounts"
    # if the directory doesn't exist
    if not os.path.exists(directory):
        # it will then create this directory
        os.makedirs(directory)
    #     checks to see if the username exists
    if accountFinder.user_exists(username):
        # if it does will will then search for that user
        account = accountFinder.get_user(username)
        # and if the user password matches POST password
        if account.password == password:
            # then it will generate a JWT access token
            access_token = create_access_token(identity=account.username)
            # and returns the account information as well as session token
            # which signs the user into the application.
            return jsonify(access_token=access_token)
    else:
        # otherwise it will return the user has inputed
        # either the wrong name or password.
        return "<p>Wrong username or password</p>"
```

#### add_friend
Function checks the user jwt token and authenticates that is them. It takes in a friends username
and will add them to the users account if the friend exists with the database. produces a message
if user was added successfully
```python
# routes the URL to the correct functionality and checks that user
# has the required session token to verify login.
@app.route("/api/friends/add/<friend_name>", methods=["POST"])
@jwt_required()
def add_friend(friend_name):
    # decrypts the users token and returns the user account
    # to current_user variable.
    current_user = get_jwt_identity()
    # stores the message for either added user or
    # user doesn't <exist> 
    add = Account.add_friend(current_user, friend_name)
    # returns the status message.
    return add
```

#### remove_friend
Same as the add friend method the only difference being that it will remove the users friend from their friend
list and will produce a status message as such.
```python
# routes the URL to the correct functionality and checks that user
# has the required session token to verify login.
@app.route("/api/friends/remove/<friend_name>", methods=["POST"])
@jwt_required()
def remove_friend(friend_name):
    # decrypts the users token and returns the user account
    # to current_user variable.
    current_user = get_jwt_identity()
    # removes the friend from the users account.
    Account.remove_friend(current_user, friend_name)
    # returns a status message showing user has been removed.
    return "removed"
```

#### protected
Used for test purposes it will take the users token and will as result display you what user is
currently signed in.
```python
@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    # decrypts the users token and returns the user account
    # to current_user variable.
    current_user = get_jwt_identity()
    # returns "logged_in_as" as a json key and 
    # the value as the username of the user logged in.
    return jsonify(logged_in_as=current_user), 200
```

---