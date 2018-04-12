import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import SvgIcon from 'material-ui/SvgIcon';
import FA from 'react-fontawesome'
import FlatButton from 'material-ui/FlatButton';
import './style.css'
//ACTIONS//
 import {toggleAddBudget} from 'BudgetManager/actions'


const UnbudgetedCategories = ({data,notificationIndex,routeTo,toggleAddBudget,...props})=> {
    return (
      <ListItem
        primaryText={data?'You have '+data.count+' categories without a budget':' You have categories without a budget'}
        leftIcon={<SvgIcon><FA name='compass'/></SvgIcon>}
        primaryTogglesNestedList={true}
        nestedItems={
          data.categories.map((category,index)=>{
            return(
              <ListItem
                key={'category'+index}
                leftIcon={<SvgIcon><FA name='hand-pointer' className='unbudgetedTransactionPointer'/></SvgIcon>}
                primaryText={category.name}
                onClick={()=>toggleAddBudget(true,{category:{...category}})}
              />
            )
          })
        }
      />
    )
}

UnbudgetedCategories.propTypes={
  data:PropTypes.object.isRequired,
  notificationIndex:PropTypes.number.isRequired,
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    toggleAddBudget:toggleAddBudget
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(UnbudgetedCategories)
