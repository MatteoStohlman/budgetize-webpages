export default function SaveOnesignalId(){
  var OneSignal = window.OneSignal || [];
  OneSignal.isPushNotificationsEnabled(function(isEnabled) {
    if (isEnabled) {
        // user has subscribed
        OneSignal.getUserId( function(userId) {
            console.log('player_id of the subscribed user is : ' + userId);
            // Make a POST call to your server with the user ID
        });
    }
  });
}
OneSignal.push(function() {
  /* These examples are all valid */
  OneSignal.sendTag("key", "value");

  OneSignal.sendTag("key", "value", function(tagsSent) {
    // Callback called when tags have finished sending
  });

  OneSignal.sendTag("key", "value").then(function(tagsSent) {
    // Callback called when tags have finished sending
  });
});

OneSignal.push(function() {
  OneSignal.on('subscriptionChange', function(isSubscribed) {
    if (isSubscribed) {
      // The user is subscribed
      //   Either the user subscribed for the first time
      //   Or the user was subscribed -> unsubscribed -> subscribed
      OneSignal.getUserId( function(userId) {
        // Make a POST call to your server with the user ID
      });
    }
  });
});
