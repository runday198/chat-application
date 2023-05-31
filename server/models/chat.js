import sequelize from "../util/database.js";
import Sequelize from "sequelize";

const Chat = sequelize.define("chat", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastMessage: Sequelize.STRING,
  sender: Sequelize.STRING,
  isGroupChat: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Chat;
