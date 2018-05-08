import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
  import Paper from 'material-ui/Paper';
  import {grey700,grey400} from 'material-ui/styles/colors';
//ACTIONS//

//HOC//
  import Loading from 'HOC/Loading'
  import Mobile from 'HOC/mobile'

const FlexSelect = ({
  //REDUX

  //STATE
  //PROPS
    label='',
  //OTHER
    isMobile,...props
})=> {
    if(!isMobile){
      return(
        props.children
      )
    }else{
      return (
        <div>
          <Paper style={{width:'100%',margin:'auto',marginBottom:20,padding:10,paddingLeft:40,position:'relative'}} zDepth={1}>
            <span style={{position:'absolute',textTransform:'uppercase',fontSize:10,top:1,left:1,color:grey400}}>{label}</span>
              {props.children}
          </Paper>
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
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:false,value:props.value?props.value:null}}),
  //withState('activeTab','updateActiveTab','search')
)(FlexSelect)
