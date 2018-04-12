import moment from 'moment'
const initialState = {
  requesting: false,
  successful: false,
  data:{
    isOpen:false,
    token:null,
    successCallback:false,
    notificationIndex:false,
    bankAccounts:[]
  }
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {
    case 'OPEN_PLAID_LINK':
      var retVal={...state}
      retVal.data.isOpen=true
      retVal.data.token=action.token
      retVal.data.successCallback=action.successCallback?action.successCallback:false
      retVal.data.notificationIndex=action.notificationIndex?action.notificationIndex:false
      return retVal
    case 'CLOSE_PLAID_LINK':
      var retVal={...state}
      retVal.data.isOpen=false
      retVal.data.token=null
      return retVal
    case 'GET_BANK_ACCOUNTS_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'GET_BANK_ACCOUNTS_SUC':
      var retVal={
        ...state,
        requesting:false,
        successful:true
      }
      retVal.data.bankAccounts=action.data
      retVal.data.isOpen=false
      retVal.data.token=null
      return retVal
    default:
      return state
  }
}

export default reducer
