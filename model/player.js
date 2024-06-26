const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "member_id"},
  playerId:{ type: mongoose.Schema.Types.ObjectId, ref: "member_id"},
  sponsorId:{ type: mongoose.Schema.Types.ObjectId, ref: "agent"},
  commsPercent: { type: Number },
  country: { type: String },
  currency: { type: String },
  datetime: { type: Date },
  email: { type: String, unique: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  maxAllowedBet: { type: Number },
  mobileNumber: { type: Number },
  password: { type: String },
  status: { type: Boolean },
  username: { type: String },
  walletBalance: { type: Number },
});

module.exports = mongoose.model("player", playerSchema);
