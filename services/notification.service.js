const User = require("../models/user.model");

exports.getPendingInvitesOfUser = async (id) => {
  try {
    // get user from db
    const user = await User.findById(id);

    // get all the users present in pendingRequest array of user
    return await User.find({ _id: { $in: user.pendingRequests } });
  } catch (error) {
    throw new Error("Failed to get pending invites");
  }
};
