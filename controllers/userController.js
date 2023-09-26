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

const jwt_key = config.jwt_key;
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // Validate user input : frontend side
//     // check if user already exist
//     const oldUser = await User.findOne({ email: email.toLowerCase() });

//     if (oldUser)
//       return res.status(409).send("This user already exist. Please Login");
//     //@ User don't exist
//     //@ Create user in our database
//     const salt = await bcrypt.genSalt(Number(15));
//     const hashPassword = await bcrypt.hash(password, salt);
//     const user = await User.create({
//       name: name.toLowerCase(),
//       email: email.toLowerCase(),
//       password: hashPassword,
//     });

//     // const token = jwt.sign(
//     //   {
//     //     user_id: user._id,
//     //     email,
//     //   },
//     // jwt_key,
//     //   { expiresIn: "2h" }
//     // );
//     // // // save user token

//     // return new user
//     res.status(200).send({ msg: "success" });
//   } catch (err) {
//     console.log(err);
//   }
//   /**bcrypt password is temporary suspend */
// };

exports.login = async (req, res) => {
  try {
    // Get user data
    const { username, password } = req.body;
    const agent_user = await agent
      .findOne({
        username,
      })
      .populate("agentId", "idNumber -_id");

    if (agent_user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        agent_user.password
      );
      if (!passwordIsValid) res.status(401).send("Invalid Credentials");
      // get commission by user

      const commissionLogs = await agent_commission_log
        .find({
          agentId: agent_user._id,
        })
        .populate("playerId");
      // get all player
      const allPlayers = await player
        .find()
        .populate("playerId", "idNumber -_id");
      // console.log(allPlayers);
      // get transaction length
      const transaction_len = await player_transaction_history.find();
      console.log("length = ", transaction_len.length);

      const token = jwt.sign(
        {
          user_role: "agent",
          user_name: agent_user.username,
        },
        jwt_key,
        { expiresIn: "30d" }
      );
      // save user token
      res.status(200).send({
        msg: "success",
        token: token,
        username: agent_user.firstName + " " + agent_user.lastName,
        agentId: agent_user.agentId.idNumber,
        walletBalance: agent_user.walletBalance,
        commission: commissionLogs,
        top_players: allPlayers,
        transaction_length: transaction_len.length,
        role: "agent",
      });
    } else {
      const master_agent_user = await master_agent
        .findOne({
          username,
        })
        .populate("masterAgentId", "idNumber -_id");
      if (master_agent_user) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          master_agent_user.password
        );

        if (!passwordIsValid) res.status(401).send("Invalid Credentials");
        const token = jwt.sign(
          {
            user_role: "master_agent",
            user_name: master_agent_user.username,
          },
          jwt_key,
          { expiresIn: "30d" }
        );
        // save user token
        // commission log for master_agent
        const master_commissionLogs = await master_agent_commission_log
          .find({
            masterAgentId: master_agent_user._id,
          })
          .populate("playerId");
        // all players in player
        const allPlayers = await player
          .find()
          .populate("playerId", "idNumber -_id");
        //get all transaction length
        const transaction_len = await player_transaction_history.find();
        // get all agents in agent
        const allAgent = await agent
          .find()
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
          user_role: "master_agent",
        });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
