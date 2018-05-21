/*global Plaid*/
//IMPORTS
  //SYSTEM
    import React, { Component } from 'react'
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import { createBrowserHistory, createHashHistory } from 'history'
  //STYLE
    import './App.css'
    //import 'react-toastify/dist/ReactToastify.min.css'
    import 'react-table/react-table.css'
    import 'scss/toast.css'
  //NODE_MODULES
    import { ToastContainer, toast, style } from 'react-toastify'
  //COMPONENTS
    import Main from './Main'
    import PlaidLink from './plaidLink'
    import { configureHistory } from 'configureHistory.js'

function onAuthRequired({history}) {
  history.push('/login');
}
const toastStyle={
  default:{
    colorDefault: 'black',
  }
}
const history = configureHistory()
class App extends Component {
  render() {
    return(
        <div>
          <ToastContainer
            autoClose={4000}
            progressClassName='default-toast-progress'
            style={{zIndex:999999,colorDefault:'fff'}}
          />
          <Router history={history}>
            <div>
              <Route path='/' exact={true} component={Main} />
              <Route path='/plaid' exact={true} component={PlaidLink} />
            </div>
          </Router>
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
