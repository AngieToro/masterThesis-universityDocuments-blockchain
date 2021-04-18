const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const transactionSchema = mongoose.Schema({

  idTransacction: {
    type: String,
    require: true,
    unique: true
  },
  idUniversity: {
    type: String,
    require: true
  },
  idStudent: {
    type: String,
    require: true
  },
  idDocument: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  creationDate: {
    type: Date,
    require: true
  },
  updateDate: {
    type: Date,
    require: false
  }
});

transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Transacction", transactionSchema);
