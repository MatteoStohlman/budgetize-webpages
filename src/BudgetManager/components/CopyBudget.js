import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import FlexDialog from 'components/FlexDialog'
//ACTIONS//

const COMPONENT_NAME = ({
  //REDUX
    isLoading,isOpen,
  //STATE

  //PROPS

  //OTHER
  ...props
})=> {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>console.log('Cancel CopyBudget')}
      />,
      <FlatButton
        label="Save Budget"
        secondary={true}
        onClick={()=>console.log('Submit Copy Budget')}
        disabled={isLoading}
      />,
    ];
    return (
      <FlexDialog
        open={isOpen}
        actions={actions}
        title='Copy Budget'
      >

      </FlexDialog>
    )
}

TextInput.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isOpen:state.budget.components.CopyBudget.isOpen,
  isLoading:state.budget.components.CopyBudget.isLoading,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
