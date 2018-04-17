import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import FlatButton from 'material-ui/FlatButton';
  import Dialog from 'material-ui/Dialog';
  import CircularProgress from 'material-ui/CircularProgress';
  import TextField from 'material-ui/TextField';
  import Slider from 'material-ui/Slider';
  import {Row,Col} from 'react-bootstrap'
//ACTIONS//
  import {controlComponent} from 'TransactionsManager/actions'

const SplitTransaction = ({
  isOpen,isLoading,valueTotal,
  targetTransaction,splitTransaction,
  controlComponent,
  sliderPercentage,updateSliderPercentage,
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
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={()=>console.log('Close Split Modal')}
    />,
    <FlatButton
      label='Save'
      primary={true}
      onClick={()=>{
        console.log('Save Split');
      }}
      disabled={isLoading}
    />
  ];
  if(!targetTransaction){return null}
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
      <Row>
        <Col md={6} xs={6}>
          <TextField
            value={targetTransaction.name}
            floatingLabelText="Name"
            onChange={(e,value)=>updateTargetTransaction('name',value)}
          />
          <TextField
            value={targetTransaction.value}
            floatingLabelText="Value"
            onChange={(e,value)=>{
              updateTargetTransaction('value',value)
              updateSplitTransaction('value',valueTotal-value)
            }}
          />
        </Col>
        <Col md={6} xs={6}>
          <TextField
            value={splitTransaction.name?splitTransaction.name:"SPLIT FROM "+targetTransaction.name}
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
            }}
          />
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={2} style={{height:90,marginTop:21}}>
              <span style={{marginTop:10,fontWeight:'bold',fontSize:20}}>{sliderPercentage+"%"}</span>
            </Col>
            <Col xs={8}>
              <Slider
                fullWidth={true}
                step={0.05}
                onChange={(e,value)=>{
                  var targetValue = Math.round(value*valueTotal,2)
                  var splitValue = valueTotal-targetValue
                  updateSliderPercentage(Math.round(value*100,0))
                  updateTargetTransaction('value',targetValue)
                  updateSplitTransaction('value',splitValue)
                }}
              />
            </Col>
            <Col xs={2} style={{height:90,marginTop:21}}>
              <span style={{marginTop:10,fontWeight:'bold',fontSize:20}}>{100-sliderPercentage+"%"}</span>
            </Col>
          </Row>
        </Col>
      </Row>

    </Dialog>
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
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    controlComponent:controlComponent
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('sliderPercentage','updateSliderPercentage',0)
)(SplitTransaction)
