const pdfDocument = require("pdfkit");
const fs = require("fs");

exports.getValidationPDF = (req, res, next) => {

console.log("entro a procesamientoPDF => getValidationPDF");

  //date
  const date = new Date();
  const month = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  const dateTitle = date.getDate() + month[date.getMonth()] + date.getFullYear();

  const pathSystem = '/home/user/Desktop/PDF_validacion/';
  const path = pathSystem + 'constancia -' + req.studentValues.identification + 
  ' - ' + req.documentValues.type + ' - ' + dateTitle + '.pdf';
  console.log("path constancia de validacion= ", path);

  const doc = new pdfDocument;
  doc.pipe(fs.createWriteStream(path));
  //doc.pipe(res);
  doc.fontSize(12);

  //header
  doc
   .image('backend/imagePDF/ucab.jpeg',60,40, {
     width: 100,
     height: 100
   });

  doc.text(req.universityValues.name, {
    align: 'center'
  });

  doc.text(req.universityValues.direction, {
    align: 'center'
  });

  doc.text(`Telf.: ${req.universityValues.numberPhone} Fax: ${req.universityValues.numberFax}`, {
    align: 'center'
  }),

  doc.text('Secretaría General', {
    align: 'center'
  });

  //title
  doc
  .moveDown(2)
  .text('Constancia de validación de documento académico', {
    align: 'center',
    stroke: 'true'
  });

  //body
  const sectionBody1 = "Quien subscribe, " + req.universityValues.secretary +
    " Secretaría  de la Secretaría General de la " + req.universityValues.name +
    " certifica: que el(la) ciudadano(a) " + req.studentValues.firstName +
    " " + req.studentValues.secondName + " " + req.studentValues.firstLastName +
    " " + req.studentValues.secondLastName + ", titular de la Cédula de Identidad " +
    req.studentValues.identification + ", curso en esta Universidad en la Facultad " +
    req.documentValues.faculty + " en la Escuela " + req.documentValues.career + ".";

  const sectionBody2 = "Se constata que el documento académico tipo " + req.documentValues.type +
    " con el código " + req.documentValues.code + " presentado por el (la) " +
    "ciudadno(a), esta verificado y certificado por la tecnología Blockchain.";

  const sectionBody3 = "La autenticidad de la validación de documento se puede verificar " +
    "  través del portal https://www.ucab.edu.ve/validacion con el identificador " +
    req.transactionHash + " y otros datos presentes en el documento.";
    

    doc
   .moveDown(2)
   .text(sectionBody1, {
      align: 'justify'
    });

  doc
   .moveDown()
   .text(sectionBody2, {
      align: 'justify'
   });

  doc
   .moveDown()
   .text(sectionBody3, {
     align: 'justify'
   });

   //date
   const sectionDate = "Certificación que se expide en la ciudad Caracas, " +
     " el día " + date.getDate() + " del " + month[date.getMonth()] +
     " del " + date.getFullYear() + ".";

  doc
   .moveDown(3)
   .text(sectionDate, {
     align: 'justify'
   });

  //sign
  doc
   .image('backend/imagePDF/firma.png',370,430, {
     width: 150,
     height: 100
   });

  doc
   .moveDown(4)
   .text(req.universityValues.secretary,{
     align: 'right'
   });

  doc
   .moveDown()
   .text('Secretaría', {
     align: 'right'
   });

  //footer
  const numberPage = doc.bufferedPageRange();

  const sectionFooter1 = "Este documento consta de " + numberPage.count +
    " de hoja(s), la cual no debe(n) contener enmiendas, tachaduras o superposiciones. " +
    "Todos los datos de identificación de la universidad, del estudiante, y " +
    "del documento académico son suministrados por la " + req.universityValues.name +
    " y sus autoridades."

  const sectionFooter2 = "Este documento debe estar anexo con carácter de obligatoriedad " +
     "al documento académico relacionado con el código " + req.documentValues.code +
     " con fecha de creación " + req.documentValues.creationDate + " sino se " +
     "considera inválido ";

  doc
   .moveDown(2)
   .text("Nota importante:", {
     underline: true
   });

  doc
   .text(sectionFooter1, {
     align: 'justify'
   });

   doc
   .moveDown()
   .text(sectionFooter2, {
     align: 'justify'
   });

   doc
   .moveDown()
   .text(numberPage.count, {
     align: 'right'
   });

  doc.end();

  /* if (!doc){
    return console.log("error");
  } */

  //console.log("archivo generado");
  return doc;

}
