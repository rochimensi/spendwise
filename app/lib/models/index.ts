import sequelize from '@/app/lib/sequelize';
import Transaction from '@/app/lib/models/Transaction';

const models = {
  Transaction,
};

export { sequelize, Transaction };
export default models;


