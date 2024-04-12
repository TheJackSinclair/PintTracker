import os
from datetime import timedelta

from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

from api import createAccount
import json
import beer_api
import accountFinder
import userAnalytics

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=31)

jwt = JWTManager(app)


@app.route("/api/account/create", methods=["POST"])
def create():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Missing username, password'}), 400

        if accountFinder.user_exists(data["username"]):
            return jsonify({'error': 'Username exists'}), 401

        createAccount.create_account(data)
        return jsonify({'message': 'Account created successfully'}), 201
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route("/api/beer/search/<query>")
def search_beer(query):
    results = beer_api.search_data(query)
    return json.dumps({"search_results": results}, indent=4)


@app.route("/api/analytics/<username>", methods=["GET"])
def return_user_analytics(username):
    user = accountFinder.get_user(username)
    user_stats = userAnalytics.get_analytics(user)

    return json.dumps({'user_statistics': user_stats}, indent=4)


@app.route("/api/analytics/last_week/<username>")
def pints_per_day_last_week(username):
    pints_per_day = userAnalytics.pints_per_day_last_week(username)
    return pints_per_day


@app.route("/api/account/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    directory = "api/accounts"
    if not os.path.exists(directory):
        os.makedirs(directory)
    if accountFinder.user_exists(username):
        account = accountFinder.get_user(username)
        if account.password == password:
            access_token = create_access_token(identity=account.username)
            return jsonify(access_token=access_token)
    else:
        return "<p>Wrong username or password</p>"


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
