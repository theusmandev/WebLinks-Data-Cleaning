function checkUrlStatusWithResume() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orange Data"); //
  const lastRow = sheet.getLastRow();
  
  // Column A (URLs) aur Column B (Status) ka data lena
  const range = sheet.getRange(1, 1, lastRow, 2); 
  const data = range.getValues();
  
  let processedCount = 0;

  for (let i = 1; i < data.length; i++) { // Header (Row 1) ko chor kar
    let url = data[i][0];    // Column A
    let status = data[i][1]; // Column B

    // LOGIC: Agar status pehle se maujood hai, to skip karo
    if (status !== "" && status !== null) {
      continue; 
    }

    if (!url) continue;

    console.log("Checking Row " + (i + 1) + ": " + url);

    try {
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        followRedirects: true,
        connectTimeout: 5000 // 5 seconds wait
      });
      
      const code = response.getResponseCode();
      const result = (code === 200) ? "✅ Active" : "⚠️ Code: " + code;
      
      // Foran cell update karna taake progress save ho jaye
      sheet.getRange(i + 1, 2).setValue(result);
      processedCount++;
      
    } catch (e) {
      sheet.getRange(i + 1, 2).setValue("💀 Dead");
      console.warn("Failed: " + url);
    }

    // Har 5 rows ke baad data save (flush) karna zaroori hai
    if (processedCount % 5 === 0) {
      SpreadsheetApp.flush();
    }
  }

  if (processedCount === 0) {
    SpreadsheetApp.getUi().alert("Tamam URLs pehle hi check ho chukay hain!");
  } else {
    SpreadsheetApp.getUi().alert("Batch mukammal! Agar kuch baqi hain to dubara Run karein.");
  }
}