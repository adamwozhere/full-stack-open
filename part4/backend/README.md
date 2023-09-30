# Notes after reviewing solution

- Have not used destructuring where it would be better
- Have not used ternary operator where it would have been beneficial e.g. for 'likes':

```
const blog = new Blog({
  title, author, url,
  likes: likes ? likes : 0
})
```

- Error checking for blogsRouter.delete() could have been cleaner:

```
if (!user || blog.user.toString() !== user.id.toString()) {
  return response.status(401).json({ error: 'operation not permitted' })
}
```

- In blogs deletion I did not remove them from the User object:

```
user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )
```

- Could have just used one check for `password.length < 3` as that would cover there being no password too
- For list_helper functions, should have returned `undefined` instead of `null` for `blogs.length === 0` etc.
- Did not need to use `Array.from(blogs, (blog) => blog.likes).reduce(...)` for totalLikes
- For favoriteBlog could have used `.sort` then retuned index `[0]`
- Could have simplified `mostBlogs` by using `lodash groupBy function`:

```
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const blogsByAuthor = groupBy(blogs, (blog) => blog.author)

  const authorBlogs = Object.entries(blogsByAuthor).reduce((array, [author, blogList]) => {
    return array.concat({
      author,
      blogs: blogList.length
    })
  }, [])

  return authorBlogs.sort((e1, e2) => e2.blogs-e1.blogs)[0]
}
```

- Similar lodash function could have been used for mostLikes also
- `list_helper.test.js` should have had all the list tests in it with describe blocks instead of in separate files
- `blogs_api.test.js` should have had one outer `describe` block with a `beforeEach` inside to delete users and create a test user just based from `initialUsers[0]` and logging in with it rather than actually creating a user by posting it to `/api/users`:

```
beforeEach(async () => {
  await User.deleteMany({})

  // create a test user and save the corresponding auth header
  const user = initialUsers[0]
  await api.post('/api/users').send(user)
  const response = await api.post('/api/login').send(user)
  authHeader = `Bearer ${response.body.token}`
})
```

- Then after that have further nested describe blocks with beforeEach (if needed) and then tests after
- `test_helper.js` could have had simply had a users array to be used with the creating a test user as above: `const initialUsers = [{ username: 'tester', password: 'secret' }]`
- `userExtractor` middleware could have been better: `getTokenFrom` function (used by both `uerExtractor` and `tokenExtractor`), then check if token exists. If it does, then decode and handle the `token.id`

