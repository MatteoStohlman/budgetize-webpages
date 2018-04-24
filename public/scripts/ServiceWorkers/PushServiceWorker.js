'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
    "icon": "images/ccard.png",
    "vibrate": [200, 100, 200, 100, 200, 100, 400],
    "tag": "request",
    "actions": [
      { "action": "yes", "title": "Yes", },// {/*"icon": "images/yes.png"*/}
      { "action": "no", "title": "No", }// {/*"icon": "images/no.png"*/}
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
