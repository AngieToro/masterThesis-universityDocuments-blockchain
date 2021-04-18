const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({

  code: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  faculty: {
    type: String,
    require: true
  },
  career: {
    type: String,
    require: true
  },
  creationDate: {
    type: String,
    require: true
  },
  rector: {
    type: String,
    require: false
  },
  record: {
    type: String,
    require: false
  },
  book: {
    type: String,
    require: false
  },
  volume: {
    type: String,
    require: false
  },
  invoice: {
    type: String,
    require: false
  },
  number: {
    type: String,
    require: false
  },
  note: {
    type: Number,
    requite: false
  }
});

module.exports = mongoose.model("Documento", documentSchema);
