/*global Plaid*/
import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {closePlaidLink,addBankAccount} from './actions'
import {removeNotification} from 'Notifications/actions'

class PlaidLink extends Component{
  constructor(props){
    super(props)
    this.state={
      disabledButton: false,
      linkLoaded: false,
      //institution: "ins_109511",
      //token:props.plaidLink.token,
      selectAccount: false,
      buttonText: 'Open Link',
      style: {
        padding: '6px 4px',
        outline: 'none',
        background: '#FFFFFF',
        border: '2px solid #F1F1F1',
        borderRadius: '4px',
      },
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleLinkOnLoad = this.handleLinkOnLoad.bind(this)
    this.onScriptLoaded = this.onScriptLoaded.bind(this)
    this.exit = this.exit.bind(this)
    this.onSuccess=this.onSuccess.bind(this)
  }
  onScriptLoaded(){
    window.linkHandler = Plaid.create({
      clientName: 'testing',
      env: 'development',
      key: '5dc31b6f8922727de6085b8cb5ddc7',
      //apiVersion: this.state.apiVersion,
      onExit: this.exit,
      //onLoad: this.handleLinkOnLoad,
      onSuccess: this.onSuccess,
      product: ['auth', 'transactions'],
      //selectAccount: this.state.selectAccount,
      token: this.props.plaidLink.data.token,
      //webhook: this.state.webhook,
    });

    //this.setState({disabledButton: false});
  }
  onSuccess(public_token,metadata){
    console.log(public_token,metadata,this.props.plaidLink.data)
    if(this.props.plaidLink.data.token==null)
      this.props.addBankAccount(public_token,metadata.accounts,metadata.institution,metadata.link_session_id)
    if(this.props.plaidLink.data.token && this.props.plaidLink.data.notificationIndex)
      this.props.removeNotification(this.props.plaidLink.data.notificationIndex)
  }
  handleLinkOnLoad(){
    this.state.onLoad && this.state.onLoad();
    this.setState({linkLoaded: true});
  }
  handleOnClick(){
    this.state.onClick && this.state.onClick();
    var institution = this.state.institution || null;
    if (window.linkHandler) {
      window.linkHandler.open(institution);
    }
  }
  exit(configurationObject) {
    if (window.linkHandler) {
      window.linkHandler.exit(configurationObject);
      this.props.closePlaidLink()
    }
  }
  render(){
    this.onScriptLoaded()
    if(this.props.plaidLink.data.isOpen)
      this.handleOnClick()
    return (
      null
    )
  }
}

const mapStateToProps = state => ({
  plaidLink:state.plaidLink,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    closePlaidLink:closePlaidLink,
    addBankAccount:addBankAccount,
    removeNotification:removeNotification,
  },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(PlaidLink);
