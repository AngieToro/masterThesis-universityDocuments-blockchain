const sha256 = require("sha256");

const universtyModel = require("../models/universidadModel");

exports.getUniversityValues = (req, res, next) => {

  //console.log("entro en university controler -> getUniversityValues");

  universtyModel
  .findOne()
  .then(universidad => {

      const universityValues = universidad;
      //console.log("universidad= ", universityValues);
      req.universityValues = universityValues;

      const universityName = universidad.name;
      //console.log("valor universidad= ", universityName);

      if (universityValues){
        const universityHash = sha256(universityName);
        req.universityHash = universityHash;
        //console.log("hash universidad= ", universityHash);

        next();
        //console.log(universityValues + "-" + universityHash);
        //return universityValues + "-" + universityHash;
      }
  })
  .catch(error => {
    res.status(500).json({
      message: "Error con datos de la universidad"
    });
  });
}
