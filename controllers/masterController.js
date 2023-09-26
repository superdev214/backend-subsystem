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
    const { transactionId, agentId, username, amount } = req.body;
    const newTransaction = await player_transaction_history.create({
      transactionId: transactionId,
      playerId: agentId,
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
    if (userRole === "master_agent") {
      const master_agent_user = await master_agent
        .findOne({
          username,
        })
        .populate("masterAgentId", "idNumber -_id");
      const master_commissionLogs = await master_agent_commission_log
        .find({
          masterAgentId: master_agent_user._id,
        })
        .populate("playerId");
      // all players in player
      const temp_master_agent_user = await master_agent.findOne({
        username,
      });
      const allPlayers = await player
        .find({ sponsorId: temp_master_agent_user.masterAgentId })
        .populate("playerId", "idNumber -_id");
      console.log(allPlayers);
      //get all transaction length
      const transaction_len = await player_transaction_history.find();
      // get all agents in agent

      const allAgent = await agent
        .find({ sponsorId: temp_master_agent_user.masterAgentId })
        .populate("agentId", "idNumber -_id");
      res.status(200).send({
        msg: "success",
        token: token,
        username:
          master_agent_user.firstName + " " + master_agent_user.lastName,
        agentId: master_agent_user.masterAgentId.idNumber,
        walletBalance: master_agent_user.walletBalance,
        masterAgentCommission: master_commissionLogs,
        top_players: allPlayers,
        top_agents: allAgent,
        transaction_length: transaction_len.length,
        role: "master_agent",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
