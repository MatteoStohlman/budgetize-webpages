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
//ACTIONS//
  import {controlComponent} from 'TransactionsManager/actions'
//ACTIONS//
  import {ignoreTransaction} from '../actions'

const TransactionsMenu = ({transaction,refreshCallback,controlComponent,ignoreTransaction,showCreateMapping,updateShowCreateMapping})=> {
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
    return (
      <div>
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
        >
          <MenuItem primaryText="Create Mapping" onClick={()=>updateShowCreateMapping({active:true,data:[transaction]})}/>
          <MenuItem primaryText="Ignore Transaction" onClick={()=>ignoreTransaction(transaction.id,refreshCallback)}/>
          <MenuItem primaryText="Split" onClick={()=>controlComponent('SplitTransaction',{
              isOpen:true,
              targetTransaction:{...transaction,category:{id:transaction.category_id,name:transaction.categoryName}},
              valueTotal:transaction.value
            })}
          />
        <MenuItem primaryText="Add Notes" onClick={()=>controlComponent('AddNotes',{isOpen:true,transaction:transaction,value:transaction.notes})}/>
        </IconMenu>
      </div>
    )
}

TransactionsMenu.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    controlComponent:controlComponent,
    ignoreTransaction:ignoreTransaction,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('showCreateMapping','updateShowCreateMapping',{active:false})//Shape:{active:bool,data:{transactionEntity}}
  //withState('activeTab','updateActiveTab','search')
)(TransactionsMenu)
