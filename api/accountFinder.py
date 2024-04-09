import json
import os
from types import SimpleNamespace

def get_user(username):
    if user_exists(username):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        account_dir = os.path.join(current_dir, 'accounts', username+".json")
        with open(account_dir, 'r') as file:
            return json.loads(file.read(), object_hook=lambda n: SimpleNamespace(**n))
    else:
        return "User does not Exist"


def user_exists(username):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    account_dir = os.path.join(current_dir, 'accounts', username+".json")
    return os.path.exists(account_dir)