const db = require("./db");

const userSchema = new db.mongoose.Schema({
  "userName": { type: String },
  "passWord": { type: String },

})

module.exports = db.mongoose.model("user", userSchema);
