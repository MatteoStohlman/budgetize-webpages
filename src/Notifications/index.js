import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';

//COPONENTS//
  import TokenExpiration from './components/TokenExpiration'
  import UncategorizedTransactions from './components/UncategorizedTransactions'
  import UnbudgetedCategories from './components/UnbudgetedCategories'
  import CircularProgress from 'material-ui/CircularProgress';
  import NotificationsBadge from 'Notifications/components/NotificationsBadge'
//ACTIONS
  import {updateNotifications} from './actions'

const Notifications = ({notifications,isLoading,updateNotifications,routeTo,...props})=> {
    const GenericNotification = ({data,...props})=>{
      <ListItem
        primaryText={data.value}
      />
    }
    function getState(){
      if(isLoading && !notifications.length){
        return 'loading'
      }else if(isLoading && notifications.length){
        return 'showNotifications'
      }else if(!isLoading && notifications.length){
        return 'showNotifications'
      }else if(!isLoading && !notifications.length){
        return 'showNoNotifications'
      }else{
        return 'unknown'
      }
    }
    console.log(routeTo)
    return (
      <div>
        <h2 style={{marginLeft:5}}>Notifications</h2>
        <List>
          {getState()=='loading' && <CircularProgress size={30} thickness={4} style={{position:'absolute',right:5,top:5}}/>}
          {getState()=='showNotifications' &&
            notifications.map((notification,index)=>{
              switch (notification.type){
                case 'EXPIRED_ACCESS_TOKEN':
                  return <TokenExpiration data={notification.data} notificationIndex={index}/>
                case 'UNCATEGORIZED_TRANSACTIONS':
                  return <UncategorizedTransactions data={notification.data} notificationIndex={index} routeTo={routeTo}/>
                case 'UNBUDGETED_CATEGORIES':
                  return <UnbudgetedCategories data={notification.data} notificationIndex={index} routeTo={routeTo}/>
                default:
                  return <GenericNotification data={notification.data} notificationIndex={index}/>
              }
            })
          }
          {getState()=='showNoNotifications' &&
            <p>No notifications at this time</p>
          }
        </List>
      </div>
    )
}

Notifications.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isLoading:state.notifications.requesting,
  notifications:state.notifications.data
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateNotifications:updateNotifications
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  lifecycle({
    componentDidMount(){
      this.props.updateNotifications()
    }
  })
)(Notifications)
