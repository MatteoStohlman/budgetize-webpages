import moment from 'moment'
import InitializeOneSignal from 'OneSignal/initialize'
const initialState = {
  requesting: false,
  successful: false,
  data:{
    isLoggedIn:false,
    user:{}
  },
  components:{
    CreateAccount:{
      isOpen:false,
      isLoading:false,
    },
    OneSignal:{
      initialized:false
    }
  }
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case 'LOGIN_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'LOGIN_SUC':
      InitializeOneSignal()
      var retVal={
        ...state,
        requesting:false,
        successful:true,
      }
      retVal.data.isLoggedIn=true
      retVal.data.user.firstName=action.data.first_name
      retVal.data.user.lastName=action.data.last_name
      retVal.components.OneSignal.initialized=true
      return retVal
    case 'LOGOUT':
      var retVal = {...state}
      retVal.data.isLoggedIn=false
      retVal.data.user={}
      retVal.requesting=false
      retVal.successful=false
      localStorage.removeItem('token')
      return retVal
    case 'UPDATE_LOGIN_COMPONENT':
      var retVal=JSON.parse(JSON.stringify({...state}))
      if(action.values=='DEFAULT')
        var newValues = initialState.components[action.componentName]
      else
        var newValues = Object.assign(retVal.components[action.componentName],action.values)
      retVal.components[action.componentName]=newValues
      return retVal
    default:
      try{
        if(!state.components.OneSignal.initialized)
          InitializeOneSignal()
        var loginExpiration = moment(JSON.parse(localStorage.getItem('token')).expires_at,'YYYY-MM-DD HH:mm')
        var isLoginActive = moment().isBefore(loginExpiration)
        var retVal={...state}
        retVal.data.isLoggedIn=isLoginActive
        retVal.components.OneSignal.initialized=true
      }catch(e){
        var retVal={...state}
        retVal.data.isLoggedIn=false
      }
      return retVal
  }
}

export default reducer
