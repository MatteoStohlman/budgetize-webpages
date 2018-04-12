//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'
  import {toast} from 'react-toastify'
  import {store} from "index"//store.dispatch()

//APIs
  import {addBankAccount,getBankAccounts} from 'api/plaid'
//ACTIONS
  import {updateBankAccounts} from 'Plaid/actions'

function* addBankAccountFlow(action){
  try {
    var {public_token,accounts,institution,link_session_id} = action
    const response = yield call(addBankAccount,public_token,accounts,institution,link_session_id)
    if(response.status){
      yield put({type:'ADD_BANK_ACCOUNT_SUCC',data:response.payload})
      store.dispatch(updateBankAccounts())
      toast.success('Bank Account Created')
    }

  } catch (error) {
    console.log(error)

  }
}

function* getBankAccountsFlow(action){
  try {
    const response = yield call(getBankAccounts)
    if(response.status){
      yield put({type:'GET_BANK_ACCOUNTS_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('ADD_BANK_ACCOUNT_REQ', addBankAccountFlow)
  yield takeLatest('GET_BANK_ACCOUNTS_REQ', getBankAccountsFlow)

}

export default templateWatcher
