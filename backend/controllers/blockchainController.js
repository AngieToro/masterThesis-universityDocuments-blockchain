const fetch = require("node-fetch");
const request = require("request");
const requestSync = require("sync-request");

exports.createStudentBlockchain  = (req, res, next) => {
    
  console.log("entro a blockchainController => createStudentBlockchain");

    /* const response = await fetch("http://localhost:3000/api/Student");
    const result = await response.json();
    console.log("Respuesta= ", result ); 
 */
  //console.log("Student hash bc= ", req.studentHash);

    const options = {
      method: 'POST',
      url: 'http://localhost:3000/api/Student',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: {
          "$class": "org.example.basic.Student",
          "studentId": req.studentHash,
          "studentType": "Real"
      },
      json: true
    };

     request(options, function (error, response) { 
       console.log("Request createStudentBlockchain");
      //ver la manera que si sale error, mostralro en pantalla
      //console.log("Response student bc= ", response.body);
    });
}

exports.createDocumentBlockchain  = (req, res, next) => {

  console.log("entro a blockchainController => createDocumentBlockchain");

  console.log("Document hash bc= ", req.documentHash);
  console.log("Documet values bc= ", req.documentValues);
  console.log("University hash bc= ", req.universityHash);

  const options = {
    method: 'POST',
    url: 'http://localhost:3000/api/Document', 
    'headers': {
      'Content-Type': 'application/json'
    },
    body: {
        "$class": "org.example.basic.Document",
        "documentId": req.documentHash,
        "hashTransaction": "null",
        "date": req.documentValues.creationDate,
        "university":req.universityHash,
        "collegeCareer": req.documentValues.career,
        "documentType": req.documentValues.type,
        "owner": "resource:org.example.basic.Student#1"
    },
    json: true
  };

  
  request(options, function (err, response) {
    console.log("Request createDocumentBlockchain");
      //ver la manera que si sale error, mostralro en pantalla
      //console.log("Response document bc= ", response.body);
    }); 
}

exports.getTransactionBlockchain  = async(req, res, next) => {

  var flag = false;
    
  console.log("entro a blockchainController => getTransactionBlockchain");

  //console.log("Student hash bc= ", req.studentHash);  
  //console.log("Document hash bc= ", req.documentHash);
  
  const response = await fetch("http://localhost:3000/api/TradeDocument");
  const result = await response.json();
    //console.log("Respuesta= ", result ); 

  result.forEach(element => {
    
      const student = element['newOwner'].split("#");
      const document = element['document'].split("#");

      const studentSplit = student[1];
      const documentSplit = document[1];

      //console.log("estudiante ", studentSplit);
      //console.log("documento= ", documentSplit)
      
      if (studentSplit === req.studentHash && documentSplit === req.documentHash){
        console.log(element);
        flag = true;
      } 
    });
 
    return flag;
}


exports.createTransactionBlockchain  = (req, res, next) => {

  console.log("entro a blockchainController => createTransactionBlockchain");

  console.log("Student hash bc= ", req.studentHash);  
  console.log("Document hash bc= ", req.documentHash);


    var response = requestSync('POST', 'http://localhost:3000/api/TradeDocument', 
      {
        json: {
        "$class": "org.example.basic.TradeDocument",
        "document": "resource:org.example.basic.Document#" + req.documentHash,
        "newOwner": "resource:org.example.basic.Student#" + req.studentHash
       }
    });

  const result = JSON.parse(response.getBody('utf8'));

  //console.log(result);

        //ver la manera que si sale error, mostralro en pantalla
      //console.log("Response document bc= ", response.body);

  return result;
}

exports.getHashTransactionBlockchain  = async(req, res, next) => {

  console.log("entro a blockchainController => getHashTransactionBlockchain");

  //console.log("Transaction hash bc= ", req.query.transacction);  

  let flag = false;

  const response = await fetch("http://localhost:3000/api/TradeDocument/" + req.query.transacction);
  const result = await response.json();
  //console.log(result);

  if (result.error){
    flag = false;
  } else if (result.transactionId){
    flag = true;
  }

  return flag;
}