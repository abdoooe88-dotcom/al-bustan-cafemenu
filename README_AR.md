# نظام منيو QR للكافيه

## ماذا يحتوي؟
- صفحة منيو متوافقة مع الموبايل.
- المنيو تُقرأ من Google Sheets.
- تغيير السعر أو إضافة صنف يتم من Google Sheets بدون تغيير QR.
- يمكن إضافة صور للأصناف.
- QR واحد ثابت لكل الترابيزات.

## التشغيل

### 1) Google Sheet
أنشئ ملف Google Sheets وفيه ورقتان:

Settings:
| key | value |
|---|---|
| cafeName | اسم الكافيه |
| tagline | أهلاً بيكم |

Menu:
| Category | Item | Description | Price | Image URL | Active |
|---|---|---|---|---|---|
| Coffee | Espresso | قهوة إسبريسو | 50 EGP | | TRUE |
| Coffee | Cappuccino | إسبريسو مع لبن ورغوة | 70 EGP | | TRUE |

### 2) Apps Script
افتح Extensions > Apps Script، والصق محتوى google-apps-script.gs.
ضع Google Sheet ID مكان:
PUT_YOUR_GOOGLE_SHEET_ID_HERE

ثم Deploy > New deployment > Web app.
اجعل الوصول متاحاً لأي شخص لديه الرابط.
انسخ Web App URL.

### 3) ربط الصفحة
افتح config.js وضع رابط الـWeb App بدلاً من:
PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE

### 4) رفع الموقع
ارفع الملفات التالية على أي استضافة:
index.html
style.css
config.js
app.js

بعد الرفع سيكون لديك رابط مثل:
https://example.com/menu/

### 5) QR Code
اعمل QR للرابط النهائي للمنيو، وليس لرابط Google Sheets.
اطبع نفس الـQR على كل الترابيزات.

## مهم
لا تغير رابط صفحة المنيو بعد طباعة الـQR. لو غيرت الأسعار أو الأصناف، عدل Google Sheet فقط.

## ملاحظة
هذا الإصدار مصمم ليكون بسيطاً وسريعاً. لا يحتاج الزبون إلى تطبيق.
