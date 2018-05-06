//IMPORTS
  //SYSTEM
    import React, { Component } from 'react'
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import {withState,compose} from 'recompose';
  //HOC//

  //STYLE

  //NODE_MODULES

  //ACTIONS
    import {login,updateLoginComponent} from './actions'

  //COMPONENTS
    import Dialog from 'material-ui/Dialog';
    import FlatButton from 'material-ui/FlatButton';
    import RaisedButton from 'material-ui/RaisedButton';
    import TextField from 'material-ui/TextField';
    import CircularProgress from 'material-ui/CircularProgress';
    import FlexDialog from 'components/FlexDialog'
    import CreateAccount from './CreateAccount'

const Login = ({email,password,login,updateEmail,updatePassword,routeTo,page,isLoggingIn,updateLoginComponent}) => {
    const actions = [
      <FlatButton
        label="Create Account"
        primary={true}
        onClick={()=>updateLoginComponent('CreateAccount',{isOpen:true})}
      />,
      <FlatButton
        label="Login"
        primary={true}
        disabled={!email || !password}
        onClick={()=>login(email,password)}
      />,
    ];
    return (
      <div>
        <FlexDialog
          title="Login To Get Started"
          actions={actions}
          modal={true}
          open={true}
          //overlayStyle={{backgroundColor:'rgb(255,255,255,1)'}}
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
        </FlexDialog>
        <CreateAccount/>
      </div>
    )
}

function mapStateToProps(state){
  return {
    isLoggingIn:state.user.requesting,
  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    login:login,
    updateLoginComponent:updateLoginComponent,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('email','updateEmail',''),
  withState('password','updatePassword',''),
)(Login)
