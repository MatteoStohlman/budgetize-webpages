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

//HOC//
  import Mobile from 'HOC/mobile'

const Home = ({page,updatePage,routeTo,updateNotifications,categories,isMobile}) => {
    var defaultLayout =
      isMobile?
      [
        {i: 'AddAccount', x: 0, y: 6, w: 12, h: 12},
        {i: 'Notifications', x: 0, y: 0, w: 12, h: 5},
      ]
      :
      [
        {i: 'AddAccount', x: 6, y: 0, w: 7, h: 12},
        {i: 'Notifications', x: 0, y: 0, w: 5, h: 15},
      ]
    var draggableDivStyle={
      overflowX:'hidden',
      overflowY:'auto',
    }
    function updateLayoutCache(param){
      localStorage.setItem('dashboard_layout', JSON.stringify(param))
    }
    function getLayout(){
      var storageLayout = JSON.parse(localStorage.getItem('dashboard_layout'))
      if(storageLayout)
        return storageLayout
      else
        return defaultLayout
    }
    return (
      <div>
        <GridLayout
          isDraggable={isMobile?false:true}
          isResizable={isMobile?false:true}
          className="layout"
          layout={getLayout()}
          cols={12}
          rowHeight={30}
          width={document.documentElement.clientWidth}
          onLayoutChange={updateLayoutCache}
        >
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
  Mobile(),
  connect(mapStateToProps, matchDispatchToProps),
  //withState('page','updatePage','BudgetManager'),
)(Home)
