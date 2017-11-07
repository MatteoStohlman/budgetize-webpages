/*global Plaid*/
//IMPORTS
  //SYSTEM
    import React, { Component } from 'react'
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
  //STYLE  
    import './App.css'
    import 'react-toastify/dist/ReactToastify.min.css'
  //NODE_MODULES
    import { ToastContainer, toast } from 'react-toastify'
  //COMPONENTS
    import PlaidLink from './plaidLink'
    import Home from './login/home'
    import Login from './login/login';
    import Protected from './login/protected';


const config = {
  issuer: 'https://dev-481660.oktapreview.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oacqlu6f2SNDYwf00h7'
}

function onAuthRequired({history}) {
  history.push('/login');
}
class App extends Component {
  render() {
    console.log(Plaid)
    return(
        <div>
          <ToastContainer 
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <Router>
            <Security issuer={config.issuer}
                      client_id={config.clientId}
                      redirect_uri={config.redirectUri}
                      onAuthRequired={onAuthRequired} >
              <Route path='/' exact={true} component={Home} />
              <SecureRoute path='/protected' component={Protected} />
              <Route path='/login' render={() => <Login baseUrl='https://dev-481660.oktapreview.com' />} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
              <SecureRoute path='/link' component={PlaidLink}/>
            </Security>
          </Router>
            {/*<PlaidLink/>*/}
            {/*<PrivateRoute path='/dashboard' component={LoadsList}/>*/}
        </div>
    ) 
  }
}
function mapStateToProps(state){
  return {
    
  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    
  },dispatch)
}


export default connect(mapStateToProps,matchDispatchToProps)(App);
