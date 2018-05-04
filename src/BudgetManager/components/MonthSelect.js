import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
import {MONTHS} from 'CONSTANTS'
import moment from 'moment'
//COMPONENTS//
  import SelectField from 'material-ui/SelectField'
  import MenuItem from 'material-ui/MenuItem'
//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'

const MonthSelect = ({
  //REDUX

  //STATE
    month,updateMonth,
  //PROPS
    disabled,onChange,
  //OTHER
  ...props
})=> {
    return (
      <SelectField
        floatingLabelText="Month"
        value={month}
        //fullWidth={true}
        onChange={(event,index,value)=>updateMonth(value,()=>onChange(value))}
        disabled={disabled}
        style={{display:'inline-block'}}
      >
        {
          MONTHS.full.map((month,index)=>{
            return(<MenuItem value={index} primaryText={month}/>)
          })
        }
      </SelectField>
    )
}

MonthSelect.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  withState('month','updateMonth',moment().month()),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:false}}),
  //withState('activeTab','updateActiveTab','search')
)(MonthSelect)
