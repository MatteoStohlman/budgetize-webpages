//IMPORTS
  //SYSTEM
    import React, { Component } from 'react'
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import {withState,compose} from 'recompose';

  //STYLE

  //NODE_MODULES

  //ACTIONS
    import {login} from './actions'

  //COMPONENTS
    import Dialog from 'material-ui/Dialog';
    import FlatButton from 'material-ui/FlatButton';
    import RaisedButton from 'material-ui/RaisedButton';
    import TextField from 'material-ui/TextField';
    import CircularProgress from 'material-ui/CircularProgress';

const Login = ({email,password,login,updateEmail,updatePassword,routeTo,page,isLoggingIn}) => {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>console.log('Not Sure What To Do About That')}
      />,
      <FlatButton
        label="Login"
        primary={true}
        disabled={!email || !password}
        onClick={()=>login(email,password)}
      />,
    ];
    return (
      <Dialog
        title="Login To Get Started"
        actions={actions}
        modal={true}
        open={true}
      >
        {isLoggingIn && <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>}
        <TextField
          hintText="user@gmail.com"
          floatingLabelText='Email'
          label='email'
          fullWidth={true}
          onChange={(e,value)=>updateEmail(value)}
        />
        <TextField
          hintText="password123"
          floatingLabelText="Password"
          type="password"
          fullWidth={true}
          onChange={(e,value)=>updatePassword(value)}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              login(email,password)
              ev.preventDefault();
            }
          }}
        />
      </Dialog>
    )
}

function mapStateToProps(state){
  return {
    isLoggingIn:state.user.requesting,
  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    login:login
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('email','updateEmail',''),
  withState('password','updatePassword',''),
)(Login)
