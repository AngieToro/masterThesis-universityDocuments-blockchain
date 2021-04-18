const sha256 = require("sha256");

const transactionModel = require("../models/transactionModel");
const blockchainController = require("./blockchainController");
const procesamientoPDF = require("./procesamientoPDF");

exports.createTransaction =  async(req, res, next) => {

  const date = new Date();

   transactionModel
    .findOne({ idTransacction: req.transactionHash })
    .then(resul => {
      if (resul){
        return res.status(500).json({
          message: "Los datos introducidos ya se encuentran registrados"
        });
      } else {

        blockchainController.createStudentBlockchain(req);
        blockchainController.createDocumentBlockchain(req);
        blockchainController.getTransactionBlockchain(req)
          .then(result => {
            //console.log("busqueda trans= ", result);

            if (result){
              res.status(500).json({
                message: "La transaccion ya se encuentra registrada en el blockchain"
              });
            } else{
              console.log("se agrega la transccion en el blockchain");
              const transactionHash = blockchainController.createTransactionBlockchain(req);
              console.log("hash= ", transactionHash['transactionId']);
              req.transactionHash = transactionHash['transactionId'];

              const transaction = new transactionModel({
                idTransacction: transactionHash['transactionId'],
                idUniversity: req.universityHash,
                idStudent: req.studentHash,
                idDocument: req.documentHash,
                status: "Valido",
                creationDate: date,
                updateDate: null,
              });
            
              console.log("transaccion= ", transaction);

              const pdf = procesamientoPDF.getValidationPDF(req);

              //buscar si el doc da error geenrar error, lo de abajo creo q no sirve
              /* if (!pdf){
                return res.status(500).json({
                  message: "No se pudo crear el documento de validación",
                });
              } */

              transaction
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Se creo la validación en el blockchain y se genero el comprobante de validacion",
                  result: result
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "No se pudo crear la validación",
                });
              }); 
              return;
            }
        });
      }
    });
}

exports.getTransactionValues = (req, res, next) => {

  transactionModel
   .findOne({ idTransacction: req.query.transacction })
   .then(result => {
      //console.log("transaccion values= ", result);

      //console.log("param student= ", req.studentHash);
      //console.log("param doument= ", req.documentHash);

      if (result.idStudent === req.studentHash &&
          result.idDocument === req.documentHash){

        if (result.status === "Valido"){
          //console.log("correto y buscar en blockchain");
          blockchainController.getHashTransactionBlockchain(req)
            .then(response => {
              console.log("respuesta= " + response);
              if (response){
                const objResulTrans = {
                  status: result.status,
                  identification: req.studentValues.identification,
                  firstName: req.studentValues.firstName,
                  secondName: req.studentValues.secondName,
                  firstLastName: req.studentValues.firstLastName,
                  secondLastName: req.studentValues.secondLastName,
                  codeDoc: req.documentValues.code,
                  typeDoc: req.documentValues.type,
                  dateDoc: req.documentValues.creationDate
                };
                //console.log("datos= ", objResulTrans);
                res.status(200).json({
                  message: "Datos encontrados",
                  data: objResulTrans
                });
              } else {
                return res.status(500).json({
                  message: "La validación del documento no existe en el blockchain"
                });
              }
            }); 
        } else {
          return res.status(500).json({
            message: "El documento se encuentra invalido por el blockchain"
          });
        }
      } else {
        return res.status(500).json({
          message: "La validación del documento no existe."
        });
      }
   })
   .catch(error => {
     res.status(500).json({
      message: "La validación del documento no existe"
     });
   });
}
