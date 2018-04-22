import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import FlexDialog from 'components/FlexDialog'
  import CircularProgress from 'material-ui/CircularProgress';
  import TextField from 'material-ui/TextField';
  import Slider from 'material-ui/Slider';
  import {Row,Col} from 'react-bootstrap'
  import SelectField from 'material-ui/SelectField';
  import MenuItem from 'material-ui/MenuItem';
//ACTIONS//
  import {controlComponent,splitTransaction} from 'TransactionsManager/actions'
  import {updateCategories} from 'CategoryManager/actions'

const SplitTransaction = ({
  isOpen,isLoading,valueTotal,categories,
  splitCategory,targetCategory,
  targetTransaction,splitTransaction,
  splitTheTransaction,
  controlComponent,
  sliderPercentage,
  showError,updateShowError,
})=> {
  function updateTargetTransaction(key,value){
    var newTargetTrans = JSON.parse(JSON.stringify(targetTransaction))
    newTargetTrans[key]=value
    controlComponent('SplitTransaction',{targetTransaction:newTargetTrans})
  }
  function updateSplitTransaction(key,value){
    var newSplitTrans = JSON.parse(JSON.stringify(splitTransaction))
    newSplitTrans[key]=value
    controlComponent('SplitTransaction',{splitTransaction:newSplitTrans})
  }
  function updateSliderPercentage(value){
    controlComponent('SplitTransaction',{sliderPercentage:value})
  }
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={()=>{
        controlComponent('SplitTransaction','DEFAULT')
        updateShowError(false)
      }}
    />,
    <FlatButton
      label='Save'
      primary={true}
      onClick={()=>{
        //Validate//
        var {name,value,category} = splitTransaction
        if(!name || !value || !category){
          updateShowError(true)
          return
        }
        targetTransaction.category = targetTransaction.category.id
        splitTransaction.category = splitTransaction.category.id
        splitTheTransaction({
          targetTransaction:targetTransaction,
          splitTransaction:splitTransaction
        })
      }}
      disabled={isLoading}
    />
  ];
  if(!targetTransaction){return null}
  const colStyle={
    padding:20,
    overflow:'hidden'
  }
  if(!splitTransaction.name && targetTransaction.name)
    updateSplitTransaction('name',"SPLIT FROM "+targetTransaction.name)
  return (
    <FlexDialog
      title="Split Transaction"
      actions={actions}
      modal={true}
      open={isOpen}
    >
      {isLoading &&
        <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
      }
      <Row>
        {showError && <p style={{color:'red'}}>Required fields missing</p>}
        <Col md={6} xs={12} style={{colStyle}}>
          <TextField
            value={targetTransaction.name}
            floatingLabelText="Name"
            onChange={(e,value)=>updateTargetTransaction('name',value)}
          />
          <TextField
            value={targetTransaction.value}
            floatingLabelText="Value"
            type='number'
            onChange={(e,value)=>{
              updateTargetTransaction('value',value)
              updateSplitTransaction('value',valueTotal-value)
              updateSliderPercentage(Math.round((value/valueTotal)*100))
            }}
          />
          <SelectField
              floatingLabelText="Category"
              value={targetCategory?targetCategory.id:null}
              onChange={(event,index,value)=>updateTargetTransaction('category',categories[index])}
              disabled={isLoading}
            >
            {
              categories.length?
                categories.map((category)=>{
                  return(
                    <MenuItem value={category.id} primaryText={category.name}/>
                  )
                }):
                null
            }
          </SelectField>
        </Col>
        <Col md={6} xs={12} style={{colStyle}}>
          <TextField
            value={splitTransaction.name}
            hintText="Name for your split?"
            floatingLabelText="Name"
            onChange={(e,value)=>updateSplitTransaction('name',value)}
          />
          <TextField
            value={splitTransaction.value}
            hintText="$10.50"
            type='number'
            floatingLabelText="Value"
            onChange={(e,value)=>{
              updateSplitTransaction('value',value)
              updateTargetTransaction('value',valueTotal-value)
              console.log(value,valueTotal,Number(value/valueTotal),Math.round(value/Number(valueTotal)))
              updateSliderPercentage(Math.round((value/valueTotal)*100))
            }}
          />
          <SelectField
              floatingLabelText="Category"
              value={splitCategory?splitCategory.id:null}
              onChange={(event,index,value)=>updateSplitTransaction('category',categories[index])}
              disabled={isLoading}
            >
            {
              categories.length?
                categories.map((category)=>{
                  return(
                    <MenuItem value={category.id} primaryText={category.name}/>
                  )
                }):
                null
            }
            </SelectField>
        </Col>
        <Col xs={12} style={{colStyle}}>
          <Row>
            <Col xs={3} style={{height:90,marginTop:21}}>
              <span style={{marginTop:10,fontWeight:'bold',fontSize:20}}>{sliderPercentage+"%"}</span>
            </Col>
            <Col xs={6}>
              <Slider
                fullWidth={true}
                step={0.05}
                value={sliderPercentage/100}
                onChange={(e,value)=>{
                  var roundedPercentage = Number(value).toFixed(2)
                  var targetValue = Number(roundedPercentage*valueTotal).toFixed(2)
                  var splitValue = Number(valueTotal-targetValue).toFixed(2)
                  updateSliderPercentage(Math.round(roundedPercentage*100))
                  updateTargetTransaction('value',targetValue)
                  updateSplitTransaction('value',splitValue)
                }}
              />
            </Col>
            <Col xs={3} style={{height:90,marginTop:21}}>
              <span style={{marginTop:10,fontWeight:'bold',fontSize:20}}>{100-sliderPercentage+"%"}</span>
            </Col>
          </Row>
        </Col>
      </Row>

    </FlexDialog>
  )
}

SplitTransaction.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isOpen:state.transactions.components.SplitTransaction.isOpen,
  targetTransaction:state.transactions.components.SplitTransaction.targetTransaction,
  splitTransaction:state.transactions.components.SplitTransaction.splitTransaction,
  isLoading:state.transactions.components.SplitTransaction.isLoading,
  valueTotal:state.transactions.components.SplitTransaction.valueTotal,
  splitCategory:state.transactions.components.SplitTransaction.splitTransaction.category,
  targetCategory:state.transactions.components.SplitTransaction.targetTransaction.category,
  categories:state.categories.data,
  sliderPercentage:state.transactions.components.SplitTransaction.sliderPercentage,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    controlComponent:controlComponent,
    updateCategories:updateCategories,
    splitTheTransaction:splitTransaction,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('showError','updateShowError',false),
  lifecycle({
    componentDidMount(){
      this.props.updateCategories()
    }
  })
)(SplitTransaction)
