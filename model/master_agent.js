const mongoose = require("mongoose");

const master_agentSchema = new mongoose.Schema({
  commsPercent: { type: Number },
  country: { type: String },
  currency: { type: String },
  datetime: { type: Date },
  email: { type: String, unique: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  masterAgentId: { type: mongoose.Schema.Types.ObjectId, ref: "member_id"},
  maxAllowedBet: { type: Number },
  mobileNumber: { type: Number },
  password: { type: String },
  sponsorId: { type: String },
  status: { type: Boolean },
  username: { type: String },
  walletBalance: { type: Number },
});

module.exports = mongoose.model("master_agent", master_agentSchema);
