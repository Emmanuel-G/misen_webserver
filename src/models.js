const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameNumber: { type: Number, required: true },
  gameRounds: [{ type: Schema.Types.ObjectId, ref: "Round" }],
  gameDraw: { type: Schema.Types.ObjectId, ref: "Draw" },
  gamePlays: [{ type: Schema.Types.ObjectId, ref: "Play" }],
  gameBets: [{ type: Schema.Types.ObjectId, ref: "Bet" }],
  gameComplete: { type: Boolean },
});

const groupSchema = new Schema({
  groupName: { type: String, required: true },
  groupNodes: { type: Array, required: true },
  groupPlays: [{ type: Schema.Types.ObjectId, ref: "Play" }],
});

const playSchema = new Schema({
  playNumber: { type: Number, required: true },
  playGame: { type: Schema.Types.ObjectId, ref: "Game" },
  playGroup: { type: Schema.Types.ObjectId, ref: "Group" },
  playRound: { type: Schema.Types.ObjectId, ref: "Round" },
  playNumbers: { type: Array, required: true },
  playResults: { type: Array },
});

const roundSchema = new Schema({
  roundNumber: { type: Number, required: true },
  roundGame: { type: Schema.Types.ObjectId, ref: "Game" },
  roundRanks: { type: Array, required: true },
});

const drawSchema = new Schema({
  drawNumber: { type: Number, required: true },
  drawDate: { type: Date, required: true },
  drawResults: { type: Array, required: true },
  drawGame: { type: Schema.Types.ObjectId, ref: "Game" },
});

const betSchema = new Schema({
  betNumber: { type: Number, required: true },
  betGame: { type: Schema.Types.ObjectId, ref: "Game" },
  betRound: { type: Schema.Types.ObjectId, ref: "Round" },
  betGroup: { type: Schema.Types.ObjectId, ref: "Group" },
  betTickets: { type: Array, required: true },
  betCost: { type: Number },
});

const userSchema = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPassword: { type: String, required: true },
});

const Group = mongoose.model("Group", groupSchema);
const Game = mongoose.model("Game", gameSchema);
const Draw = mongoose.model("Draw", drawSchema);
const Play = mongoose.model("Play", playSchema);
const Round = mongoose.model("Round", roundSchema);
const User = mongoose.model("User", userSchema);
const Bet = mongoose.model("Bet", betSchema);

module.exports = { Group, Game, Draw, Play, Round, User, Bet };
