
const player_transaction_history = require("../model/player_transaction_historie");

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
