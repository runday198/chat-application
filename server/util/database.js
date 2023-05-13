import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.SEQUELIZE_SCHEMA,
  process.env.SEQUELIZE_USERNAME,
  process.env.SEQUELIZE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

export default sequelize;
