const express = require("express");

const universidadController = require("../controllers/universidadController");
const estudianteController = require("../controllers/estudianteController");
const documentoController = require("../controllers/documentoController");
const transaccionController = require("../controllers/transaccionController");
const blockchainController = require("../controllers/blockchainController");

const router = express.Router();

router.use("/datos", universidadController.getUniversityValues)
 .use("/datos", estudianteController.getStudenValues)
 .use("/datos", documentoController.getDocumentValues)
 //.use("/datos", blockchainController.manageBlockchain)
 .post("/datos", transaccionController.createTransaction);


router.use("/buscar", universidadController.getUniversityValues)
 .use("/buscar", estudianteController.getStudenValues)
 .use("/buscar", documentoController.getDocumentValues)
 .get("/buscar", transaccionController.getTransactionValues);

module.exports = router;
