const bedrock = require('bedrock-protocol');

function createBot() {
  console.log('جاري الاتصال بالسيرفر...');

  const client = bedrock.createClient({
    host: 'gold.magmanode.com',
    port: 30944,
    username: 'AFK_Bot_QDYMI',
    offline: true
  });

  client.on('spawn', () => {
    console.log('تم دخول البوت بنجاح! البوت الآن AFK داخل السيرفر.');
  });

  client.on('end', (reason) => {
    console.log('انقطع الاتصال، جاري إعادة الاتصال بعد 5 ثوانٍ...', reason);
    setTimeout(createBot, 5000);
  });

  client.on('error', (err) => {
    console.error('حدث خطأ:', err);
  });
}

createBot();
