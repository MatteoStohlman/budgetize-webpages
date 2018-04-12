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
  //import {openUpdatePlaidLink,removeNotification} from '../actions'


const UncategorizedTransactions = ({data,notificationIndex,routeTo,...props})=> {
    return (
      <ListItem
        primaryText={data?'You have '+data+' uncategorized transactions':' You have uncategorized transactions'}
        leftIcon={<SvgIcon><FA name='exchange-alt'/></SvgIcon>}
        onClick={()=>routeTo('TransactionsManager')}
      />
    )
}

UncategorizedTransactions.propTypes={
  data:PropTypes.object.isRequired,
  notificationIndex:PropTypes.number.isRequired,
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(UncategorizedTransactions)
