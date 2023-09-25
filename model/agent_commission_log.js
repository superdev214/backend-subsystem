const mongoose = require("mongoose");

const agent_commission_logSchema = new mongoose.Schema({
  agentId: { type: mongoose.Types.ObjectId, ref: "agent"},
  playerId:{ type: mongoose.Types.ObjectId, ref: "player"},
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
  sponsorId: { type: String },
  status: { type: Boolean },
  username: { type: String },
  walletBalance: { type: Number },
});

module.exports = mongoose.model("agent_commission_log", agent_commission_logSchema);
