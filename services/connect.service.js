const User = require("../models/user.model");

exports.sendConnectionRequest = async (senderId, receiverId) => {
  if (senderId === receiverId) {
    return res
      .status(400)
      .json({ message: "Cannot send request to yourself." });
  }

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!receiver) throw new Error("User not found.");

  if (
    sender.connections.includes(receiverId) ||
    sender.sentRequests.includes(receiverId) ||
    receiver.pendingRequests.includes(senderId)
  ) {
    throw new Error("Request already exists or already connected.");
  }

  sender.sentRequests.push(receiverId);
  receiver.pendingRequests.push(senderId);

  await sender.save();
  await receiver.save();

  return true;
};

exports.acceptConnectionRequest = async (receiverId, senderId) => {
  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!sender) throw new Error("User not found.");

  const isPending = receiver.pendingRequests.includes(senderId);
  if (!isPending) throw new Error("No such pending request.");

  // Remove from pending/sent
  receiver.pendingRequests = receiver.pendingRequests.filter(
    (id) => !id.equals(senderId)
  );
  sender.sentRequests = sender.sentRequests.filter(
    (id) => !id.equals(receiverId)
  );

  // Add to connections
  receiver.connections.push(senderId);
  sender.connections.push(receiverId);

  await receiver.save();
  await sender.save();

  return true;
};

exports.declineConnectionRequest = async (receiverId, senderId) => {
  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!sender) throw new Error("User not found.");

  // Remove from pending/sent
  receiver.pendingRequests = receiver.pendingRequests.filter(
    (id) => !id.equals(senderId)
  );
  sender.sentRequests = sender.sentRequests.filter(
    (id) => !id.equals(receiverId)
  );

  await receiver.save();
  await sender.save();

  return true;
};

exports.disconnect = async (receiverId, senderId) => {
  try {
    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    receiver.connections = receiver.connections.filter(
      (id) => !id.equals(senderId)
    );

    sender.connections = sender.connections.filter(
      (id) => !id.equals(receiverId)
    );

    await receiver.save();
    await sender.save();

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
