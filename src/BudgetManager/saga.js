//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getUserBudget} from 'api/budget'

function splitTransactionsString(transactionsString){
  if(!transactionsString){return []}
  var transactions = transactionsString.split('|||')
  let newBudgetLineTransactions=[]
  transactions.map((transaction)=>{
    var transValues = transaction.split("~")
    newBudgetLineTransactions.push({
      id:transValues[0],
      name:transValues[1],
      date:transValues[2],
      value:transValues[3],
      notes:transValues[4],
    })
  })
  return newBudgetLineTransactions
}

function* updateBudgetFlow(action){
  try {
    var {month,year} = action
    const response = yield call(getUserBudget,false,month,year)
    if(response.status){
      //START Convert Transactions String to Transactions Array
        response.payload.map((budgetLine,budgetIndex)=>{
          budgetLine.transactionsString=budgetLine.transactions
          var transactionsArray = splitTransactionsString(budgetLine.transactionsString)
          budgetLine.transactions=transactionsArray
        })
      //END Convert Transactions String to Transactions Array
      yield put({type:'UPDATE_BUDGET_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_BUDGET_REQ', updateBudgetFlow)
}

export default templateWatcher
