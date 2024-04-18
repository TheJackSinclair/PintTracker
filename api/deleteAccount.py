import os
import json
import toDict
import accountFinder as find


def delete_account(accountname):
    account = find.get_user(accountname)
    added_you = account.added_you
    if added_you:
        for user in added_you:
            entry = find.get_user(user)
            entry_path = find.get_path(user)
            entry.added.remove(accountname)
            if accountname in entry.added_you:
                entry.added_you.remove(accountname)
            with open(entry_path, 'w') as file:
                dict_entry = toDict.to_dict(entry)
                json.dump(dict_entry, file, indent=4)

    os.remove(find.get_path(accountname))

