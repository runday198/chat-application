import sequelize from "../util/database.js";
import Sequelize from "sequelize";

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  sender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Message;
