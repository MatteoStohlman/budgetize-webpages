import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import './style.css'
//HOCS//
  import Mobile from 'HOC/mobile'
//COMPONENTS//
  import Dialog from 'material-ui/Dialog';
const FlexDialog = ({isMobile,children,...props})=> {
    const isMobileStyle_content={
      transform: 'translate(0px, 10px)',
      width:'95%',
    }
    console.log(isMobile)
    return (
      <Dialog
        {...props}
        contentStyle={isMobile?{...props.contentStyle,...isMobileStyle_content}:{...props.contentStyle}}
        className={isMobile?props.className+' mobile-dialog-root':props.className}
      >
        {children}
      </Dialog>
    )
}

FlexDialog.propTypes={
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
  //connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(FlexDialog)
