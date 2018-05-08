import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
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
  import Paper from 'material-ui/Paper';

const FlexDialog = ({
  //HOC//
  isMobile,isLoading,
  //PROPS//
  forceDesktop,children,toggle,title,hideBackIcon,actions,
  //OTHER//
  muiTheme,...props
})=> {
    const isMobileStyle_content={
      transform: 'none',
      top:'10px',
      width:'95%',
    }
    if(forceDesktop)isMobile=false
    if(isMobile){
      return(
        props.open &&
          <Dock
            position='top'
            isVisible={props.open}
            defaultSize='50%'
            onVisibleChange={(toggleTo)=>toggle?toggle(toggleTo):false}
            zIndex={1200}
          >
            {isLoading &&
              <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
            }
            <Paper style={{backgroundColor:muiTheme.palette.primary.dark,height:15}} rounded={false} zDepth={1} />
            <AppBar
              title={<span>{title.toUpperCase()}</span>}
              titleStyle={{lineHeight:'40px',marginLeft:20,fontSize:20}}
              iconStyleLeft={{marginTop:7,marginRight:0,marginBottom:0,marginLeft:'-16px',display:hideBackIcon?'none':'auto'}}
              iconElementLeft={
                !hideBackIcon &&
                <SvgIcon onClick={()=>toggle?toggle(false):null}>
                  <FA name='arrow-left' size='2x' style={{color:'white'}}/>
                </SvgIcon>
              }
              style={{height:40,marginBottom:20,backgroundColor:muiTheme.palette.primary.main}}
            />
          <div style={{padding:15,zIndex:1201}}>
              {children}
            </div>
            <div style={{textAlign:'right'}}>
              {actions.map((action)=>(action))}
            </div>
          </Dock>
      )
    }else{
      return (
        <Dialog
          {...props}
          contentStyle={isMobile?{...props.contentStyle,...isMobileStyle_content}:{...props.contentStyle}}
          containerStyle={{height:isMobile?'100vh':'auto',zIndex:20,...props.contentStyle}}
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
  muiThemeable(),
  //connect(mapStateToProps,matchDispatchToProps),
  //withState('activeTab','updateActiveTab','search')
)(FlexDialog)
