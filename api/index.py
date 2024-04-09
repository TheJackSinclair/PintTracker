from flask import Flask, request
from api import beer_api, createAccount
import json

app = Flask(__name__)


@app.route("/api/account/create", methods=["POST"])
def create():
    data = request.get_json()
    createAccount.create_account(data)


@app.route("/api/beer/search/<query>")
def search_beer(query):
    results = beer_api.search_data(query)
    return json.dumps({"search_results": results}, indent=4)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
