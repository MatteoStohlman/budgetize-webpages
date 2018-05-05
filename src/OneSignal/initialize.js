export default function InitializeOneSignal(){
  try{
    console.log('in the init function. APP ID:'+process.env.REACT_APP_ONESIGNAL_APP_ID);
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      try{
        OneSignal.init({
          appId: process.env.REACT_APP_ONESIGNAL_APP_ID,
        });
      }catch(e){
        console.log(e);
      }
    });
  }catch(e){
    console.log(e);
  }
}
