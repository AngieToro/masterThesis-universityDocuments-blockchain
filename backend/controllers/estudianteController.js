const sha256 = require("sha256");

const studentModel = require("../models/estudianteModel");

exports.getStudenValues = (req, res, next) => {

  var idenParameterStudent = null;
  if (req.body.identification){
    idenParameterStudent = req.body.identification;
  }

  if (req.query.identification) {
    idenParameterStudent = req.query.identification;
  }

  //console.log("estudiante= ", idenParameterStudent);

  studentModel
  . findOne({ identification: idenParameterStudent })
  .then(estudiante => {

    const studentValues = estudiante;
    req.studentValues = studentValues;
    const studentValue = estudiante.identification + estudiante.firstName +
                    estudiante.secondName + estudiante.firstLastName +
                    estudiante.secondLastName;
    //console.log("valor estudiante= ", studentValues);

    if (studentValues){
      const studentHash = sha256(studentValue);
      req.studentHash = studentHash
      //console.log("estudiante encriptad0= ", req.studentHash);

      next();
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Error con datos del estudiante"
    });
  });
}
