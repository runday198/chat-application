import Api500Error from "../errors/Api500Error.js";
import Chat from "../models/chat.js";
import { validationResult } from "express-validator";

export async function getUser(req, res, next) {
  try {
    let chats = await req.user.getChats();

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
    });
  } catch (err) {
    let error = new Api500Error(err);
    next(error);
  }
}

export async function postCreateChat(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  var { name } = req.body;

  try {
    var chat = await Chat.create({
      name: name,
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
    var chat = await Chat.findByPk(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    var messages = await chat.getMessages({
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
