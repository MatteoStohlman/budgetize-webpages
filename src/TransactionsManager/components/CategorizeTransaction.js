import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import FlexDialog from 'components/FlexDialog'
  import SelectField from 'material-ui/SelectField';
  import FlexSelect from 'components/FlexSelect'
  import MenuItem from 'material-ui/MenuItem';
//ACTIONS//
  import {categorizeTransaction} from 'TransactionsManager/actions'
//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const CategorizeTransaction = ({
  //REDUX
    categorizeTransaction,categories,
  //STATE
    categoryId,updateCategoryId,
  //PROPS
    transaction=null,toggle,cancelCallback=false,isOpen,successCallback=false,
  //OTHER
  ...props
})=> {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>{
          toggle(false);
          cancelCallback?cancelCallback():null;
        }}
      />,
      <FlatButton
        label='Save'
        primary={true}
        onClick={()=>{
          categorizeTransaction(transaction.id,categoryId,successCallback)
          toggle(false)
        }}
      />
    ];
    return (
      <FlexDialog
        title="Categorize Transaction"
        actions={actions}
        modal={true}
        open={isOpen}
        toggle={(toggleTo)=>{
          toggle(toggleTo);
          cancelCallback?cancelCallback():null;
        }}
      >
        <FlexSelect
          floatingLabelText="Category"
          drawerWidth='55%'
          value={categoryId}
          onChange={(event,index,value)=>updateCategoryId(value)}
          options={categories.map((cat)=>({name:cat.name,value:cat.id}))}
        />
      </FlexDialog>
    )
}

CategorizeTransaction.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  categories:state.categories.data,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    categorizeTransaction:categorizeTransaction,
  },dispatch)
}

export default compose(
  withState('categoryId','updateCategoryId',null),
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:props.loading}}),
  //withState('activeTab','updateActiveTab','search')
)(CategorizeTransaction)
