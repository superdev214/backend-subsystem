const bcrypt = require("bcrypt");
const agent = require("../model/agent");
const member_id = require("../model/member_id");
const player = require("../model/player");
const agent_commission_log = require("../model/agent_commission_log");
const player_transaction_history = require("../model/player_transaction_historie");
const master_agent = require("../model/master_agent");
const master_agent_commission_log = require("../model/master_agent_commission_log");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const dotenv = require("dotenv");
dotenv.config();
exports.createTransaction = async (req, res) => {
  try {
    // Get user data
    const { transactionId, playerId, username, amount } = req.body;
    const newTransaction = await player_transaction_history.create({
      transactionId: transactionId,
      playerId: playerId,
      amount: amount,
      transactionType: "DEPOSIT",
      remarks: "deposit",
      currency: "PHP",
      status: "CREDIT",
    });
    res.status(200).send({ msg: "success" });
  } catch (err) {
    console.log(err);
  }
};
exports.getAllData = async (req, res) => {
  try {
    console.log("hi");
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.jwt_key);
    const username = decoded.user_name;
    const userRole = decoded.user_role;
    console.log(username, userRole);
    if (userRole === "agent") {
      const agent_user = await agent
        .findOne({
          username,
        })
        .populate("agentId", "idNumber -_id");
        const temp_user = await agent.findOne({
          username,
        });
          // get all player
        const allPlayers = await player
          .find({ sponsorId: temp_user.agentId })
          .populate("playerId", "idNumber -_id");
        // console.log(allPlayers);
        // get transaction length
        const commissionLogs = await agent_commission_log
        .find({
          agentId: agent_user._id,
        })
        .populate("playerId");
        const transaction_len = await player_transaction_history.find();
        res.status(200).send({
          username: agent_user.firstName + " " + agent_user.lastName,
          agentId: agent_user.agentId.idNumber,
          walletBalance: agent_user.walletBalance,
          commission: commissionLogs,
          top_players: allPlayers,
          transaction_length: transaction_len.length,
          role: "agent",
        });
    }
  
   
  } catch (error) {
    console.log(error);
  }
};
