class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.room = null;
    this.spectrum = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
  }

  joinRoom(roomName) {
    this.room = roomName;
  }

  leaveRoom(roomName) {
    this.room = null;
  }
}

module.exports = Player;
