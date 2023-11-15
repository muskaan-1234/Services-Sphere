var mongoose = require("mongoose");

function getSignUserSchema() {
  var SchemaClass = mongoose.Schema;
  var colSchema = new SchemaClass(
    {
      email: { type: String, required: true, unique: true, index: true },
      pass: { type: String },
      type: { type: String },
      dos: { type: Date, default: Date.now },
    },
    {
      versionKey: false, // to avoid __v field in the table come by default
    }
  );

  var userColRef = mongoose.model("signupuserss", colSchema);
  return userColRef;
}

module.exports = getSignUserSchema;
