const applicationServerPublicKey = 'BF35lsySobe02N1xQ-RIPFJ-lNgUEqy9ydwsTqmKQi_NuPS5SKf5iSoiVcTXe--9krSEGRuilCOcUNKCisr4Tnk';
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
var token=false;
console.log(localStorage.getItem('token'));
if(localStorage.getItem('token')){
  token = JSON.parse(localStorage.getItem('token')).userId
}
console.log(token);


function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


//REGISTER SERVICE WORKER//
if ('serviceWorker' in navigator && 'PushManager' in window && token) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./scripts/ServiceWorkers/PushServiceWorker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;

    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    }).then(function(subscription) {
      console.log('User is subscribed.');
      console.log(subscription,JSON.stringify(subscription))
    })
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
}else{
  console.warn('Push messaging is not supported or user not loged in');
}
