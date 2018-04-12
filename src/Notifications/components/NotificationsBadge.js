import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';

const NotificationsBadge = ({style,notifications,...props})=> {
    if(notifications.length>0){
      return(
        <Badge
          badgeContent={notifications.length}
          secondary={true}
          className='badgeWrapper'
          style={{...style}}
        />
      )
    }else{
      return null
    }
}

NotificationsBadge.propTypes={
  style:PropTypes.object
}

const mapStateToProps = state => ({
  notifications:state.notifications.data,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(NotificationsBadge)
