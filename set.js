const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0lMbGhZY3BqRjU0bTdrVzM2TlMxaEx2NTFuZktDWEw0Sm1WZUExMHpYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHBlc2ZuSzduTFVRTVpidHVoYll3SDhWY20zbFZ6ZXh4ZWdWSEtuaHR5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRG1vemJCNEszazA1M0djSW5IQVNzMmcwRTUvSFNCdVZQRVRwbndmMUZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXalJwR1NLQU93NjgvR1J5Y2IyVFJ3WUtiejJDSVlzK04xMjI3Q0RUM0ZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldDeTZEZHo5MlpRK3NhSXpBYTdTMXZrc3haaHFETWNscVZuRVkvMjZHR1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1PaHgvcnNPbDNjRWx2VG50QWtmMk5PYStyMThYdXRwQnBlTkZBbVRTaW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUdSclpuemw1Q0tFZTZPeHg1azAxc2hmdUh1TnVwZWNSRjVuV1gyam5raz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3g5aUllOVdwSitKRFVxTDdZenJPano2RHhoUkJFVThzVVBmYkg0Q2loQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNHbGdWd3pZWVlCM2JyQlQrd3B0OHY5WkFkOTI5clQ2cXRDeVhERjFLMW8yRnhiekpiQ2xwNUZZSmlUY080UTlCWjJRS2FFYURUenFWbkxpc0s3SEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDUsImFkdlNlY3JldEtleSI6IktVMDZyWEJibEFTeGVwcGVVWnJmQVVad2tZcFdlMW9mWWFmMmZSdUZsVFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1NSVVoNlNkUVJHcjdpV21vUVlycGciLCJwaG9uZUlkIjoiYTY4ZTM0OWQtZjRlOS00ZjdkLWIyMGYtNWYwNWYxMmY2ZTY5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpGUjNDckVPNWludUxkQkxKaW9vY0krQVRIbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVMnBydE94OVdDN2dHa0tPK3RPdUxhbmZFVkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTVpHOFpGVjMiLCJtZSI6eyJpZCI6IjI2MDc3MTc5ODEyODo5N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTEQ5OVRBUWhxbmV2UVlZQ0NBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUGZkZU93MkhCWG9wZEVSdVdKWmsyVWR6czArYldLMkkyYnp3RXNJZGhBaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiemZmdXI2cjZoSW02SWgrRkdvMnY0aTFMaGhHRXVvR3pHNFRJT0F5Q0s0Z1JYQXZ4MDNPRkpkRW9pTENXQktTclVKak5VRTFzUkNGeVF5U3hOcVpDQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6ImtFMi9uQ08ydE9sUWwyaVZXbFcvaXAxdHZrbU9yRXhZUUpwaVJVdVZJTFRIYWpEV3FOcmRsQUpGS0lYWFc1N0NVSHVSbmsweEkwS1p3Q2dIQXhjdkJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYwNzcxNzk4MTI4Ojk3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlQzM1hqc05od1Y2S1hSRWJsaVdaTmxIYzdOUG0xaXRpTm04OEJMQ0hZUUoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAwODQzNzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFkrIn0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Cyrus",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "260771798128",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaoIqE1HbFV2kxWFeo10",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaoIqE1HbFV2kxWFeo10",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

