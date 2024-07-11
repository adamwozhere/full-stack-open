const Sequelize = require('sequelize');
const { DATABASE_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL);

const connect = async () => {
  console.log('connecting to:', DATABASE_URL);
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }

  return null;
};

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = {
  connect,
  sequelize,
  rollbackMigration,
};
