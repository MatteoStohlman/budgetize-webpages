export default function InitializeOneSignal(){
  console.log('in the init function. APP ID:'+process.env.REACT_APP_ONESIGNAL_APP_ID);
  var OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL_APP_ID,
    });
  });
}
