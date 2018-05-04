import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import IconMenu from 'material-ui/IconMenu';
  import MenuItem from 'material-ui/MenuItem';
  import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
  import AddMapping from 'MappingManager/components/AddMapping'
  import CategorizeTransaction from 'TransactionsManager/components/CategorizeTransaction'
//ACTIONS//
  import {controlComponent} from 'TransactionsManager/actions'
  import {ignoreTransaction} from '../actions'
  import {updateBudget} from 'BudgetManager/actions'

const TransactionsMenu = ({
  //PROPS//
  transaction,refreshCallback,options=false,excludeOptions=false,
  //REDUX//
  controlComponent,ignoreTransaction,updateBudget,isCategorizeTransactionLoading,
  //STATE
  showCreateMapping,updateShowCreateMapping,
  showCategorizeTrans,updateShowCategorizeTrans,
  //OTHER
  ...props})=> {
    function genInitialMappingValues(){
      if(showCreateMapping.active){
        if(showCreateMapping.data[0].plaidTags){
          let plaidTags = JSON.parse(showCreateMapping.data[0].plaidTags)
          let lastPlaidTag = plaidTags[plaidTags.length-1]
          return {matchType:'plaidTag',keyword:lastPlaidTag}
        }
      }
      return false
    }
    function shouldShowOption(optionName){
      let shouldShow=true
      if(options){
        if(options.indexOf(optionName) < 0)
          shouldShow=false
      }
      if(excludeOptions){
        if(excludeOptions.indexOf(optionName) >= 0)
          shouldShow=false
      }
      return shouldShow
    }
    return (
      <div>
        <CategorizeTransaction
          transaction={transaction}
          isOpen={showCategorizeTrans}
          toggle={(override=null)=>{updateShowCategorizeTrans(override==null?!showCategorizeTrans:override)}}
          successCallback={updateBudget}
          loading={isCategorizeTransactionLoading}
        />
        <AddMapping
          isOpen={showCreateMapping.active}
          guessTransactions={showCreateMapping.data}
          toggle={()=>updateShowCreateMapping({active:false})}
          withButton={false}
          refreshData={refreshCallback}
          initialValues={genInitialMappingValues()}
        />
        <IconMenu
          iconButtonElement={<MoreVertIcon/>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          {...props}
        >
          {shouldShowOption('categorizeTransaction') && <MenuItem primaryText="Categorize" onClick={()=>updateShowCategorizeTrans(true)}/>}
          {shouldShowOption('createMapping') && <MenuItem primaryText="Create Mapping" onClick={()=>updateShowCreateMapping({active:true,data:[transaction]})}/>}
          {shouldShowOption('ignore') && <MenuItem primaryText="Ignore Transaction" onClick={()=>ignoreTransaction(transaction.id,refreshCallback)}/>}
          {shouldShowOption('split') && <MenuItem primaryText="Split" onClick={()=>controlComponent('SplitTransaction',{
              isOpen:true,
              targetTransaction:{...transaction,category:{id:transaction.category_id,name:transaction.categoryName}},
              valueTotal:transaction.value
            })}
          />}
          {shouldShowOption('notes') && <MenuItem primaryText="Add Notes" onClick={()=>controlComponent('AddNotes',{isOpen:true,transaction:transaction,value:transaction.notes})}/>}
        </IconMenu>
      </div>
    )
}

TransactionsMenu.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isCategorizeTransactionLoading:state.transactions.components.CategorizeTransaction.isLoading,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    controlComponent:controlComponent,
    ignoreTransaction:ignoreTransaction,
    updateBudget:updateBudget,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('showCreateMapping','updateShowCreateMapping',{active:false}),//Shape:{active:bool,data:{transactionEntity}}
  withState('showCategorizeTrans','updateShowCategorizeTrans',false),
  //withState('activeTab','updateActiveTab','search')
)(TransactionsMenu)
