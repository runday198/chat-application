import Api500Error from "../errors/Api500Error.js";
import Chat from "../models/chat.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import { Op } from "sequelize";

export async function getUser(req, res, next) {
  try {
    let chats = await req.user.getChats({
      order: [["updatedAt", "DESC"]],
      include: [{ model: User, as: "users", attributes: ["id", "username"] }],
    });

    return res.status(200).json({
      chats,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        status: req.user.status,
        exposure: req.user.exposure,
        inviteToken: req.user.inviteToken,
      },
      success: true,
    });
  } catch (err) {
    let error = new Api500Error(err);
    next(error);
  }
}

export async function postCreateChat(req, res, next) {
  var errors = validationResult(req);
  var { isGroupChat } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  var { name } = req.body;

  try {
    var chat = await Chat.create({
      name: name,
      isGroupChat: isGroupChat,
    });

    await chat.addUser(req.user, {
      through: { isAdmin: true, hasAccepted: true },
    });

    return res.status(201).json({ chat: chat });
  } catch (err) {
    next(err);
  }
}

export async function postMessages(req, res, next) {
  var { chatId } = req.body;

  try {
    let chat = await Chat.findByPk(chatId);

    let chatUser = await chat.getUsers({ where: { id: req.user.id } });
    chatUser = chatUser[0];
    chatUser.chatUser.seen = true;
    await chatUser.chatUser.save();

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    let messages = await chat.getMessages({
      order: [["createdAt", "ASC"]],
      // include: [
      //   {
      //     model: req.user,
      //     as: "sender",
      //     attributes: ["id", "username"],
      //   },
      // ],
    });

    return res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
}

export async function postUsers(req, res, next) {
  var { searchTerm, mode } = req.body;

  try {
    if (mode === "username") {
      var users = await User.findAll({
        where: {
          username: {
            [Op.and]: [
              { [Op.ne]: req.user.username },
              { [Op.substring]: searchTerm },
            ],
          },
          exposure: true,
        },
        attributes: ["id", "username"],
      });
    } else if (mode === "token") {
      var users = await User.findAll({
        where: {
          inviteToken: searchTerm,
        },
        attributes: ["id", "username"],
      });
    }

    return res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
}
