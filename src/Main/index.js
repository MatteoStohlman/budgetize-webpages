import React from 'react';
import {withState,compose} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './style.css'
//Components//
  import CategoryManager from 'CategoryManager'
  import MappingManager from 'MappingManager'
  import TransactionsManager from 'TransactionsManager'
  import BudgetManager from 'BudgetManager'
  import Dashboard from 'Dashboard'
  import Login from 'Login'
  import PlaidLink from 'Plaid/plaidLink'
  import NotificationsBadge from 'Notifications/components/NotificationsBadge'

  import AppBar from 'material-ui/AppBar';
  import Badge from 'material-ui/Badge';
  import IconMenu from 'material-ui/IconMenu';
  import MenuItem from 'material-ui/MenuItem';
  import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
  import IconButton from 'material-ui/IconButton';
  import SvgIcon from 'material-ui/SvgIcon';
  import FA from 'react-fontawesome'

//ACTIONS//
  import {logout} from 'Login/actions'

const Home = ({page,updatePage,user,logout,notifications}) => {
  const NavigationMenu = ({isLoggedIn}) => (
    <IconMenu
      iconButtonElement={
          <IconButton>
            <MoreVertIcon />
            <NotificationsBadge/>
        </IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      {isLoggedIn && <MenuItem primaryText="Home" rightIcon={<NotificationsBadge style={{marginRight:3}}/>} onClick={()=>updatePage('Home')}/>}
      {isLoggedIn && <MenuItem primaryText="Category Manager" onClick={()=>updatePage('CategoryManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Mapping Manager" onClick={()=>updatePage('MappingManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Transactions Manager" onClick={()=>updatePage('TransactionsManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Budget Manager" onClick={()=>updatePage('BudgetManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Sign Out" onClick={()=>logout()}/>}
      {!isLoggedIn && <MenuItem primaryText='Login' onClick={()=>updatePage('Login')}/>}
    </IconMenu>
  );
  function switchPage(){
    switch(page){
      case 'Home':
        return(<Dashboard routeTo={updatePage}/>)
      case 'CategoryManager':
        return <CategoryManager routeTo={updatePage}/>
      case 'MappingManager':
        return <MappingManager routeTo={updatePage}/>
      case 'TransactionsManager':
        return <TransactionsManager routeTo={updatePage}/>
      case 'BudgetManager':
        return <BudgetManager routeTo={updatePage}/>
      case 'Login':
        return <Login routeTo={updatePage}/>
      default:
        return(<h1>Default. Selected: {page}</h1>)
    }
  }
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar
        title="Budgetize"
        iconElementLeft={<SvgIcon style={{marginTop:11}}><FA name='credit-card' style={{color:'white'}} size='2x'/></SvgIcon>}
        iconElementRight={<NavigationMenu isLoggedIn={user.data.isLoggedIn}/>}
      />
    {switchPage()}
      {!user.data.isLoggedIn && <Login routeTo={updatePage} page={page}/>}
      <PlaidLink/>
    </MuiThemeProvider>
  )
}

function mapStateToProps(state){
  return {
    user:state.user,
    notifications:state.notifications.data,
  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    logout:logout
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('page','updatePage','TransactionsManager'),
)(Home)
