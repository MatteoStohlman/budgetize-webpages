import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//

//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const COMPONENT_NAME = ({
  //REDUX

  //STATE

  //PROPS

  //OTHER
  isMobile,...props
})=> {
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
      />
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
