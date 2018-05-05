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
import BudgetList from './components/BudgetList'
//ACTIONS//
import {updateBudget,toggleAddBudget} from './actions'
import {updateCategories} from 'CategoryManager/actions'
//HOC//
  import Mobile from 'HOC/mobile'
const BudgetManager =
({
    budget,updateBudget,
    categories,updateCategories,
    toggleAddBudget,
    month,updateMonth,
    isMobile,
    ...props
}) => {
  return (
    <div>
      {
        isMobile?
          <BudgetList/>:
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
            </div>
          </BudgetTable>
      }
      <AddBudget
        callback={()=>{updateBudget(month),updateCategories()}}
        categories={categories.data}
      />
    </div>
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
  Mobile(),
  connect(mapStateToProps, matchDispatchToProps),
  withState('month','updateMonth',moment().month()),
  lifecycle({
    componentDidMount(){
      this.props.updateBudget(moment().month(),moment().year())
      this.props.updateCategories()
    }
  })
)(BudgetManager)
