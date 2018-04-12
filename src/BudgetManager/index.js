import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
import {MONTHS} from 'CONSTANTS'
import moment from 'moment'
//COMPONENTS//
import BudgetTable from './components/BudgetTable'
import AddBudget from './components/AddBudget'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
//ACTIONS//
import {updateBudget,toggleAddBudget} from './actions'
import {updateCategories} from 'CategoryManager/actions'

const BudgetManager =
  ({
    budget,updateBudget,
    categories,updateCategories,
    toggleAddBudget,
    month,updateMonth,
    ...props
  }) => {
    return (
      <BudgetTable
        budget={budget.data}
        loading={budget.requesting}
        callback={()=>{updateBudget(month),updateCategories()}}
        categories={categories}
      >
        <div style={{position:'relative'}}>
          <SelectField
            floatingLabelText="Month"
            value={month}
            //fullWidth={true}
            onChange={(event,index,value)=>updateMonth(value,()=>updateBudget(value))}
            disabled={budget.requesting}
            style={{display:'inline-block'}}
          >
            {
              MONTHS.full.map((month,index)=>{
                return(<MenuItem value={index} primaryText={month}/>)
              })
            }
          </SelectField>
          <AddBudget
            callback={()=>{updateBudget(month),updateCategories()}}
            categories={categories.data}
            style={{display:'inline-block',transform:'translateY(-20px)'}}
          />
        </div>
      </BudgetTable>
    )
}

// TextInput.propTypes={
//   label:PropTypes.string.isRequired
// }
const mapStateToProps = state => ({
  budget:state.budget,
  categories:state.categories,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateBudget:updateBudget,
    updateCategories:updateCategories,
    toggleAddBudget:toggleAddBudget,
  },dispatch)
}

export default compose(
  connect(mapStateToProps, matchDispatchToProps),
  withState('month','updateMonth',moment().month()),
  lifecycle({
    componentDidMount(){
      this.props.updateBudget(moment().month(),moment().year())
      this.props.updateCategories()
    }
  })
)(BudgetManager)
