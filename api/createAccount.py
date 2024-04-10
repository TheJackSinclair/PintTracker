import json
import os
from datetime import datetime

from api.Account import Account


def create_account(data):
    username = data["username"]
    password = data["password"]
    email = data["email"]
    account = Account(username, password, email, datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    added = []
    added_you = []

    directory = "api/accounts"
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, f"{account.username}.json"), "w") as f:
        json.dump(account.__dict__, f, indent=4)

    return "<p>Account created</p>"
