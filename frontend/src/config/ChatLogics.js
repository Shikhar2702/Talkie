export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender &&
    messages[i + 1].sender._id &&
    m.sender &&
    m.sender._id &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender &&
    messages[i].sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      (!messages[i + 1].sender ||
        !messages[i + 1].sender._id !== m.sender._id) &&
      m.sender &&
      m.sender._id &&
      messages[i].sender &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && m.sender && m.sender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender?._id !== m.sender?._id ||
      messages[i + 1].sender?._id === undefined) &&
    messages[i].sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i, userId) => {
  return (
    i > 0 &&
    m.sender &&
    m.sender._id &&
    messages[i - 1].sender &&
    messages[i - 1].sender._id === m.sender._id &&
    messages[i - 1].sender._id === userId
  );
};

export const getSender = (loggedUser, users) => {
  if (!users[0]) return "None";
  else if (!users[1]) return "Unknown";
  var result =
    users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  return result;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
