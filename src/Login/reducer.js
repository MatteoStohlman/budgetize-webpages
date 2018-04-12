import moment from 'moment'
const initialState = {
  requesting: false,
  successful: false,
  data:{
    isLoggedIn:false,
    user:{}
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
      var retVal={
        ...state,
        requesting:false,
        successful:true,
      }
      retVal.data.isLoggedIn=true
      retVal.data.user.firstName=action.data.first_name
      retVal.data.user.lastName=action.data.last_name
      return retVal
    case 'LOGOUT':
      var retVal = {...state}
      retVal.data.isLoggedIn=false
      retVal.data.user={}
      retVal.requesting=false
      retVal.successful=false
      localStorage.removeItem('token')
      return retVal
    default:
      try{
        var loginExpiration = moment(JSON.parse(localStorage.getItem('token')).expires_at,'YYYY-MM-DD HH:mm')
        var isLoginActive = moment().isBefore(loginExpiration)
        var retVal={...state}
        retVal.data.isLoggedIn=isLoginActive
      }catch(e){
        var retVal={...state}
        retVal.data.isLoggedIn=false
      }
      return retVal
  }
}

export default reducer
