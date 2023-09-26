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
    
        res.status(200).send({
          msg: "success",
          token: token,
          role: "master_agent",
        });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
exports.getUserRole = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.jwt_key);
    const userRole = decoded.user_role;
    res.status(200).send({
      role: userRole
    })
   
  } catch (error) {
    console.log(error);
  }
};
