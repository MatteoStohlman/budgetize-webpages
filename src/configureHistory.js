// configureHistory.js
import React, { Component } from 'react'
import { createBrowserHistory, createHashHistory } from 'history'

export function configureHistory() {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
