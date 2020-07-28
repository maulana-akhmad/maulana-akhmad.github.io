let webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BI3CJZUE8XMZg4PeUfNyMnspe-3zR6O953otkejmJ6XwS58oe_LerVbcU8eNGXJ-m2JMRSkMMtewCTi1JbMnYm4",
   "privateKey": "vFaFYPh6WXrswvO71ZrHVe-C9_KgFWm-z-0FiKN2yMk"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eHuLTAhV31I:APA91bGXw7PLMjuMKWMgNorvB6Q_3QEWYOxu-Gsazlcg_VJEw1sFlwUSJsy7gBG3Sc85Hrkz8SXMX7UhqqeXvnFPbFkT6c32hq3DF9Pg4wcOtYt5zxpCHtVEtRz320CzsYH0-K9xTbB7",
   "keys": {
       "p256dh": "BNfNpbvpuRTFflvyZIygersFNwaxWFPCf3/HObDaRv9ydugJtmQU7aFqwE3HKTlaLXFJ7fegrYOf9e/fVonpHjc=",
       "auth": "ON2mjx7/wf4SNIcMsMPAoA=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '657469074820',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);