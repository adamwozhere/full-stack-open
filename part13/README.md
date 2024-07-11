# Part 13

Note: files created on WSL and copied to main repo on windows

## Notes from solution

- Should have put relationship in `/models/index.js` although it seemed to work as-is

```
User.hasMany(Session)
Session.belongsTo(User)
```

- Did not seem to use any try/catch on the route controllers

- Should have grouped `login` and `logout` controllers in a `session` controller instead

- All middleware functions were put in one `util/middelware.js` file (only 2 middleware functions)

- Error handler function just caught Sequelize errors: `SequelizeValidationError` and `SequelizeDatabaseError`

- The session/token/user etc. was handled with just one middleware `userFromToken`:

  - Gets token string from auth header
  - Finds the `Session` by the token and includes the `User` model
  - Checks if `session` exists and errors accordingly
  - Checks if `session.user.disabled` and errors accordingly
  - Then finally sets `req.user = session.user`
  - Although file imports `jwt`, it does not seem to verify the token (presumably as when logging in, token is created and stored in session table so it is already valid - however this does not protect against an exired token in the session table)

- Did not have any migration to seed the database - need to read up on doing this as it's something tht should only be done for development
