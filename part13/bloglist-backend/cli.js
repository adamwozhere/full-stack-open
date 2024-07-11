const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:secret@localhost:5432/postgres'
);

const main = async () => {
  try {
    await sequelize.authenticate();
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    });

    blogs.forEach((blog) => {
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
};

main();
