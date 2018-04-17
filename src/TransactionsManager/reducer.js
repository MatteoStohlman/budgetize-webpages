const componentState=(isOpen=false,value=null,isLoading=false)=>({
  isOpen:isOpen,
  value:value,
  isLoading:isLoading,
})
const initialState = {
  requesting: false,
  successful: false,
  data:[],
  components:{
    AddNotes:{
      isOpen:false,
      value:null,
      isLoading:false,
      transaction:null
    },
    SplitTransaction:{
      ...componentState(),
      targetTransaction:null,
      splitTransaction:{
        name:null,
        value:null,
        category:null,
      },
      valueTotal:0
    }
  }
}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TRANSACTION_COMPONENT':
      var retVal=JSON.parse(JSON.stringify({...state}))
      if(action.values=='DEFAULT')
        var newValues = initialState.components[action.componentName]
      else
        var newValues = Object.assign(retVal.components[action.componentName],action.values)
      retVal.components[action.componentName]=newValues
      return retVal
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
      if(retVal.data.uncategorizedTransactions)
        retVal.data.uncategorizedTransactions = retVal.data.uncategorizedTransactions.filter((trans)=>(trans.id!=transId))
      if(retVal.data.latestTransactions)
        retVal.data.latestTransactions = retVal.data.latestTransactions.filter((trans)=>(trans.id!=transId))
      return retVal
    default:
      return state
  }
}

export default reducer
