const mongoose = require("mongoose");

const player_transaction_historieSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true },
  playerId: { type: String },
  amount: { type: Number },
  transactionType: { type: String },
  attachment: { type: String },
  remarks: { type: String },
  currency: { type: String },
  status: { type: String },
  datetime: { type: Date },
}, {
  timestamps: true 
});

module.exports = mongoose.model(
  "player_transaction_historie",
  player_transaction_historieSchema
);
