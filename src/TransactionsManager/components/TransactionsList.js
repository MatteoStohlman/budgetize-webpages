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

  const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const TransactionsList = ({
  transactions,filter,loading,
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
  console.log(props)
  var filteredTransactions = transactions[filter?filter:'uncategorizedTransactions']
  return (
    <div>
      <h3 style={{marginLeft:10}}>Transactions</h3>
      {children}
      {filteredTransactions && filteredTransactions.map((trans)=>{
        return(
          <Slider {...sliderSettings}
            afterChange={(e)=>console.log(e)}
            initialSlide={1}
          >
            <Paper>
              <div style={{...actionSlide,backgroundColor:orange500,textAlign:'right'}}>
                <h4 style={{margin:0,fontVariant:'small-caps',fontWeight:'bold'}}>Ignore Transaction</h4>
              </div>
            </Paper>
            <Paper>
              <div style={transactionWrapper}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                  style={{position:'absolute',top:10,right:10}}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Refresh" />
                  <MenuItem primaryText="Send feedback" />
                  <MenuItem primaryText="Settings" />
                </IconMenu>
                <span style={title}>{trans.name}</span>
                <span style={subtitle}>{moment(trans.transaction_date).format(DATE.formats.pretty)}</span>
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

  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  Loading,
  withProps(props=>{return{loading:props.loading}})
  //withState('activeTab','updateActiveTab','search')
)(TransactionsList)
