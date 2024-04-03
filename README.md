## Introduction

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Pint Tracker Documentation