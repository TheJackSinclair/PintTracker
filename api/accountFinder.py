import json
import os
from json import JSONDecodeError
from types import SimpleNamespace


def get_user(username):
    if user_exists(username):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        account_dir = os.path.join(current_dir, 'accounts', username + ".json")
        with open(account_dir, 'r') as file:
            try:
                return json.loads(file.read(), object_hook=lambda n: SimpleNamespace(**n))
            except JSONDecodeError:
                return "Json not correct format"
    else:
        return "User does not Exist"


def user_exists(username):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    account_dir = os.path.join(current_dir, 'accounts', username + ".json")
    return os.path.exists(account_dir)


def get_path(username):
    if user_exists(username):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        account_dir = os.path.join(current_dir, 'accounts', username + ".json")
        return account_dir
