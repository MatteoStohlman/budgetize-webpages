import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';

//COMPONENTS//
  import FlexDialog from 'components/FlexDialog'
  import TextField from 'material-ui/TextField';
  import FlatButton from 'material-ui/FlatButton';
//ACTIONS//
  import {updateLoginComponent,createAccount} from './actions'


const CreateAccount = ({
  //REDUX
    updateLoginComponent,isOpen,createAccount,isLoading,
  //STATE
    email,updateEmail,
    password,updatePassword,
    firstName,updateFirstName,
    lastName,updateLastName,
  //OTHER
    ...props
})=> {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>updateLoginComponent('CreateAccount',{isOpen:false})}
      />,
      <FlatButton
        label="Sign Up!"
        primary={true}
        //disabled={!email || !password}
        onClick={()=>{
          updateLoginComponent("CreateAccount",{isLoading:true})
          createAccount(
            firstName,
            lastName,
            email,
            password,
            ()=>updateLoginComponent("CreateAccount",{isLoading:false,isOpen:false})
          )
        }}
      />,
    ];
    return (
      <FlexDialog
        title="Create an account"
        actions={actions}
        modal={true}
        open={isOpen}
        isLoading={isLoading}
      >
        <TextField
          hintText="Bob"
          floatingLabelText="First Name"
          onChange={(e,value)=>updateFirstName(value)}
        />
        <TextField
          hintText="Saget"
          floatingLabelText="Last Name"
          onChange={(e,value)=>updateLastName(value)}
        />
        <TextField
          hintText="test@email.com"
          floatingLabelText="Email"
          onChange={(e,value)=>updateEmail(value)}
        />
        <TextField
          type='password'
          hintText="password123"
          floatingLabelText="Password"
          onChange={(e,value)=>updatePassword(value)}
        />
      </FlexDialog>
    )
}

CreateAccount.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isOpen:state.user.components.CreateAccount.isOpen,
  isLoading:state.user.components.CreateAccount.isLoading
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateLoginComponent:updateLoginComponent,
    createAccount:createAccount,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('firstName','updateFirstName',''),
  withState('lastName','updateLastName',''),
  withState('email','updateEmail',''),
  withState('password','updatePassword',''),
)(CreateAccount)
