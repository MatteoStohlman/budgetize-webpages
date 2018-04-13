//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getTransactions,ignoreTransaction} from 'api/transactions'

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

function* ignoreTransactionFlow(action){
  try {
    const {transactionId} = action
    const response = yield call(ignoreTransaction,transactionId)
    if(response.status){
      yield put({type:'IGNORE_TRANS_SUC',data:response.payload,transId:transactionId})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_TRANS_REQ', updateUncattedTransFlow)
  yield takeLatest('IGNORE_TRANS_REQ', ignoreTransactionFlow)
}

export default templateWatcher
