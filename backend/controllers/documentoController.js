const sha256 = require("sha256");

const documentModel = require("../models/documentoModel");

//console.log("coleccion documento= ", documentModel.collection.name);

exports.getDocumentValues = (req, res, next) => {

  var idenParameterDocument = null;

  if (req.body.code){
    idenParameterDocument = req.body.code;
  }

  if (req.query.code) {
    idenParameterDocument = req.query.code;
  }

  //console.log(idenParameterDocument);

  documentModel
    .findOne({ code: idenParameterDocument})
    .then(documento => {
      const documentValues = documento;
      req.documentValues = documentValues;
      const documentValue = documento.code + documento.type + documento.creationDate;
      //console.log("documento valores= ", documentValues);

      if (documentValues){
        const documentHash = sha256(documentValue);
        req.documentHash = documentHash
        //console.log("documento encriptado= ", req.documentHash);

        next();
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error con datos del documento"
      });
    });
};
