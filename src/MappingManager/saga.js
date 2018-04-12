//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getUserMappings} from 'api/mapping'

function* updateMappingsFlow(action){
  try {

    const response = yield call(getUserMappings)
    if(response.status){
      yield put({type:'UPDATE_MAPPINGS_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_MAPPINGS_REQ', updateMappingsFlow)
}

export default templateWatcher
