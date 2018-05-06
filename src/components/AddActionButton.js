import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FloatingActionButton from 'material-ui/FloatingActionButton';
  import ContentAdd from 'material-ui/svg-icons/content/add';
//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const AddActionButton = ({
  //REDUX

  //STATE

  //PROPS
    style,
  //OTHER
  isMobile,...props
})=> {
    return (
      <FloatingActionButton
        style={{position:'fixed',bottom:70,right:10,zIndex:10,...style}}
        {...props}
      >
        <ContentAdd />
      </FloatingActionButton>
    )
}

AddActionButton.propTypes={
  //label:PropTypes.string.isRequired
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
)(AddActionButton)
