import json
from types import SimpleNamespace
from api import accountFinder, toDict
from api.Pint import Pint


class Account:
    def __init__(self, username, password, email, member_since):
        self.username = username
        self.password = password
        self.email = email
        self.member_since = member_since
        self.added = []
        self.added_you = []
        self.pint_history = {}

    def add_user(self, username):
        if accountFinder.user_exists(username):
            self.added.append(username)
            friend = accountFinder.get_user(username)
            friend.added_you.append(self.username)
            friend_path = accountFinder.get_path(username)
            with open(friend_path, 'w') as file:
                dict_entry = toDict.to_dict(friend)
                json.dump(dict_entry, file, indent=4)

    def add_pint(self, data, timestamp):
        pint = json.loads(data, object_hook=lambda n: SimpleNamespace(**n))
        name = pint.name
        beer_name_full = pint.beer_name_full
        avb = pint.abv
        style = pint.style
        pint_obj = Pint(name, beer_name_full, avb, style)
        self.pint_history[timestamp] = vars(pint_obj)
