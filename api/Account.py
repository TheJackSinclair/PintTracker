import json
from types import SimpleNamespace
from api import accountFinder, toDict
from api.Pint import Pint


def add_friend(username, friend_name):
    if accountFinder.user_exists(friend_name):
        user_dict = accountFinder.get_user(username)
        friend_dict = accountFinder.get_user(friend_name)

        if friend_name in user_dict.added:
            return "already added"

        user_dict.added.append(friend_name)
        if username not in friend_dict.added:
            friend_dict.added_you.append(username)

        user_path = accountFinder.get_path(username)
        friend_path = accountFinder.get_path(friend_name)

        to_write = [
            {"path": user_path, "dict": user_dict},
            {"path": friend_path, "dict": friend_dict}
        ]

        for entry in to_write:
            with open(entry['path'], 'w') as file:
                dict_entry = toDict.to_dict(entry['dict'])
                json.dump(dict_entry, file, indent=4)

    else:
        return f"User {friend_name} does not exist"

    return "added"


def remove_friend(username, friend_name):
    if accountFinder.user_exists(friend_name):
        user_dict = accountFinder.get_user(username)
        friend_dict = accountFinder.get_user(friend_name)

        user_dict.added.remove(friend_name)
        friend_dict.added_you.remove(username)

        user_path = accountFinder.get_path(username)
        friend_path = accountFinder.get_path(friend_name)

        to_write = [
            {"path": user_path, "dict": user_dict},
            {"path": friend_path, "dict": friend_dict}
        ]

        for entry in to_write:
            with open(entry['path'], 'w') as file:
                dict_entry = toDict.to_dict(entry['dict'])
                json.dump(dict_entry, file, indent=4)

    else:
        return f"User {friend_name} does not exist"


def get_friend_list(username):
    return accountFinder.get_user(username).added


class Account:
    def __init__(self, username, password, member_since):
        self.username = username
        self.password = password
        self.member_since = member_since
        self.added = []
        self.added_you = []
        self.pint_history = {}

    def add_pint(self, data, timestamp):
        pint = json.loads(data, object_hook=lambda n: SimpleNamespace(**n))
        name = pint.name
        beer_name_full = pint.beer_name_full
        avb = pint.abv
        style = pint.style
        pint_obj = Pint(name, beer_name_full, avb, style)
        self.pint_history[timestamp] = vars(pint_obj)
