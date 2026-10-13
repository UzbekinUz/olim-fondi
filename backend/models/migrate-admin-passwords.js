// Bir martalik migratsiya: barcha adminlarning ochiq parolini md5 ga o'girish.
// Ishlatish (loyiha ildizidan, models/ papkasi bilan bir daraja):
//   MONGO_URI="mongodb://..." node migrate-admin-passwords.js
// Skript qayta ishga tushirilsa ham xavfsiz: allaqachon md5 bo'lganlarini o'tkazib yuboradi.
// ISHGA TUSHIRISHDAN OLDIN BAZADAN BACKUP OLING.

const crypto = require('crypto');
require('dns').setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const User = require('./adminModel');

const md5 = (s) => crypto.createHash('md5').update(String(s)).digest('hex');
const isMd5 = (s) => /^[a-f0-9]{32}$/i.test(s);

(async () => {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.argv[2];
    if (!uri) {
        console.error('MONGO_URI ko\'rsatilmagan');
        process.exit(1);
    }
    await mongoose.connect(uri);

    const users = await User.find().select('+password');
    let migrated = 0, skipped = 0;

    for (const u of users) {
        if (!u.password || isMd5(u.password)) { skipped++; continue; }
        // updateOne — model hook/validatsiyalarini chetlab o'tadi
        await User.updateOne({ _id: u._id }, { $set: { password: md5(u.password) } });
        migrated++;
    }

    console.log(`Tayyor. Hashlandi: ${migrated}, o'tkazib yuborildi: ${skipped}`);
    await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
