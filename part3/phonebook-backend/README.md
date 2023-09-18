# Part 3 b. Deplying app to internet - Exercises 3.9 - 3.11

This project is deployed to Render
[https://full-stack-open-phonebook-679p.onrender.com/](https://full-stack-open-phonebook-679p.onrender.com/)

## Notes

Full stack open docs suggest using a separate repo for this project when using Render, however Render does have support for monorepos so I have kept this project `phonebook-backend` in `part3` of the repo.

Although this is the `backend` project, the frontend is served from `/dist` and `index.js` handles the routing between the frontend and api.

Build command `npm run deploy:full` is configured to build `part2/phonebook`, copy the `dist` folder to `part3/phonebook-backend`, commit and push. (note that documentation mentions `build` folder but Vite produces a dist folder instead)

Local dev for both the `part3/phonebook-backend` and `part2/phonebook` work together. It is no longer needed, but if trying to use the json-server in the frontend, it will not work unless you change the server proxy in vite connfig to `http://localhost:3001/api`

