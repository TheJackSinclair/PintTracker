import pandas as pd
from unidecode import unidecode

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
