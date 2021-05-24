const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  gameNo: { type: Number },
  drawDate: { type: String },
  drawResults: { type: Array },
  gameRanks: { type: Object },
  gameGroups: { type: Array },
  gameStaged: { type: Boolean, default: false },
  gameCompleted: { type: Boolean, default: false },
  gamePlayed: { type: Boolean, default: false },
  gameTickets: { type: Array },
  winNumbers: { type: Array },
  winGroups: { type: Array },
});

const Games = mongoose.model("GameSchema", gameSchema);

module.exports = { Games };
