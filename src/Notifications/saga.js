//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getNotifications} from 'api/notifications'
  import {getPublicToken} from 'api/plaid'

function* updateNotificationsFLow(action){
  try {
    var {userId} = action
    const response = yield call(getNotifications,userId)
    if(response.status){
      yield put({type:'UPDATE_NOTIFICATIONS_SUC',data:response.payload})
    }

  } catch (error) {
    console.log(error)

  }
}

function* updatePlaidLinkFlow(action){
  try {
    var {accessToken,notificationIndex} = action
    const response = yield call(getPublicToken,accessToken)
    if(response.status){
      yield put({type:'OPEN_PLAID_LINK',token:response.payload.public_token,notificationIndex:notificationIndex})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_NOTIFICATIONS_REQ', updateNotificationsFLow)
  yield takeLatest('OPEN_UPDATE_PLAID_LINK_REQ', updatePlaidLinkFlow)

}

export default templateWatcher
