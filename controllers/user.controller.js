const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.user.id);

  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const updated = await userService.updateUser({
    id: req.query.id,
    body: req.body,
  });
  res.status(200).json(updated);
};
