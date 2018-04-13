const initialState = {
  requesting: false,
  successful: false,
  data:[]
}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TRANS_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'UPDATE_TRANS_SUC':
      return {
        ...state,
        requesting:false,
        successful:true,
        data:action.data
      }
    case 'IGNORE_TRANS_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'IGNORE_TRANS_SUC':
      var transId = action.transId
      var retVal={
        ...state,
        requesting:false,
        successful:true,
      }
      retVal.data.uncategorizedTransactions = retVal.data.uncategorizedTransactions.filter((trans)=>(trans.id!=transId))
      retVal.data.latestTransactions = retVal.data.latestTransactions.filter((trans)=>(trans.id!=transId))
      return retVal
    default:
      return state
  }
}

export default reducer
