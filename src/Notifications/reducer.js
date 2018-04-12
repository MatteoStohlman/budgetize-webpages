const initialState = {
  requesting: false,
  successful: false,
  data:[]
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case 'LOGIN_SUC':
      if(action.data.expiredTokens.length){
        var retVal={...state}
        action.data.expiredTokens.map((token)=>{
          retVal.data.push({type:'EXPIRED_ACCESS_TOKEN',data:{token:token}})
        })
        return retVal;
      }
    case 'UPDATE_NOTIFICATIONS_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'REMOVE_NOTIFICATION':
      var retVal = {...state}
      var newNotificationsArray = JSON.parse(JSON.stringify(retVal.data));
      newNotificationsArray.splice(action.index, 1)
      retVal.data=newNotificationsArray
      return retVal
    case 'UPDATE_NOTIFICATIONS_SUC':
      return {
        ...state,
        requesting:false,
        successful:true,
        data:action.data
      }
    default:
      return state
  }
}

export default reducer
