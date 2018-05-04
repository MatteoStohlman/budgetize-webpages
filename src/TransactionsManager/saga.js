//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'
  import {toast} from 'react-toastify'
//APIs
  import {getTransactions,ignoreTransaction,addNotes,splitTransaction,categorizeTransaction} from 'api/transactions'

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
    const {transactionId,callback} = action
    const response = yield call(ignoreTransaction,transactionId)
    if(response.status){
      yield call(callback)
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
      yield put({type:'UPDATE_TRANSACTION_COMPONENT',componentName:'AddNotes',values:{isOpen:false,isLoading:false,value:null,transaction:null}})
    }

  } catch (error) {
    console.log(error)

  }
}

function* splitTransactionFlow(action){
  try {
    yield put({type:'UPDATE_TRANSACTION_COMPONENT',componentName:'SplitTransaction',values:{isLoading:true}})
    const response = yield call(splitTransaction,action.payload)
    if(response.status){
      yield put({type:'UPDATE_TRANS_REQ'})
      yield put({type:'UPDATE_TRANSACTION_COMPONENT',componentName:'SplitTransaction',values:"DEFAULT"})
      yield put({type:'SPLIT_TRANSACTION_SUC'})
    }else{
      yield put({type:'SPLIT_TRANSACTION_ERR'})
    }

  } catch (error) {
    console.log(error)

  }
}

function* categorizeTransactionFlow(action){
  try {
    const {categoryId,transactionId,callback} = action
    const response = yield call(categorizeTransaction,transactionId,categoryId)
    if(response.status){
      if(callback)
        yield call(callback)
      yield put({type:'UPDATE_TRANS_REQ'})
      yield put({type:'CATEGORIZE_TRANSACTION_SUC'})
    }else{
      yield put({type:'CATEGORIZE_TRANSACTION_ERR'})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_TRANS_REQ', updateUncattedTransFlow)
  yield takeLatest('IGNORE_TRANS_REQ', ignoreTransactionFlow)
  yield takeLatest('ADD_TRANSACTION_NOTES_REQ', addNotesFlow)
  yield takeLatest('SPLIT_TRANSACTION_REQ', splitTransactionFlow)
  yield takeLatest('CATEGORIZE_TRANSACTION_REQ', categorizeTransactionFlow)
}

export default templateWatcher
