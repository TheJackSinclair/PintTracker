

def pints_drank(user_pints) -> int:
    # returns the amount of total drank pints
    return len(user_pints)


def favourite_pint(user_pints) -> str:
    pint_counter = {}

    for key in user_pints.keys():
        # converts pint to dictionary
        pint = vars(user_pints[key])

        # gets the pints name
        pint_name = pint['name']

        # check the frequency of the pint name and adds it to the counter
        if pint_name in pint_counter:
            pint_counter[pint_name] += 1
        else:
            pint_counter[pint_name] = 1

    # returns the most consumed pint.
    return max(pint_counter, key=pint_counter.get)


def strongest_pint_in_pint_history(user_pints):
    # holds the strongest pints name and abv
    strongest_pint = {}
    # will be used as a entry point to check what pint is strongest.
    abv_value = 0

    for key in user_pints.keys():
        pint = vars(user_pints[key])

        if int(pint['abv']) > abv_value:
            strongest_pint = {'name': pint['name'], 'abv': pint['abv']}
            abv_value = int(pint['abv'])

    return strongest_pint


def get_analytics(user_profile):
    user_stats = {}

    user_pints = vars(user_profile.pint_history)

    user_stats['total_pints_drank'] = pints_drank(user_pints)

    user_stats['favourite_pint'] = favourite_pint(user_pints)

    user_stats['strongest_pint_drank'] = strongest_pint_in_pint_history(user_pints)

    return user_stats
