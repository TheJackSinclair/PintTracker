## Introduction

This is a next JS application. Typescript is in use and the chosen database solution is firebase

## How It Works UI

Next JS handles routing. Each page has its own folder within /app, within this folder we have an page.tsx which is the
page itself.
To ensure common conventions we also have a components folder which is used to store all of our re-usable components.

All styling is handled by tailwind.

## How It Works Backend

Previously the application had a Flask backend and all user data was stored within a JSON.
Now all data is stored with in a Firebase.

One of the best parts of firebase is that it's an unstructured database, this means any user can have any data but all
be within the same table.
Due to this we must also be careful if not updating/editing the wrong user data.

e.g. If we had a firstName field everywhere and you updated FirstName then firebase would create a new field called
FirstName.

Within app/firebase we have firebase-config. This file contains all our information for connecting to our database.

Its two exported members are:

    Auth ( This checks if a user is logged in and is used within functions in firebaseUtils and AuthProvider.tsx )


    DB  ( This is our actual database connection, we call db when we want to edit or retrieve any data )

What is AuthProvider? AuthProvider is used with layout.tsx this means it wraps every page in the application.
Its purpose is to check if a user is logged in when a page loads and if they are to pass this data to them.
It also passes a loading boolean which prevents the premature loading of a page if the data isn't fetched yet

## Typescript Information

We have 3 main types declared:

1. User, this is our type for user data
2. PintEntry, this is our type for a beer a user has drunk
3. BeerData, this is the type for our csv of beers used in our suggestive search