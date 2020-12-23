class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.room = null;
  }

  joinRoom(roomName) {
    this.room = roomName;
  }

  leaveRoom(roomName) {
    this.room = null;
  }
}

module.exports = Player;
