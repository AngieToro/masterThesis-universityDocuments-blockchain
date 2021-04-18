const moongose = require("mongoose");

const studentSchema = moongose.Schema({

  identification: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  secondName: {
    type:String,
    require: false
  },
  firstLastName: {
    type: String,
    require: true
  },
  secondLastName: {
    type: String,
    require: false
  }
});

module.exports = moongose.model("Estudiante", studentSchema);
