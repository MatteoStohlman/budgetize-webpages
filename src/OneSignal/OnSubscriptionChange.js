var OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  console.log('On Sub Change Triggered')
  OneSignal.on('subscriptionChange', function(isSubscribed) {
    console.log('Is Subbd val:',isSubscribed);
    if (isSubscribed) {
      // The user is subscribed
      //   Either the user subscribed for the first time
      //   Or the user was subscribed -> unsubscribed -> subscribed
      if(localStorage.getItem('token')){
        var userId = JSON.parse(localStorage.getItem('token')).userId
        if(userId){
          console.log('setting tag user_id to :'+userId);
          OneSignal.push(function() {
            /* These examples are all valid */
            OneSignal.sendTag("user_id", user_id);
          });
        }
      }

      // OneSignal.getUserId( function(userId) {
      //   // Make a POST call to your server with the user ID
      // });
    }
  });
});
