import React from 'react';
import {withState,compose} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import oinkTheme from './theme.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './style.css'
//Components//
  import CategoryManager from 'CategoryManager'
  import MappingManager from 'MappingManager'
  import TransactionsManager from 'TransactionsManager'
  import BudgetManager from 'BudgetManager'
  import Dashboard from 'Dashboard'
  import Login from 'Login'
  import NotificationsBadge from 'Notifications/components/NotificationsBadge'

  import AppBar from 'material-ui/AppBar';
  import Badge from 'material-ui/Badge';
  import IconMenu from 'material-ui/IconMenu';
  import MenuItem from 'material-ui/MenuItem';
  import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
  import IconButton from 'material-ui/IconButton';
  import SvgIcon from 'material-ui/SvgIcon';
  import FA from 'react-fontawesome'
  import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
  import Paper from 'material-ui/Paper';

  import OinkLogo from './logo'

//ACTIONS//
  import {logout} from 'Login/actions'

const Home = ({page,updatePage,user,logout,notifications,selectedPageIndex,updateSelectedPageIndex}) => {
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
      {isLoggedIn && <MenuItem primaryText="Categories" onClick={()=>updatePage('CategoryManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Mappings" onClick={()=>updatePage('MappingManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Transactions" onClick={()=>updatePage('TransactionsManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Budget" onClick={()=>updatePage('BudgetManager')}/>}
      {isLoggedIn && <MenuItem primaryText="Log Out" onClick={()=>logout()}/>}
      {!isLoggedIn && <MenuItem primaryText='Login' onClick={()=>updatePage('Login')}/>}
    </IconMenu>
  );
  var menuItems = ['Mapping','Categories','Home','Budget','Transactions'];
  const BottomMenu = () =>(
    <Paper zDepth={1} style={{position:'fixed',bottom:0}}>
      <BottomNavigation selectedIndex={selectedPageIndex}>
        <BottomNavigationItem
          label={menuItems[0]}
          icon={<SvgIcon><FA name='map-signs' size='2x'/></SvgIcon>}
          onClick={() =>{
            updateSelectedPageIndex(0);
          }}
        />
        <BottomNavigationItem
          label={menuItems[1]}
          icon={<SvgIcon><FA name='columns' size='2x'/></SvgIcon>}
          onClick={() =>{
            updateSelectedPageIndex(1);
          }}
        />
        <BottomNavigationItem
          label={menuItems[2]}
          icon={<SvgIcon><FA name='home' size='2x'/></SvgIcon>}
          onClick={() =>{
            updateSelectedPageIndex(2);
          }}
        />
        <BottomNavigationItem
          label={menuItems[3]}
          icon={<SvgIcon><FA name='list-ol' size='2x'/></SvgIcon>}
          onClick={() =>{
            updateSelectedPageIndex(3);
          }}
        />
        <BottomNavigationItem
          label={menuItems[4]}
          icon={<SvgIcon><FA name='dollar-sign' size='2x'/></SvgIcon>}
          onClick={() =>{
            updateSelectedPageIndex(4);
          }}
        />
      </BottomNavigation>
    </Paper>
  )
  function switchPage(){
    switch(menuItems[selectedPageIndex]){
      case 'Home':
        return(<Dashboard routeTo={updatePage}/>)
      case 'Categories':
        return <CategoryManager routeTo={updatePage}/>
      case 'Mapping':
        return <MappingManager routeTo={updatePage}/>
      case 'Transactions':
        return <TransactionsManager routeTo={updatePage}/>
      case 'Budget':
        return <BudgetManager routeTo={updatePage}/>
      case 'Login':
        return <Login routeTo={updatePage}/>
      case 'test':
        return <OinkLogo/>
      default:
        return(<h1>Default. Selected: {page}</h1>)
    }
  }
  console.log(oinkTheme);
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(oinkTheme)}>
      <AppBar
        title=''
        iconElementLeft={<OinkLogo height={65} style={{marginTop:-9}}/>}
        iconElementRight={<NavigationMenu isLoggedIn={user.data.isLoggedIn}/>}
        style={{position:'fixed',maxHeight:64}}
      />
    <div style={{paddingTop:64}}>
      {switchPage()}
    </div>
    {!user.data.isLoggedIn && <Login routeTo={updatePage} page={page}/>}
    {user.data.isLoggedIn &&  <BottomMenu/>}
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
  withState('page','updatePage','BudgetManager'),
  withState('selectedPageIndex','updateSelectedPageIndex',2),
)(Home)
