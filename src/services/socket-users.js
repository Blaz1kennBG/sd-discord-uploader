let users = [];

module.exports = {
  addUser: (id, value) => {
    users.push({
      id,
      ...value,
    });
    return users;
  },
  resetUsers: () => {
    users = [];
    return users;
  },
  removeUser: (id) => {
    const userIndex = users.findIndex((x) => x.id === id);
    users.splice(userIndex, 1);
    return users;
  },
  removeUserBySocketId: (socketId) => {
    const userIndex = users.findIndex((x) => x.socket.id === socketId);
    const username = users[userIndex].username;
    users.splice(userIndex, 1);
    return username;
  },
  getUsers: () => {
    return users;
  },
};
