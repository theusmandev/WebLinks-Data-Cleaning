function copyOrangeTextRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getActiveSheet();
  var targetSheetName = "Orange Data";
  var targetSheet = ss.getSheetByName(targetSheetName) || ss.insertSheet(targetSheetName);
  
  targetSheet.clear(); // Purani list saaf karne ke liye

  var range = sourceSheet.getDataRange();
  var values = range.getValues();
  var fontColors = range.getFontColors(); // Text color check karne ke liye
  var rowsToCopy = [];

  // Apna Hex Code yahan likhen (Jo aap ne Step 1 mein nikala)
  var myOrange = "#FF9900".toLowerCase(); 

  for (var i = 0; i < fontColors.length; i++) {
    var hasOrangeText = false;
    
    // Row ke har column ko check karo
    for (var j = 0; j < fontColors[i].length; j++) {
      if (fontColors[i][j].toLowerCase() === myOrange) {
        hasOrangeText = true;
        break; // Agar aik cell bhi mil gaya to loop se nikal jao
      }
    }
    
    if (hasOrangeText) {
      rowsToCopy.push(values[i]);
    }
  }

  if (rowsToCopy.length > 0) {
    targetSheet.getRange(1, 1, rowsToCopy.length, rowsToCopy[0].length).setValues(rowsToCopy);
    SpreadsheetApp.getUi().alert(rowsToCopy.length + ' rows "Orange Data" sheet mein copy ho gayi hain!');
  } else {
    SpreadsheetApp.getUi().alert('Abhi bhi koi orange text nahi mila. Code check karein.');
  }
}