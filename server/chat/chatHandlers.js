import User from "../models/user.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";

function registerChatHandlers(io, socket) {
  socket.on("hello", (data) => {
    console.log(data);
  });

  socket.on("exposure", setExposure);

  socket.on("message", (data) => {
    console.log(data);
  });

  async function setExposure(data) {
    try {
      let user = await User.findByPk(socket.user.id);

      user.exposure = data.exposure;
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }

  async function createMessage(data) {
    var { message, chatId } = data;

    try {
      let user = await User.findByPk(socket.user.id);
      let chat = await Chat.findByPk(chatId);

      let newMessage = await Message.create({
        message: message,
        userId: user.id,
        chatId: chat.id,
        sender: user.username,
      });

      io.to("chat:" + chat.id).emit("message", newMessage);
    } catch (err) {
      console.log(err);
    }
  }
}

export default registerChatHandlers;
