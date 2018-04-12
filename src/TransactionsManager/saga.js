//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getTransactions} from 'api/transactions'

function* updateUncattedTransFlow(action){
  try {

    const response = yield call(getTransactions)
    if(response.status){
      yield put({type:'UPDATE_TRANS_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_TRANS_REQ', updateUncattedTransFlow)
}

export default templateWatcher
