import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import FlexDialog from 'components/FlexDialog'
//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const COMPONENT_NAME = ({
  //REDUX

  //STATE

  //PROPS

  //OTHER
  ...props
})=> {
    const actions = [
      <FlatButton
        label='Add Category'
        primary={true}
        onClick={()=>updateShowAddCategory(true)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>{
          toggle();
          cancelCallback?cancelCallback():null;
        }}
      />
    ];
    return (
      <FlexDialog
        title="Add A Mapping"
        actions={actions}
        modal={true}
        open={isOpen}
      >
    )
}

COMPONENT_NAME.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:false}}),
  //withState('activeTab','updateActiveTab','search')
)(COMPONENT_NAME)
