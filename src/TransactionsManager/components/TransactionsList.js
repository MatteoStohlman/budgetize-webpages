import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,withProps} from 'recompose';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from 'moment'
import {DATE} from 'CONSTANTS'
//COMPONENTS//
  import MenuItem from 'material-ui/MenuItem';
  import {grey400,darkBlack,green500,orange500} from 'material-ui/styles/colors';
  import IconButton from 'material-ui/IconButton';
  import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
  import IconMenu from 'material-ui/IconMenu';
  import Slider from "react-slick";
  import {Row,Col} from 'react-bootstrap'
  import Paper from 'material-ui/Paper';
  import Loading from 'HOC/Loading'
  import AddMapping from 'MappingManager/components/AddMapping'
  import Dialog from 'material-ui/Dialog';
  import ConfirmationDialog from 'components/ConfirmationDialog'
  import FlatButton from 'material-ui/FlatButton';
  import CircularProgress from 'material-ui/CircularProgress';
  import TransactionsMenu from 'TransactionsManager/components/TransactionsMenu'
  import DollarValue from 'components/DollarValue'
//ACTIONS//
  import {ignoreTransaction} from 'TransactionsManager/actions'

  const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const TransactionsList = ({
  //PARENT//
  transactions,filter,loading,refreshCallback,
  //STATE//
  showCreateMapping,updateShowCreateMapping,
  updateActiveSlider,activeSlider,
  showConfirmation,updateShowConfirmation,
  activeTransactionId,updateActiveTransactionId,
  openMenu,updateOpenMenu,
  //ACTIONS//
  ignoreTransaction,
  //OTHER//
  children,...props
})=> {
  const Menu = ()=>(
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      style={{position:'absolute',top:10,right:10}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Send feedback" />
      <MenuItem primaryText="Settings" />
    </IconMenu>
  );
  const transactionWrapper={
    padding:10,
    paddingRight:45,
    display:'block',
    position:'relative',
    height:60,
    overflow:'hidden',
  }
  const title={
    fontWeight:'bold',
    width:'100%',
    display:'block',
    maxHeight:20,
    overflow:'hidden',
  }
  const subtitle={
    color:grey400,
  }
  const actionSlide={
    textAlign:'center',
    width:'100%',
    height:60,
    padding:20,

  }
  const valueStyle={
    float:'right'
  }
  function genInitialMappingValues(){
    if(showCreateMapping.active){
      if(showCreateMapping.data[0].plaidTags){
        let plaidTags = JSON.parse(showCreateMapping.data[0].plaidTags)
        let lastPlaidTag = plaidTags[plaidTags.length-1]
        return {matchType:'plaidTag',keyword:lastPlaidTag}
      }
    }
    return false
  }
  var filteredTransactions = transactions[filter?filter:'uncategorizedTransactions']
  return (
    <div>
      <AddMapping
        isOpen={showCreateMapping.active}
        guessTransactions={showCreateMapping.data}
        toggle={()=>updateShowCreateMapping({active:false})}
        withButton={false}
        refreshData={refreshCallback}
        cancelCallback={()=>this[showCreateMapping.callbackArg].slickGoTo(1)}
        initialValues={genInitialMappingValues()}
      />
      <ConfirmationDialog
        isOpen={showConfirmation}
        close={updateShowConfirmation}
        negativeCallback={()=>{
          updateShowConfirmation(false)
          this[activeSlider].slickGoTo(1)
        }}
        positiveCallback={()=>{
          ignoreTransaction(activeTransactionId,()=>{
            updateShowConfirmation(false)
            this[activeSlider].slickGoTo(1,true)
            updateActiveTransactionId(false)
          })
        }}
      />
      <h3 style={{marginLeft:10}}>Transactions</h3>
      {children}
      {filteredTransactions && filteredTransactions.map((trans,index)=>{
        return(
          <Slider {...sliderSettings}
            ref={slider => (this['slider'+index] = slider)}
            afterChange={(sliderIndex)=>{
              console.log(sliderIndex)
              let sliderName='slider'+index
              console.log(sliderName)
              switch (sliderIndex) {
                case 2:
                  updateShowCreateMapping({active:true,data:[{plaidTags:trans.plaidTags}],callbackArg:sliderName})
                  break;
                case 0:
                  updateActiveTransactionId(trans.id)
                  updateActiveSlider(sliderName)
                  updateShowConfirmation(true)
                  break;
              }
            }}
            initialSlide={1}
          >
            <Paper>
              <div style={{...actionSlide,backgroundColor:orange500,textAlign:'right'}}>
                <h4 style={{margin:0,fontVariant:'small-caps',fontWeight:'bold'}}>Ignore Transaction</h4>
              </div>
            </Paper>
            <Paper>
              <div style={transactionWrapper}>
                <TransactionsMenu
                  transaction={trans}
                  refreshCallback={refreshCallback}
                  style={{position:'absolute',top:10,right:10}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                />
                <span style={title}>{trans.name}</span>
                <span style={subtitle}>{moment(trans.transaction_date).format(DATE.formats.pretty)}</span>
                <span style={valueStyle}><DollarValue value={trans.value} type='fancy'/></span>
              </div>
            </Paper>
            <Paper>
              <div style={{...actionSlide,backgroundColor:green500,textAlign:'left'}}>
                <h4 style={{margin:0,fontVariant:'small-caps',fontWeight:'bold'}}>Categorize Transaction</h4>
              </div>
            </Paper>
          </Slider>
        )
      })}
    </div>
  )
}

TransactionsList.propTypes={
  label:PropTypes.string.isRequired
}

const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    ignoreTransaction:ignoreTransaction
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('showCreateMapping','updateShowCreateMapping',{active:false}),//Shape:{active:bool,data:{transactionEntity}}
  withState('activeSlider','updateActiveSlider',false),
  withState('showConfirmation','updateShowConfirmation',false),
  withState('activeTransactionId','updateActiveTransactionId',false),
  withState('openMenu','updateOpenMenu',false),
  Loading,
  withProps(props=>{return{loading:props.loading}})
  //withState('activeTab','updateActiveTab','search')
)(TransactionsList)
