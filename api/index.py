from flask import Flask, request
from api import beer_api, createAccount
import json
import beer_api
import accountFinder
import userAnalytics

app = Flask(__name__)


@app.route("/api/account/create", methods=["POST"])
def create():
    data = request.get_json()
    createAccount.create_account(data)


@app.route("/api/beer/search/<query>")
def search_beer(query):
    results = beer_api.search_data(query)
    return json.dumps({"search_results": results}, indent=4)


@app.route("/api/analytics/<username>", methods=["GET"])
def return_user_analytics(username):
    user = accountFinder.get_user(username)
    user_stats = userAnalytics.get_analytics(user)

    return json.dumps({'user_statistics': user_stats}, indent=4)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
