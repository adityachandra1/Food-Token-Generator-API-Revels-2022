const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  categoryType: {
    type: String,
    enum: ["CAFETERIA", "SYS", "APP"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
