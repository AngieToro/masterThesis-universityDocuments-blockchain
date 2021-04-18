const mongoose = require("mongoose");

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    require: true
  },
  numberPhone: {
    type: String,
    require: true
  },
  numberFax: {
    type: String,
    require: true
  },
  secretary: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Universidad", universitySchema);
