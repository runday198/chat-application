import User from "../models/user.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import ChatUser from "../models/chatUser.js";

function registerChatHandlers(io, socket) {
  socket.on("hello", (data) => {
    console.log(socket.id);
  });

  socket.on("exposure", setExposure);

  socket.on("message", createMessage);

  socket.on("add-contact", addContact);

  socket.on("accept-request", acceptRequest);

  socket.on("make-admin", makeAdmin);

  socket.on("disconnect", disconnect);

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

      chat.lastMessage = message;
      chat.sender = user.username;
      await chat.save();

      socket.broadcast.to("chat:" + chat.id).emit("message", {
        message: newMessage,
        chatId: chat.id,
      });
    } catch (err) {
      console.log(err);
      // TODO: send back error to the client
    }
  }

  async function addContact(data) {
    var { userId } = data;

    try {
      let user = await User.findByPk(socket.user.id);
      let contact = await User.findByPk(userId);
      let chat = await Chat.create({
        name: contact.username,
        lastMessage: "",
        sender: "",
        isGroupChat: false,
      });

      await user.addChat(chat, {
        through: { hasAccepted: true, isAdmin: true, seen: true },
      });
      await contact.addChat(chat, {
        through: { hasAccepted: false, isAdmin: true, seen: false },
      });

      // Add both sockets to the room
      socket.join("chat:" + chat.id);
      if (contact.status) {
        io.connected[contact.socketId].join("chat:" + chat.id);
      }

      socket.emit("add-contact", { chat: chat, contact: contact });
    } catch (err) {
      console.log(err);
    }
  }

  async function acceptRequest(data) {
    var { chatId } = data;

    try {
      let userChat = await ChatUser.findOne({
        where: {
          userId: socket.user.id,
          chatId: chatId,
        },
      });

      userChat.hasAccepted = true;
      await userChat.save();
    } catch (err) {
      console.log(err);
    }
  }

  async function makeAdmin(data) {
    var { chatId, userId } = data;

    try {
      let chat = await Chat.findByPk(chatId, {
        include: {
          model: User,
          as: "users",
          through: { where: { userId: userId } },
        },
      });
      let chatUser = chat.users[0];

      chatUser.chatUser.isAdmin = true;

      await chatUser.chatUser.save();
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    var user = await User.findByPk(socket.user.id);
    user.status = false;
    await user.save();
  }
}

export default registerChatHandlers;
