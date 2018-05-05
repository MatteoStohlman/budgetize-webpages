import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';

//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const FlexSelect = ({
  //REDUX

  //STATE
    value,
  //PROPS
    onChange,options,desktopStyle,mobileStyle,disabled,
  //OTHER
    isMobile,...props
})=> {
    function onChangeHandler(event,index,value){
      onChange(event,index,value)
    }
    if(!isMobile){
      console.log('rendering desktop',options);
      return(
        <SelectField
          {...props}
          floatingLabelText={props.floatingLabelText}
          fullWidth={props.fullWidth}
          style={{maxHeight:200,...desktopStyle}}
          onChange={({...props})=>onChangeHandler(...props)}
          disabled={disabled}
        >
          {
            options.map((option)=>(
              <MenuItem value={option.value} primaryText={option.name}/>
            ))
          }
        </SelectField>
      )
    }else{
      console.log('rendering mobile',options);
      return (
        <div>
          <label for="select"> {props.floatingLabelText} </label>
          <select
            value={value}
            name='select'
            style={{...mobileStyle}}
            onChange={({...props})=>onChangeHandler(...props)}
          >
            {
              options.map((option)=>(
                <option value={option.value}>{option.name}</option>
              ))
            }
          </select>
        </div>
      )
    }
}

FlexSelect.propTypes={
  value:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  options:PropTypes.shape([{
    name: PropTypes.string,
    value: PropTypes.string
  }]),

}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:false,value:props.value?props.value:null}}),
  //withState('activeTab','updateActiveTab','search')
)(FlexSelect)
