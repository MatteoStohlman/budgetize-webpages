import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
//ACTIONS//
  import {controlComponent,addTransactionNotes} from 'TransactionsManager/actions'
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import Dialog from 'material-ui/Dialog';
  import CircularProgress from 'material-ui/CircularProgress';
  import TextField from 'material-ui/TextField';


const AddNotes = ({isOpen,value,isLoading,transaction,update,addTransactionNotes,...props})=> {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>update('AddNotes',{isOpen:false,value:null,isLoading:false,transaction:null})}
      />,
      <FlatButton
        label='Save'
        primary={true}
        onClick={()=>{
          update('AddNotes',{isLoading:true})
          addTransactionNotes(transaction.id,value)
        }}
        disabled={isLoading}
      />
    ];
    return (
      <Dialog
        title="Add Transaction Notes"
        actions={actions}
        modal={true}
        open={isOpen}
      >
        {isLoading &&
          <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
        }
        {transaction && transaction.name}
        <TextField
          hintText="This transaction was for Saturday's party"
          floatingLabelText="Transaction Notes"
          multiLine={true}
          rows={4}
          fullWidth={true}
          value={value}
          onChange={(e)=>update('AddNotes',{value:e.target.value})}
        />

      </Dialog>
    )
}

AddNotes.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isOpen:state.transactions.components.AddNotes.isOpen,
  value:state.transactions.components.AddNotes.value,
  isLoading:state.transactions.components.AddNotes.isLoading,
  transaction:state.transactions.components.AddNotes.transaction,

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    update:controlComponent,
    addTransactionNotes:addTransactionNotes
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(AddNotes)
