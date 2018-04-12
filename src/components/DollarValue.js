import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import numeral from 'numeral'

const DollarValue = ({value,type,style,...props})=> {
    switch (type) {
      case 'fancy':
        return(<span style={{color:value>0?'green':'red',fontSize:18,fontWeight:'bold',...style}}>{numeral(value).format('$0.00')}</span>)
        break;
      default:
        return(<span style={{...style}}>{numeral(value).format('$0.00')}</span>)

    }
}

DollarValue.propTypes={
  value:PropTypes.string.isRequired,
  type:PropTypes.string
}

export default compose(
  //withState('activeTab','updateActiveTab','search')
)(DollarValue)
