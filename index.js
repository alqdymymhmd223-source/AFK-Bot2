const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. خادم وهمي لإرضاء Render
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running 24/7!\n');
}).listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

// 2. إعدادات الاتصال بحساب رسمي
const options = {
  host: 'gold.magmanode.com',
  port: 30944,
  profilesFolder: './controls' // لحفظ بيانات الجلسة وعدم طلب التسجيل كل مرة
};

function createBot() {
  console.log('جاري الاتصال بالسيرفر عبر حساب Microsoft...');
  const client = bedrock.createClient(options);

  client.on('join', () => {
    console.log('تم دخول البوت بنجاح! البوت الآن AFK داخل السيرفر.');
  });

  client.on('disconnect', (packet) => {
    console.log('تم فصل البوت، السبب:', packet);
    setTimeout(createBot, 5000);
  });

  client.on('error', (err) => {
    console.log('حدث خطأ في الاتصال:', err.message);
    setTimeout(createBot, 5000);
  });
}

createBot();
