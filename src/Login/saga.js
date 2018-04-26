//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'
  import {toast} from 'react-toastify'
//APIs
  import {login} from 'api/login'
  import {createAccount} from 'api/user'

function* loginFlow(action){
  try {
    var {email,password} = action
    const response = yield call(login,email,password)
    if(response.status){
      yield put({type:'LOGIN_SUC',data:response.payload})
      //window.location.reload()
      localStorage.setItem('token', JSON.stringify(response.payload.token))
    }

  } catch (error) {
    console.log(error)

  }
}

function* createAccountFlow(action){
  try {
    var {email,password,firstName,lastName,callback} = action
    const response = yield call(createAccount,email,password,firstName,lastName)
    if(response.status){
      toast.success('Account created, login to get started')
      yield call(callback)
      yield put({type:'CREATE_ACCOUNT_SUC',data:response.payload})
    }

  } catch (error) {
    yield put({type:'CREATE_ACCOUNT_ERR',error:error})
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('LOGIN_REQ', loginFlow)
  yield takeLatest('CREATE_ACCOUNT_REQ', createAccountFlow)
}

export default templateWatcher
