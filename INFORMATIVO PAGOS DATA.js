function informativo() {
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Informativo")
var now = Utilities.formatDate(new Date(), "GMT+0", "dd-MM");
var anno = Utilities.formatDate(new Date(), "GMT+0", "dd-MM-YYYY");
var data = sheet.getDataRange().getValues();
var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");

var email = Session.getActiveUser().getEmail();
Logger.log(email);

//const ht = HtmlService.createHtmlOutputFromFile('htmlCodigo').getContent();


data.forEach(function (row) {
if (row[11] === "SI" ) {

GmailApp.sendEmail(row[9], ("Información pago -  " + (row[1])),'', 
{htmlBody: "Hola " + row[1] + "!" 
+ "<br>" 
+ "A continuación remitimos la información del pago realizado el día: " + (Utilities.formatDate(new Date(row[0]), "GMT+1", "dd-MM-YYYY") )
+ "<br>" 
+ "No. Sap: " + row[2]
+ "<br>"
+ "No. Factura: " + row[3] 
+ "<br>" 
+ "Valor Factura: $" + row[4] 
+ "<br>" 
+ "Valor descuento Pronto pago: $" + row[5] 
+ "<br>" 
+ "Valor rebate: $" + row[6] 
+ "<br>" 
+ "Valor Revenue: $" + row[7] 
+ "<br>" 
+ "Valor Pagado: $" + row[8] 
+ "<br>" 
+ "Quedamos atentos,"
+ "<br>" + "Frubana",
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
