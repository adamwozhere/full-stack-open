// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return Array.from(blogs, (blog) => blog.likes).reduce(
    (total, current) => total + current,
    0,
  );
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = blogs.reduce((favourite, current) =>
    current.likes > favourite.likes ? current : favourite,
  );

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const totals = blogs.reduce((acc, curr) => {
    if (acc[curr.author]) {
      acc[curr.author].blogs += 1;
    } else {
      acc[curr.author] = { author: curr.author, blogs: 1 };
    }
    return acc;
  }, []);

  return Object.values(totals).reduce((acc, curr) => {
    return acc.blogs > curr.blogs ? acc : curr;
  });
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const totals = blogs.reduce((acc, curr) => {
    if (acc[curr.author]) {
      acc[curr.author].likes += curr.likes;
    } else {
      acc[curr.author] = { author: curr.author, likes: curr.likes };
    }
    return acc;
  }, []);

  return Object.values(totals).reduce((acc, curr) => {
    return acc.likes > curr.likes ? acc : curr;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
