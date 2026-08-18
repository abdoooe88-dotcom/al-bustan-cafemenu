/*
  GOOGLE SHEETS + APPS SCRIPT BACKEND
  -----------------------------------
  Sheet 1: Settings
  A1 = cafeName       B1 = اسم الكافيه
  A2 = tagline        B2 = أهلاً بيكم

  Sheet 2: Menu
  Columns:
  A Category | B Item | C Description | D Price | E Image URL | F Active

  Example:
  Coffee | Espresso | قهوة إسبريسو | 50 EGP | | TRUE
  Coffee | Cappuccino | إسبريسو مع لبن ورغوة | 70 EGP | | TRUE
*/

const SHEET_ID = "PUT_YOUR_GOOGLE_SHEET_ID_HERE";

function doGet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const settings = ss.getSheetByName("Settings");
  const menu = ss.getSheetByName("Menu");

  const s = settings.getDataRange().getValues();
  const map = {};
  s.slice(1).forEach(r => { if(r[0]) map[String(r[0])] = r[1]; });

  const rows = menu.getDataRange().getValues().slice(1);
  const groups = {};
  rows.forEach(r => {
    if (!r[0] || r[5] === false || String(r[5]).toUpperCase() === "FALSE") return;
    const cat = String(r[0]);
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({
      name:String(r[1]||""),
      desc:String(r[2]||""),
      price:String(r[3]||""),
      image:String(r[4]||"")
    });
  });

  const out = {
    cafeName: map.cafeName || "اسم الكافيه",
    tagline: map.tagline || "أهلاً بيكم",
    categories: Object.keys(groups).map(name => ({name, items:groups[name]}))
  };

  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}