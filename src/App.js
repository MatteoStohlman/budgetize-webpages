/*global Plaid*/

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import PlaidLink from './plaidLink'

class App extends Component {
  handleOnSuccess(token, metadata) {
    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token 
      })
    })
  }
  render() {
    console.log(Plaid)
    return (
      <PlaidLink/>
    )
  }
}

export default App;
