const initialState = {
  requesting: false,
  successful: false,
  data:[],
  addBudget:{
    isOpen:false,
    initialValues:false
  }
}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_BUDGET_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'UPDATE_BUDGET_SUC':
      return {
        ...state,
        requesting:false,
        successful:true,
        data:action.data
      }
    case 'TOGGLE_ADD_BUDGET':
      var retVal = {...state}
      var toggleTo=!retVal.addBudget.isOpen
      if(action.override!=null)
        toggleTo=action.override
      retVal.addBudget.isOpen=toggleTo
      retVal.addBudget.initialValues=action.initialValues
      return retVal
    case 'REMOVE_TRANS_FROM_BUDGET':
      var transId = action.transactionId
      var retVal={...state}
      var updatedBudget = []
      retVal.data.map((budgetLine)=>{
        var newBudgetLine = budgetLine
        var newBudgetLineTransactions = budgetLine.transactions.filter((trans)=>
          trans.id!=transId
        )
        newBudgetLine.transactions=newBudgetLineTransactions
        updatedBudget.push(newBudgetLine)
      })
      retVal.data=updatedBudget
      return retVal
    default:
      return state
  }
}

export default reducer
