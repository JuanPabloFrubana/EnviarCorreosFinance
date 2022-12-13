function codigo() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Informativo")
  var data = sheet.getDataRange().getValues();
  var email = Session.getActiveUser().getEmail();
  
  Logger.log("Email desde donde se manda: " + email);
  
  data.forEach(function (row) {
  if (row[11] === "SI" ) {
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
  
  const fecha = (Utilities.formatDate(new Date(row[0]), "GMT+1", "dd-MM-YYYY") )
  const proveedor = row[1]
  const sap = row[2]
  const nfactura = row[3]
  const vrfactura =formatter.format(row[4])
  const vrpp = formatter.format(row[5])
  const rebate = formatter.format(row[6])
  const revenue = formatter.format(row[7])
  const pagado = formatter.format(row[8])
  const destinatario = formatter.format(row[9])
  const copia = formatter.format(row[10])
  
  
  const t = HtmlService.createTemplateFromFile('plantilla');
  
  t.fecha = fecha
  t.proveedor = proveedor
  t.sap = sap
  t.nfactura = nfactura
  t.vrfactura = vrfactura
  t.vrpp = vrpp
  t.rebate = rebate
  t.revenue = revenue
  t.pagado = pagado
  t.destinatario = destinatario
  t.copia = copia
  
  
  
  const htmlForEmail = t.evaluate().getContent();
  
  
  
  GmailApp.sendEmail(row[9], ("Información pago -  " + (row[1])),'', 
  {htmlBody: htmlForEmail,
  from: email,
  cc: row[10],
  name: "Contabilidad Frubana"}
  );
  
  }
  else {
  // Logger.log("No es Aniversario")
  }
  });
  }
  
  ;