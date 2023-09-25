const mongoose = require("mongoose");

const member_idSchema = new mongoose.Schema({
    idNumber: { type: String },
});

module.exports = mongoose.model("member_id", member_idSchema);
