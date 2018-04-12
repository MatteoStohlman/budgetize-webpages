import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import FA from 'react-fontawesome'
import FlatButton from 'material-ui/FlatButton';

//ACTIONS//
import {openUpdatePlaidLink,removeNotification} from '../actions'


const TokenExpiration = ({data,openUpdatePlaidLink,removeNotification,notificationIndex,...props})=> {
    function callback(){
      removeNotification(notificationIndex)
    }
    return (
      <ListItem
        primaryText={data.custom_account_name?data.custom_account_name:''+' authentication is out of date. Click to update.'}
        leftIcon={<SvgIcon><FA name='university'/></SvgIcon>}
        onClick={()=>
          openUpdatePlaidLink(
            data.token,
            String(notificationIndex)
          )
        }
      />
    )
}

TokenExpiration.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    openUpdatePlaidLink:openUpdatePlaidLink,
    removeNotification:removeNotification,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(TokenExpiration)
