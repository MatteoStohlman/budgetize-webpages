//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {login} from 'api/login'

function* loginFlow(action){
  try {
    var {email,password} = action
    const response = yield call(login,email,password)
    if(response.status){
      yield put({type:'LOGIN_SUC',data:response.payload})
      window.location.reload()
      localStorage.setItem('token', JSON.stringify(response.payload.token))
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('LOGIN_REQ', loginFlow)
}

export default templateWatcher
