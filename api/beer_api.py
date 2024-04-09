import json
import os

import pandas as pd
from unidecode import unidecode

# File path for global stats
global_stats_file = 'global_drank_stats.json'
directory = "stats"

def normalize(text):
    return unidecode(text.lower()).replace("'","")  # "normalizes" text by converting to lower case, removing accents, and ignoring apostrophes


def search_data(query):
    # Load the data
    data = pd.read_csv('beer_profile_and_ratings.csv')

    # Define the columns to search
    search_columns = ['Name', 'Beer Name (Full)', 'ABV', 'Style']

    query = normalize(query)  # Normalize the search query
    results = []
    for index, row in data.iterrows():
        for col in search_columns:
            value = normalize(str(row[col]))  # Normalize the data value
            if query in value:
                result = {col: row[col] for col in search_columns}
                results.append(result)
                break
    return results[:10]


def load_global_stats():
    if not os.path.exists(directory):
        os.makedirs(directory)
    if not os.path.exists(os.path.join(directory, global_stats_file)):
        return {}
    with open(os.path.join(directory, global_stats_file), 'r') as f:
        return json.load(f)


def save_global_pint_stats(stats):
    with open(os.path.join(directory, global_stats_file), 'w') as f:
        json.dump(stats, f, indent=4)


def increment_pint_stat(beer_name):
    stats = load_global_stats()
    if beer_name in stats:
        stats[beer_name] += 1
    else:
        stats[beer_name] = 1
    save_global_pint_stats(stats)