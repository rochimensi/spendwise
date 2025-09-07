import pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: false,
    freezeTableName: true,
  },
});

export async function testConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

export async function closeConnection(): Promise<void> {
  await sequelize.close();
}

export default sequelize;


