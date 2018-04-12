//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getUserCategories} from 'api/categories'

function* updateCategoriesFlow(action){
  try {

    const response = yield call(getUserCategories)
    if(response.status){
      yield put({type:'UPDATE_CATEGORIES_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_CATEGORIES_REQ', updateCategoriesFlow)
}

export default templateWatcher
