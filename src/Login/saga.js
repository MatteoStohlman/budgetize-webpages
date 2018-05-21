//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'
  import {toast} from 'react-toastify'
  import moment from 'moment'
//APIs
  import {login,loginV2} from 'api/login'
  import {createAccount} from 'api/user'

function* loginFlow(action){
  try {
    var {email,password} = action
    const response = yield call(loginV2,email,password)
    if(response.id){
      yield put({type:'LOGIN_SUC',data:response})
      //window.location.reload()
      let token = response
      token.value=token.session_token
      token.userId=token.id
      token.expires_at=moment().add(1,'hours').format('YYYY-MM-DD HH:mm')
      localStorage.setItem('token', JSON.stringify(token))
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
