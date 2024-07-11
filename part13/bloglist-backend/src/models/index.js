const Blog = require('./blog.model');
const User = require('./user.model');
const ReadingList = require('./readingList.model');
const Session = require('./session.model');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readingLists' });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
