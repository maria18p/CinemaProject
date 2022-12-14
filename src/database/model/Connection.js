import Sequelize from 'sequelize';

const sequelize = new Sequelize('cinema', 'root', 'maria1234', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false,
});
export default sequelize;
