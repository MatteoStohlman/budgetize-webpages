//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getUserBudget} from 'api/budget'

function* updateBudgetFlow(action){
  try {
    var {month,year} = action
    const response = yield call(getUserBudget,false,month,year)
    if(response.status){
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
