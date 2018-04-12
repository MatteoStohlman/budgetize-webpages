import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import GridLayout from 'react-grid-layout';
import 'scss/react-grid-layout.css'
import 'scss/react-resizable.css'
import Paper from 'material-ui/Paper';

//Components//
import AddAccount from './components/Accounts'
import Notifications from 'Notifications'
import AddBudget from 'BudgetManager/components/AddBudget'

//ACTIONS//
  import {updateNotifications} from 'Notifications/actions'

const Home = ({page,updatePage,routeTo,updateNotifications,categories}) => {
    var layout = [
      {i: 'AddAccount', x: 6, y: 0, w: 7, h: 12},
      {i: 'Notifications', x: 0, y: 0, w: 5, h: 15},
    ];
    var draggableDivStyle={
      overflow:'hidden',
    }
    return (
      <div>
        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={document.documentElement.clientWidth}>
          <Paper key="AddAccount" style={draggableDivStyle}><AddAccount /></Paper>
          <Paper key="Notifications" style={draggableDivStyle}><Notifications routeTo={routeTo}/></Paper>
        </GridLayout>
        <AddBudget callback={updateNotifications} categories={categories} withButton={false}/>
      </div>
    )
}

const mapStateToProps = state => ({
  categories:state.categories.data
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateNotifications:updateNotifications,
  },dispatch)
}

export default compose(
  connect(mapStateToProps, matchDispatchToProps),
  //withState('page','updatePage','BudgetManager'),
)(Home)
