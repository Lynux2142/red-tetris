class Room {
  constructor(name, master) {
    this.name = name;
    this.masterID = master.id;
    this.players = {};
    this.players[master.id] = master;
    master.joinRoom(name);
  }

  addPlayer(player) {
    this.players[player.id] = player;
    player.joinRoom(this.name);
  }

  removePlayer(player) {
    player.leaveRoom();
    delete this.players[player.id];
  }
}

export default Room;
