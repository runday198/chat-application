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

  socket.on("add-member", addMember);

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

      let chatUser = await ChatUser.findOne({
        where: { userId: user.id, chatId: chat.id },
      });

      chatUser.seen = true;

      let newMessage = await Message.create({
        message: message,
        userId: user.id,
        chatId: chat.id,
        sender: user.username,
      });

      chat.lastMessage = message;
      chat.sender = user.username;

      await chat.save();
      await chatUser.save();

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

      let chatWithUser = await Chat.findOne({
        where: { id: chat.id },
        include: [
          {
            model: User,
            as: "users",
            through: ChatUser,
            where: { id: user.id },
          },
        ],
      });

      let chatWithContact = await Chat.findOne({
        where: { id: chat.id },
        include: [
          {
            model: User,
            as: "users",
            through: ChatUser,
            where: { id: contact.id },
          },
        ],
      });

      // Add both sockets to the room
      socket.join("chat:" + chat.id);
      if (contact.status) {
        io.in(contact.socketId).socketsJoin("chat:" + chat.id);
        io.to(contact.socketId).emit("request", { chat: chatWithContact });
      }

      socket.emit("add-contact", { chat: chatWithUser, contact: contact });
    } catch (err) {
      console.log(err);
    }
  }

  async function addMember(data) {
    var { userId, chatId } = data;

    try {
      let user = await User.findByPk(socket.user.id);
      let contact = await User.findByPk(userId);
      let chat = await user.getChats({
        where: { id: chatId },
        include: [{ model: User, as: "users" }],
      });
      chat = chat[0];

      await contact.addChat(chat, {
        through: { hasAccepted: false, isAdmin: false, seen: false },
      });

      let contactChat = await contact.getChats({
        where: { id: chatId },
        include: [{ model: User, as: "users" }],
      });
      contactChat = contactChat[0];

      if (contact.status) {
        io.in(contact.socketId).socketsJoin("chat:" + chat.id);
        io.to(contact.socketId).emit("request", { chat: contactChat });
      }

      socket.emit("add-member", { chat: chat, contact: contact });
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
