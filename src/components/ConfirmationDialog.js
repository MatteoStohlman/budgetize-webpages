import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import numeral from 'numeral'
//COMPONENTS//
  import Dialog from 'material-ui/Dialog';
  import CircularProgress from 'material-ui/CircularProgress';
  import FlatButton from 'material-ui/FlatButton';

const ConfirmationDialog = ({
  isOpen,close,
  positiveCallback,negativeCallback,
  message='Are you sure?'
})=> {
  const actions = [
    <FlatButton
      label="No"
      primary={true}
      onClick={()=>{
        negativeCallback()
      }}
    />,
    <FlatButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onClick={()=>{
        positiveCallback()
      }}
    />,
  ];
  return(
    <Dialog
      title={message}
      actions={actions}
      modal={false}
      open={isOpen}
      onRequestClose={close}
    >
    </Dialog>
  )
}

ConfirmationDialog.propTypes={
  isOpen:PropTypes.bool.isRequired,
  close:PropTypes.func,
  positiveCallback:PropTypes.func,
  negativeCallback:PropTypes.func,
  message:PropTypes.string,
}

export default compose(
)(ConfirmationDialog)
