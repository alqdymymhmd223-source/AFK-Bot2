const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. خادم HTTP شكلي عشان منصة Render تتأكد إن الخدمة شغال وما تطفيه
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('AFK Bot is running fine 24/7!\n');
}).listen(PORT, () => {
    console.log(`HTTP Server Listening on port ${PORT}`);
});

// 2. إعدادات السيرفر
const options = {
    host: 'gold.magmanode.com',
    port: 30944,
    username: 'AFK_Bot_QDYMI',
    profilesFolder: './controls',
    authTitle: '000000004412ae92',
    offline: false
};

let client = null;
let moveInterval = null;

function startBot() {
    console.log("جاري الاتصال بالسيرفر عبر حساب Microsoft...");
    
    client = bedrock.createClient(options);

    client.on('spawn', () => {
        console.log('.داخل السيرفر AFK تم دخول البوت بنجاح! البوت الآن');
        
        // منع تكرار الـ Interval لو صار إعادة اتصال
        if (moveInterval) clearInterval(moveInterval);

        // حيلة منع التجميع/الخمول: حركة خفيفة كل 30 ثانية
        moveInterval = setInterval(() => {
            if (client) {
                // القفز (Jump)
                client.queue('player_action', {
                    action: 'start_jump',
                    entity_id: client.entityId,
                    position: { x: 0, y: 0, z: 0 },
                    result_position: { x: 0, y: 0, z: 0 },
                    face: 0
                });

                // تغيير زاوية النظر قليلاً (تدمج مع القفز)
                client.queue('move_player', {
                    runtime_id: client.entityId,
                    position: client.position || { x: 0, y: 0, z: 0 },
                    pitch: Math.floor(Math.random() * 20) - 10,
                    yaw: Math.floor(Math.random() * 360),
                    head_yaw: 0,
                    mode: 'normal',
                    on_ground: true,
                    riddable_entity_runtime_id: 0n,
                    tick: 0n
                });
                console.log('🤖 البوت قام بحركة منع الخمول (تفاعل مع السيرفر)...');
            }
        }, 30000); // كل 30 ثانية
    });

    client.on('error', (err) => {
        console.log('حدث خطأ في الاتصال:', err.message || err);
    });

    client.on('end', (reason) => {
        console.log('تم قطع الاتصال من السيرفر:', reason);
        if (moveInterval) clearInterval(moveInterval);
        console.log('إعادة المحاولة بعد 10 ثوانٍ...');
        setTimeout(startBot, 10000);
    });
}


const options = {
    host: 'gold.magmanode.com',
    port: 30944,
    username: 'AFK_Bot_QDYMI',
    authTitle: '000000004412ae92',
    flow: 'msal',
    profilesFolder: './controls',
    offline: false
};
start//تشغيل البوت
startBot();
