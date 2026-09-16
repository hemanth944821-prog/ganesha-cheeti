// Ganesha Cheeti Service Worker for Web Push & PWA Offline Support
const CACHE_NAME = 'ganesha-cheeti-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle Push Notifications received from push server or application
self.addEventListener('push', (event) => {
  let data = { title: 'Ganesha Cheeti (ಗಣೇಶ ಚೀಟಿ)', body: 'Monthly Cheeti reminder alert!' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/ganesha_avatar.png',
    badge: '/ganesha_avatar.png',
    vibrate: [200, 100, 200, 100, 200],
    data: { dateOfArrival: Date.now() },
    actions: [
      { action: 'open', title: 'Open App / ತೆರೆಯಿರಿ' },
      { action: 'close', title: 'Dismiss / ಮುಚ್ಚಿ' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click by user on Android, iOS PWA, or Desktop Chrome
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
