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
  import {updateLoginComponent} from './actions'


const CreateAccount = ({
  //REDUX
    updateLoginComponent,isOpen,
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
        label="Save"
        primary={true}
        //disabled={!email || !password}
        onClick={()=>console.log('Creating')}
      />,
    ];
    return (
      <FlexDialog
        title="Create an account"
        actions={actions}
        modal={true}
        open={isOpen}
      >
        <TextField
          hintText="Bob"
          floatingLabelText="First Name"
        />
        <TextField
          hintText="Saget"
          floatingLabelText="Last Name"
        />
        <TextField
          hintText="test@email.com"
          floatingLabelText="Email"
        />
        <TextField
          type='password'
          hintText="password123"
          floatingLabelText="Password"
        />
      </FlexDialog>
    )
}

CreateAccount.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isOpen:state.user.components.CreateAccount.isOpen
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateLoginComponent:updateLoginComponent
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(CreateAccount)
