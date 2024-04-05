from dataclasses import dataclass

from flask import Flask, request
import json
import os
from datetime import datetime

app = Flask(__name__)

@dataclass
class Account:
    def __init__(self, username, password, email, time_of_request):
        self.username = username
        self.password = password
        self.email = email
        self.time_of_request = time_of_request


@app.route("/api/account/create", methods=["POST"])
def create_account():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    email = data["email"]
    account = Account(username, password, email, datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    with open(os.path.join("api/accounts", f"{account.username}.json"), "w") as f:
        json.dump(account.__dict__, f, indent=4)
    return "<p>Account created</p>"



@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"
