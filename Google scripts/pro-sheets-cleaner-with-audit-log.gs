/**
 * Master Function: Data ko clean karta hai aur har step ko log karta hai.
 */
function runProfessionalCleaning() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getActiveSheet();
  
  // 1. Log Sheet tayyar karna
  const logSheet = getOrCreateSheet(ss, "Audit_Log");
  
  // Data load karna
  const range = sourceSheet.getDataRange();
  const values = range.getValues();
  const initialRowCount = values.length;

  // --- CLEANING STEPS START ---

  // Step 1: Extra Spaces khatam karna (Trimming)
  const trimmedData = values.map(row => row.map(cell => typeof cell === 'string' ? cell.trim() : cell));
  logAction(logSheet, "Trim Spaces", "All cells trimmed of leading/trailing spaces.", initialRowCount);

  // Step 2: Duplicates khatam karna (Based on URL/Column B)
  const uniqueData = removeDuplicates(trimmedData, 1); // 1 ka matlab hai Column B (URL)
  const rowsAfterDupes = uniqueData.length;
  logAction(logSheet, "Remove Duplicates", `Removed ${initialRowCount - rowsAfterDupes} duplicate rows based on URLs.`, rowsAfterDupes);

  // Step 3: Orange Text Rows ko alag karna (Specific Requirement)
  const orangeHex = "#f6b26b"; // Apna exact hex code yahan check kar lain
  const finalData = filterByTextColor(sourceSheet, uniqueData, orangeHex);
  const rowsAfterColorFilter = finalData.length;
  logAction(logSheet, "Color Filter", `Extracted ${rowsAfterColorFilter} rows with orange text color.`, rowsAfterColorFilter);

  // --- CLEANING STEPS END ---

  // Final Output ko nayi sheet mein save karna
  const outputSheet = getOrCreateSheet(ss, "Cleaned_Data_Final");
  outputSheet.clear();
  outputSheet.getRange(1, 1, finalData.length, finalData[0].length).setValues(finalData);

  SpreadsheetApp.getUi().alert("Cleaning Mukammal! 'Audit_Log' aur 'Cleaned_Data_Final' check karein.");
}

/**
 * Helper: Action ko log sheet mein darj karne ke liye
 */
function logAction(logSheet, action, description, rowsAffected) {
  if (logSheet.getLastRow() === 0) {
    logSheet.appendRow(["Timestamp", "Action", "Description", "Rows After Action"]);
    logSheet.getRange("A1:D1").setFontWeight("bold").setBackground("#eeeeee");
  }
  logSheet.appendRow([new Date(), action, description, rowsAffected]);
}

/**
 * Helper: Sheet dhundna ya nayi banana
 */
function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

/**
 * Helper: Duplicates hatane ke liye
 */
function removeDuplicates(data, index) {
  const seen = new Set();
  return data.filter(row => {
    const val = row[index];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * Helper: Text color ki buniyad par filter (Apps Script specific)
 */
function filterByTextColor(sourceSheet, dataValues, hexCode) {
  const range = sourceSheet.getDataRange();
  const colors = range.getFontColors();
  return dataValues.filter((row, index) => {
    return colors[index].some(c => c.toLowerCase() === hexCode.toLowerCase());
  });
}