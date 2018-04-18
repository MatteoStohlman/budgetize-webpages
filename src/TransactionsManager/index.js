import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import TransactionsTable from './components/TransactionsTable'
  import Toggle from 'material-ui/Toggle';
  import Mobile from 'HOC/mobile'
  import TransactionsList from 'TransactionsManager/components/TransactionsList'
//ACTIONS//
  import {updateTransactions} from './actions'
  import {updateCategories} from 'CategoryManager/actions'
const TransactionsManager =
  ({
    transactions,updateTransactions,
    categories,updateCategories,
    toggleText,updateToggleText,
    isMobile,
    ...props
  }) => {
    function getToggleText(){

    }
    return (
      isMobile?
        <TransactionsList
          transactions={transactions.data}
          loading={transactions.requesting}
          refreshCallback={()=>{updateTransactions(),updateCategories()}}
          categories={categories}
          filter={toggleText=='Only Uncategorized'?'uncategorizedTransactions':'latestTransactions'}
        >
          <Toggle
            label={toggleText}
            defaultToggled={true}
            onToggle={(event,state)=>updateToggleText(state?'Only Uncategorized':'Last 5 Days')}
            style={{paddingLeft:40,paddingRight:40}}
          />
        </TransactionsList>
        :
        <TransactionsTable
          transactions={transactions.data}
          loading={transactions.requesting}
          refreshCallback={()=>{updateTransactions(),updateCategories()}}
          categories={categories}
          filter={toggleText=='Only Uncategorized'?'uncategorizedTransactions':'latestTransactions'}
        >
          <Toggle
            label={toggleText}
            defaultToggled={true}
            onToggle={(event,state)=>updateToggleText(state?'Only Uncategorized':'Last 5 Days')}
          />
        </TransactionsTable>
    )
}

// TextInput.propTypes={
//   label:PropTypes.string.isRequired
// }
const mapStateToProps = state => ({
  transactions:state.transactions,
  categories:state.categories,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateTransactions:updateTransactions,
    updateCategories:updateCategories
  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps, matchDispatchToProps),
  withState('toggleText','updateToggleText','Only Uncategorized'),
  lifecycle({
    componentDidMount(){
      this.props.updateTransactions()
      this.props.updateCategories()
    }
  })
)(TransactionsManager)
