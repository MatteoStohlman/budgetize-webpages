import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
  import Drawer from 'material-ui/Drawer';
  import Menu from 'material-ui/Menu';
  import Paper from 'material-ui/Paper';
  import {grey700,grey400} from 'material-ui/styles/colors';
//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const FlexSelect = ({
  //REDUX

  //STATE
    value,isDrawerOpen,updateIsDrawerOpen,
  //PROPS
    onChange,options,desktopStyle,mobileStyle,disabled,
  //OTHER
    isMobile,...props
})=> {
    function onChangeHandler(event,index,value){
      onChange(event,index,value)
    }
    isMobile=true
    if(!isMobile){
      return(
        <SelectField
          {...props}
          floatingLabelText={props.floatingLabelText}
          fullWidth={props.fullWidth}
          style={{maxHeight:200,...desktopStyle}}
          onChange={({...props})=>onChangeHandler(...props)}
          disabled={disabled}
          //menuStyle={{width:'100%'}}
        >
          {
            options.map((option)=>(
              <MenuItem value={option.value} primaryText={option.name}/>
            ))
          }
        </SelectField>
      )
    }else{
      return (
        <div>
          <Paper style={{width:'100%',margin:'auto',marginBottom:20,padding:10,paddingLeft:40,position:'relative'}} zDepth={1} onClick={()=>updateIsDrawerOpen(true)}>
            <span style={{position:'absolute',textTransform:'uppercase',fontSize:10,top:1,left:1,color:grey400}}>{!value?'click to add':props.floatingLabelText}</span>
            <span style={{fontWeight:'bold',lineHeight:'50px',color:value?grey700:grey400,fontSize:20,letterSpacing:'1px'}}>
              {value?options.filter((option)=>option.value==value)[0].name:props.floatingLabelText}
            </span>
          </Paper>
          <Drawer
            containerStyle={{position:'fixed'}}
            width={'40%'}
            open={isDrawerOpen}
            docked={false}
            openSecondary={true}
            onChange={(event,value)=>console.log(event,value)}
            onRequestChange={(open) => updateIsDrawerOpen(open)}
          >
            <Menu
              disableAutoFocus={true}
              onChange={(event,value)=>{
                updateIsDrawerOpen(false)
                onChangeHandler(event,false,value)
              }}
            >
            {
              options.map((option,index)=>(
                <MenuItem
                  key={index+"_"+option.value}
                  value={option.value}
                  primaryText={option.name}
                />
              ))
            }
            </Menu>
          </Drawer>
        </div>
      )
    }
}

FlexSelect.propTypes={
  value:PropTypes.string,
  onChange:PropTypes.func,
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
  withState('isDrawerOpen','updateIsDrawerOpen',false),
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:false,value:props.value?props.value:null}}),
  //withState('activeTab','updateActiveTab','search')
)(FlexSelect)
