const notificationService = require("../services/notification.service");

exports.getPendingInvitesOfUser = async (req, res) => {
  try {
    const invites = await notificationService.getPendingInvitesOfUser(
      req.query.id
    );
    res.status(200).json(invites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
