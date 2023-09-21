# Part 3 b. Deplying app to internet - Exercises 3.9 - 3.11

This project is deployed to Render
[https://full-stack-open-phonebook-679p.onrender.com/](https://full-stack-open-phonebook-679p.onrender.com/)

## Notes

Full stack open docs suggest using a separate repo for this project when using Render, however Render does have support for monorepos so I have kept this project `phonebook-backend` in `part3` of the repo.

Although this is the `backend` project, the frontend is served from `/dist` and `index.js` handles the routing between the frontend and api.

Build command `npm run deploy:full` is configured to build `part2/phonebook`, copy the `dist` folder to `part3/phonebook-backend`, commit and push. (note that documentation mentions `build` folder but Vite produces a dist folder instead)

Local dev for both the `part3/phonebook-backend` and `part2/phonebook` work together. It is no longer needed, but if trying to use the json-server in the frontend, it will not work unless you change the server proxy in vite connfig to `http://localhost:3001/api`

## Exercise 3.12

Setup mongo db on MongoAtlas, created node commandline app to create and list phonebook entries from MongoAtlas

## Exercises 3.13 - 3.14

Dev server for backend and frontend using MongoDB Atlas for fetching and posting persons

## Exercises 3.15 - 3.18

Moved error handling to it's own middleware, ensured deleting works, PUT works and the /info works
Ensured everything works through the frontend also

## Exercises 3.18 - 3.21

Added validation for name to be at least 3 characters, and display the error message on the frontend. Note: having a blank phone number does not trigger an error from the front end, as backend errors on name or number being undefined, whereas the frontend will submit an object `{ name: "Your Name", number: "" }`.

Added custom validation for phone number: must be at least 8 characters (means I don't have to worry about passing `number: ""` anymore), and regex for 2 or 3 numbers, a dash, followed by numbers.
