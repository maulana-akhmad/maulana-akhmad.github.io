importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: 'manifest.json', revision: '1' },
    { url: '/', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/squad.html', revision: '1' },
    { url: '/pages/home.html', revision: '1'},
    { url: '/pages/saved.html', revision: '1'},
    { url: '/pages/squad.html', revision: '1'},
    { url: '/css/materialize.min.css', revision: '1'},
    { url: '/css/custom.css', revision: '1'},
    { url: '/js/materialize.min.js', revision: '1'},
    { url: '/js/nav.js', revision: '1'},
    { url: '/js/main.js', revision: '1'},
    { url: '/js/api.js', revision: '1'},
    { url: '/js/squad.js', revision: '1'},
    { url: '/js/sw.js', revision: '1'},
    { url: '/js/idb.js', revision: '1'},
    { url: '/js/db.js', revision: '1'},
    { url: '/js/getdb.js', revision: '1'},
    { url: '/images/custom-192.png', revision: '1'},
    { url: '/images/icon-48.png', revision: '1'},
    { url: '/images/icon-72.png', revision: '1'},
    { url: '/images/icon-96.png', revision: '1'},
    { url: '/images/icon-144.png', revision: '1'},
    { url: '/images/icon-192.png', revision: '1'},
    { url: '/images/icon-512.png', revision: '1'},
    { url: '/images/dicoding.png', revision: '1'},
    { url: '/images/konten.jpg', revision: '1'},
    { url: '/images/psg.svg', revision: '1'},
    { url: '/images/psg-bg.jpg', revision: '1'}
], {
  ignoreUrlParametersMatching: [/.*/]
});
  
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'squad-chache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);

    self.addEventListener('push', function(event) {
      var body;
      if (event.data) {
        body = event.data.text();
      } else {
        body = 'Push message no payload';
      }
      var options = {
        body: body,
        icon: 'images/icon-48.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      event.waitUntil(
        self.registration.showNotification('Push Notification', options)
      );
    });