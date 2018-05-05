import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
import moment from 'moment'
import {DATE} from 'CONSTANTS'
//COMPONENTS//
  import {List, ListItem} from 'material-ui/List';
  import Subheader from 'material-ui/Subheader';
  import Avatar from 'material-ui/Avatar';
  import DollarValue from 'components/DollarValue'
  import TransactionsMenu from 'TransactionsManager/components/TransactionsMenu'
  import SplitTransaction from 'TransactionsManager/components/SplitTransaction'
  import AddNotes from 'TransactionsManager/components/AddNotes'
  import MonthSelect from './MonthSelect'
  import LinearProgress from 'material-ui/LinearProgress';
  import AddBudget from 'BudgetManager/components/AddBudget'
//ACTIONS//
  import Loading from 'HOC/Loading'
  import {updateBudget} from 'BudgetManager/actions'


//COLORS//
import {
  red500,
  orange500,
  green500,
  grey100,
  grey200,
  lightBlack,
} from 'material-ui/styles/colors';

const BudgetList = ({
  //REDUX
    budget,updateBudget,
  //STATE

  //PROPS

  //OTHER
  loading,...props
})=> {
    function generatePercentageAvatar(percentage){
      var percentage = Math.ceil(percentage)
      var color=green500
      if(percentage > 70 && percentage < 100) color=orange500
      if(percentage > 100) color=red500
      return(
        <Avatar
          color={color}
          backgroundColor={grey200}
          size={40}
          //style={style}
        >
          {percentage+"%"}
        </Avatar>
      )
    }
    function createNestedList(budgetLine,index){
      var items = []
      if(budgetLine.actual_expense){
        items.push(
          <ListItem
            key={'details_'+index}
            primaryText={
              <span>
                <span style={{width:'100%',marginBottom:2,display:'inline-block'}}>Spent: <DollarValue type='fancy' value={budgetLine.actual_expense}/></span>
                <span style={{width:'100%',marginBottom:2,display:'inline-block'}}>Budgeted: <DollarValue type='fancy' value={budgetLine.value}/></span>
                <span style={{width:'100%',marginBottom:2,display:'inline-block'}}>Left: <DollarValue type='fancy' value={budgetLine.value-budgetLine.actual_expense}/></span>
              </span>
            }
          />
        )
      }
      budgetLine.transactions.map((transaction,transactionIndex)=>{
        items.push(
          <ListItem
            key={'transaction_'+transactionIndex}
            primaryText={
              <p>{transaction.name}&nbsp;&nbsp;<DollarValue type='fancy' value={transaction.value}/></p>
            }
            secondaryText={moment(transaction.date).format(DATE.formats.pretty)}
            rightIcon={<TransactionsMenu transaction={transaction} excludeOptions={['createMapping']}/>}
          />
        )
      })
      return items

    }
    return (
      <div>
        <SplitTransaction/>
        <AddNotes/>
        <List>
        <Subheader><MonthSelect onChange={(value)=>updateBudget(value)}/></Subheader>
        {budget.map((budgetLine,budgetLineIndex)=>(
          <ListItem
            style={{backgroundColor:budgetLineIndex%2?'white':grey100,padding:7}}
            key={'budgetLine_'+budgetLineIndex}
            primaryText={
              <span style={{fontSize:20,marginTop:2,lineHeight:'22px'}}>
                {budgetLine.categoryName}
              </span>
            }
            leftAvatar={generatePercentageAvatar((budgetLine.actual_expense/budgetLine.value)*100)}
            primaryTogglesNestedList={true}
            nestedListStyle={{backgroundColor:budgetLineIndex%2?'white':grey100}}
            nestedItems={createNestedList(budgetLine,budgetLineIndex)}
          />
        ))}
      </List>
      </div>
    )
}

BudgetList.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  loading:state.budget.requesting,
  budget:state.budget.data,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateBudget:updateBudget,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:props.loading}}),
  //withState('activeTab','updateActiveTab','search')
)(BudgetList)
