class Room {
  constructor(name, master) {
    this.name = name;
    this.masterID = master.id;
    this.players = {};
    this.players[master.id] = master;
    master.joinRoom(name);
    this.size = 1;
    this.gameInProgress = false;
  }

  addPlayer(player) {
    this.players[player.id] = player;
    this.size += 1;
    player.joinRoom(this.name);
  }

  removePlayer(player) {
    this.size -= 1;
    player.leaveRoom();
    delete this.players[player.id];
    if (player.id === this.masterID) {
      this.masterID = (this.size > 0) ? Object.keys(this.players)[0] : null;
    }
  }

  startGame() {
    this.gameInProgress = true;
  }

  stopGame() {
    this.gameInProgress = false;
  }
}

module.exports = Room;
