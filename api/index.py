from flask import Flask, request
import json
import os
from datetime import datetime

app = Flask(__name__)


class Account:
    def __init__(self, username, password, email, member_since):
        self.username = username
        self.password = password
        self.email = email
        self.member_since = member_since
        self.added = []
        self.added_you = []

    def add_user(self, username):
        #needs name verification (if user_exists)

        self.added.append(username)
        #their user 'added_you' needs updated

    def been_added(self, username):
        self.added_you.append(username)


@app.route("/api/account/create", methods=["POST"])
def create_account():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    email = data["email"]
    account = Account(username, password, email, datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    directory = "api/accounts"
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, f"{account.username}.json"), "w") as f:
        json.dump(account.__dict__, f, indent=4)

    return "<p>Account created</p>"


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
