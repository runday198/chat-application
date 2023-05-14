import Api500Error from "../errors/Api500Error";

export function getUser(req, res, next) {
  try {
    if (req.user) {
      return res.status(200).json({ user: req.user });
    } else {
      throw new Api500Error("Internal Error when getting user");
    }
  } catch (err) {
    next(err);
  }
}
