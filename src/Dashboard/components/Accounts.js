import React from 'react';
import {withState,compose,lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//ACTIONS//
import {openPlaidLink,updateBankAccounts} from 'Plaid/actions'
//COMPONENTS//
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import FA from 'react-fontawesome'
import CircularProgress from 'material-ui/CircularProgress';
import DollarValue from 'components/DollarValue'
import PlaidLink from 'Plaid/plaidLink'

const Accounts = ({openPlaidLink,bankAccounts,isLoading,...props}) => {
    function positiveOrNegative(value,accountType=false){
      var negativeTypes = ['loan','credit']
      if(negativeTypes.indexOf(accountType)>=0)
        return Math.abs(value)*-1
      else
        return Math.abs(value)
    }
    return (
      <div style={{height:'100%'}}>
        <PlaidLink/>
        <div style={{height:'15%',width:'100%',overflow:'hidden',marginTop:0,marginBottom:0}}>
          <h2 style={{marginLeft:10}}>Accounts</h2>
          {!isLoading && <RaisedButton label="Add Account" secondary={true} onClick={()=>openPlaidLink()} style={{position:'absolute',right:5,top:5}}/>}
          {isLoading && <CircularProgress size={30} thickness={4} style={{position:'absolute',right:5,top:5}}/>}
        </div>
        <List style={{height:'85%',width:'100%',overflow:'auto',marginTop:0,marginBottom:0}}>
          {
            bankAccounts.map((bankAccount)=>{
              return(
                <ListItem
                  primaryText={bankAccount.account_name}
                  secondaryText={bankAccount.institution_alias?bankAccount.institution_alias:bankAccount.institution_name}
                >
                <DollarValue type='fancy' value={positiveOrNegative(bankAccount.balance_current,bankAccount.account_type)} style={{float:'right',marginTop:10}}/>
                </ListItem>
              )
            })
          }

        </List>
      </div>

    )
}

function mapStateToProps(state){
  return {
    isLoading:state.plaidLink.requesting,
    bankAccounts:state.plaidLink.data.bankAccounts
  };
}

function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    openPlaidLink:openPlaidLink,
    updateBankAccounts:updateBankAccounts,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  lifecycle({
    componentDidMount(){
      this.props.updateBankAccounts()
    }
  })
  //withState('page','updatePage','BudgetManager'),
)(Accounts)
