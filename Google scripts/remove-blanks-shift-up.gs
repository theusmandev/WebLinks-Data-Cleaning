function shiftDataUp() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orange Data"); //
  
  // Column D ka sara data lena (Row 2 se aakhir tak)
  const lastRow = sheet.getLastRow();
  const range = sheet.getRange(2, 4, lastRow - 1, 1); 
  const values = range.getValues();
  
  // Logic: Khali (blank) cells ko nikaal kar sirf data ko filter karna
  const filteredData = values.filter(row => row[0].toString().trim() !== "");
  
  // Purana Column D saaf karna
  range.clearContent();
  
  // Saaf kiya hua data wapas top (D2) par likhna
  if (filteredData.length > 0) {
    sheet.getRange(2, 4, filteredData.length, 1).setValues(filteredData);
  }
  
  SpreadsheetApp.getUi().alert("Data upar shift ho gaya hai!");
}