import axios from 'axios';

export const getBlogs = () =>
  axios.get('http://localhost:3003/api/blogs').then((res) => res.data);

export const createBlog = (blog) =>
  axios.post('http://localhost:3003/api/blogs', blog).then((res) => res.data);
