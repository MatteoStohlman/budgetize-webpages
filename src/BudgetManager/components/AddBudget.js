import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import {Row,Col} from 'react-bootstrap'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {toast} from 'react-toastify'
import CircularProgress from 'material-ui/CircularProgress';
import {addCategory} from 'api/categories'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {MONTHS} from 'CONSTANTS'
import AutoComplete from 'material-ui/AutoComplete';
import AddCategory from 'CategoryManager/components/AddCategory'
import moment from 'moment'
import Mobile from 'HOC/mobile'
//API//
import {addBudgetLine} from 'api/budget'
//ACTIONS//
  import {toggleAddBudget} from 'BudgetManager/actions'
//COMPONENTS//
  import FlexDialog from 'components/FlexDialog'
  import AddActionButton from 'components/AddActionButton'
  import FlexSelect from 'components/FlexSelect'


const AddBudget =
  ({
    toggle,isOpen,
    style,className,
    isSubmitting,updateIsSubmitting,
    withButton=true,
    month,updateMonth,
    value,updateValue,
    initialValues,callback,
    categories=[],
    category,updateCategory,
    toggleAddBudget,
    showAddCategory,updateShowAddCategory,
    id,updateId,
    isMobile,
    ...props
  }) => {
    function getCategoryId(){
      if(category.id)
        var categoryId=category.id
      else if(initialValues.category && initialValues.category.id)
        var categoryId = initialValues.category.id
      else
        var categoryId=category
      return categoryId
    }
    function getBudgetId(){
      if(id)
        var budgetId=id
      else if(initialValues.id)
        var budgetId=initialValues.id
      else
        var budgetId=id
      return budgetId
    }
    function handleSubmit(){
      //console.log(category,initialValues)
      updateIsSubmitting(true,()=>{
        addBudgetLine(month,2018,value,getCategoryId(),false,getBudgetId()).then(response=>{
          if(response.status){
            toggleAddBudget();
            updateIsSubmitting();
            callback();
            toast.success('Budget added, refreshing budget list')
          }else{
            updateIsSubmitting();
            toast.error('Could not create budget, please try again')
          }
        })
      })
    }
    const actions = [
      <FlatButton
        label='Add Category'
        primary={true}
        onClick={()=>updateShowAddCategory(true)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={()=>toggleAddBudget(false)}
      />,
      <FlatButton
        label="Save Budget"
        secondary={true}
        onClick={handleSubmit}
        disabled={isSubmitting}
      />,
    ];
    function autocompleteValue(){
      if(category)
        return category.name
      else if(initialValues && initialValues.category)
        return initialValues.category.name
      else
        return false
    }
    console.log('running addbudget',initialValues);
    return (
        <div style={style} className={className}>
          {showAddCategory &&
            <AddCategory
              isOpen={true}
              toggle={()=>updateShowAddCategory(false)}
              withButton={false}
              callback={callback}
            />
          }
          {withButton &&
            <AddActionButton onClick={()=>toggleAddBudget(true)}/>
          }
          {console.log('rerender add budget')}
          <FlexDialog
            actions={actions}
            open={isOpen}
          >
            {isSubmitting &&
              <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
            }
            <FlexSelect
              floatingLabelText="Month"
              value={month?month:initialValues?initialValues.month:''}
              fullWidth={true}
              style={{maxHeight:200}}
              onChange={(event,index,selectedValue)=>updateMonth(selectedValue)}
              disabled={isSubmitting}
              options={MONTHS.selectOptions}
            />
            <FlexSelect
              floatingLabelText="Category"
              value={category}
              fullWidth={true}
              style={{maxHeight:200}}
              onChange={(event,index,selectedValue)=>updateCategory(selectedValue)}
              disabled={isSubmitting}
              options={categories.map((cat)=>({name:cat.name,selectedValue:cat.id}))}
            />
            <TextField
              hintText="200,-500"
              floatingLabelText="Budget Value"
              fullWidth={true}
              type='number'
              value={value?value:initialValues.value?initialValues.value:''}
              onChange={(event,value)=>updateValue(value)}
              disabled={isSubmitting}
              disableAutoFocus={false}
            />
          </FlexDialog>
        </div>
    )
}

// AddCategory.propTypes={
//   //label:PropTypes.string.isRequired
// }

const mapStateToProps = state => ({
  isOpen:state.budget.addBudget.isOpen,
  initialValues:state.budget.addBudget.initialValues,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    toggleAddBudget:toggleAddBudget
  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  withState('showAddCategory','updateShowAddCategory',false),
  withState('id','updateId',({initialValues})=>initialValues&&initialValues.id?initialValues.id:null),
  withState('month','updateMonth',({initialValues})=>initialValues&&initialValues.month?initialValues.month:moment().format('M')-1),
  withState('category','updateCategory',({initialValues})=>initialValues && initialValues.category?initialValues.category:null),
  withState('value','updateValue',({initialValues})=>initialValues&&initialValues.value?initialValues.value:0),
  withState('isSubmitting','updateIsSubmitting',false)
)(AddBudget)
