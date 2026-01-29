function makeAllUrlsClickable() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orange Data"); //
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  for (let i = 0; i < values.length; i++) {
    let url = values[i][0];
    if (url && url.toString().startsWith("http")) {
      // Cell mein formula set karna taake wo clickable ban jaye
      sheet.getRange(i + 1, 1).setFormula('=HYPERLINK("' + url + '","' + url + '")');
    }
  }
  SpreadsheetApp.getUi().alert("Tamam links clickable ho chuke hain!");
}