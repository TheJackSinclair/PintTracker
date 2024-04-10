from flask import Flask, request, jsonify
from api import createAccount
import json
import beer_api
import accountFinder
import userAnalytics

app = Flask(__name__)


@app.route("/api/account/create", methods=["POST"])
def create():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Missing username, password'}), 400

        if accountFinder.user_exists(data["username"]):
            return jsonify({'error': 'username exists'}), 400

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


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
