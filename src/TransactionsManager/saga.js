//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getTransactions,ignoreTransaction,addNotes} from 'api/transactions'

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
      yield put({type:'REMOVE_TRANS_FROM_BUDGET',transactionId:transactionId})
    }

  } catch (error) {
    console.log(error)

  }
}

function* addNotesFlow(action){
  try {
    const {transId,notes} = action
    const response = yield call(addNotes,transId,notes)
    if(response.status){
      //yield put({type:'ADD_TRANSACTION_NOTES_SUC',data:response.payload,transId:transactionId})
      yield put({type:'UPDATE_TRANSACTION_COMPONENT',componentName:'AddNotes',values:{isOpen:false,isLoad:false,value:null,transaction:null}})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_TRANS_REQ', updateUncattedTransFlow)
  yield takeLatest('IGNORE_TRANS_REQ', ignoreTransactionFlow)
  yield takeLatest('ADD_TRANSACTION_NOTES_REQ', addNotesFlow)
}

export default templateWatcher
