import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//COMPONENTS//
  //import {List, ListItem} from 'material-ui/List';
  import MenuItem from 'material-ui/MenuItem';
  import {grey400,darkBlack} from 'material-ui/styles/colors';
  import IconButton from 'material-ui/IconButton';
  import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
  import IconMenu from 'material-ui/IconMenu';
  import Slider from "react-slick";
  import {Row,Col} from 'react-bootstrap'

  const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const TransactionsList = ({label,...props})=> {
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
    position:'relative'
  }
  const title={
    fontWeight:'bold',
    marginBottom:10,
    width:'100%',
    display:'block',
  }
  const subtitle={
    color:grey400,
  }
  return (
    <div>
      <Slider {...sliderSettings}>
        <div>
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
            <span style={title}>Names of some of these transactions are long</span>
            <span style={subtitle}>March 28th 2018</span>
          </div>
        </div>
        <div>
          Delete
        </div>
      </Slider>
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
  //withState('activeTab','updateActiveTab','search')
)(TransactionsList)
