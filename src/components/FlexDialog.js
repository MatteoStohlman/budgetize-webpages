import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import './style.css'
//HOCS//
  import Mobile from 'HOC/mobile'
//COMPONENTS//
  import Dialog from 'material-ui/Dialog';
  import CircularProgress from 'material-ui/CircularProgress';
  import Dock from 'react-dock'
  import AppBar from 'material-ui/AppBar';
  import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
  import IconButton from 'material-ui/IconButton';
  import SvgIcon from 'material-ui/SvgIcon';
  import FA from 'react-fontawesome'

const FlexDialog = ({isMobile,children,isLoading,toggle,title,...props})=> {
    const isMobileStyle_content={
      transform: 'none',
      top:'10px',
      width:'95%',
    }
    if(isMobile){
      return(
        <Dock
          position='top'
          isVisible={props.open}
          defaultSize='50%'
          onVisibleChange={(toggleTo)=>toggle?toggle(toggleTo):false}
        >
          {isLoading &&
            <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
          }
          <AppBar
            title={<span>{title}</span>}
            titleStyle={{}}
            iconStyleLeft={{marginTop:3,marginRight:0,marginBottom:0,marginLeft:'-16px'}}
            iconElementLeft={
              <SvgIcon onClick={()=>toggle(false)}>
                <FA name='arrow-left' size='2x' style={{color:'white'}}/>
              </SvgIcon>
            }
            style={{height:30,marginBottom:20}}
          />
          <div style={{padding:15}}>
            {children}
          </div>
        </Dock>
      )
    }else{
      return (
        <Dialog
          {...props}
          contentStyle={isMobile?{...props.contentStyle,...isMobileStyle_content}:{...props.contentStyle}}
          containerStyle={{height:isMobile?'100vh':'auto',...props.contentStyle}}
          className={isMobile?props.className+' mobile-dialog-root':props.className}
          modal={props.modal?props.modal:true}
        >
          {isLoading &&
            <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
          }
          {children}
        </Dialog>
      )
    }
}

FlexDialog.propTypes={
  //label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({

  },dispatch)
}

export default compose(
  Mobile(),
  //connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(FlexDialog)
