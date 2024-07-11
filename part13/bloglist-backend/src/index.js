const app = require('./app.js');
const db = require('./utils/db');
const { PORT } = require('./utils/config');

const start = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
