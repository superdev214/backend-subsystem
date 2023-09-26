const mongoose = require("mongoose");

const master_agent_commission_logSchema = new mongoose.Schema({
  masterAgentId: { type: mongoose.Types.ObjectId, ref: "master_agent" },
  playerId: { type: mongoose.Types.ObjectId, ref: "player" },
  playerUsername: { type: mongoose.Types.ObjectId, ref: "player" },
  bet: { type: String },
  betAmount: { type: Number },
  betOutCome: { type: String },
  commsPercent: { type: Number },
  commissionAmount: { type: Number },
  remarks: { type: String },
  datetime: { type: Date },
});

module.exports = mongoose.model(
  "master_agent_commission_log",
  master_agent_commission_logSchema
);
