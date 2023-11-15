var mongoose = require("mongoose");

function getClientUserSchema() {
  var SchemaClass = mongoose.Schema;
  var colSchema = new SchemaClass(
    {
      email: { type: String, required: true, unique: true, index: true },
      name: { type: String },
      contact: { type: String },
      address: { type: String },      
      city: { type: String },
      prooftype: { type: String },
      picpath: { type: String },
      proofpath: { type: String },
      dos: { type: Date, default: Date.now },
    },
    {
      versionKey: false, // to avoid __v field in the table come by default
    }
  );

  var userColRef = mongoose.model("clientinfos", colSchema);
  return userColRef;
}

module.exports = getClientUserSchema;
