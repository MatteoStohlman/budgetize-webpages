/*global Plaid*/
import React, { Component, PropTypes } from 'react' 

class PlaidLink extends Component{
  constructor(props){
    super(props)
    this.state={
      disabledButton: false,
      linkLoaded: false,

      institution: "ins_109511",
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
  }
  onScriptLoaded(){
    window.linkHandler = Plaid.create({
      clientName: 'testing',
      env: 'sandbox',
      key: '5dc31b6f8922727de6085b8cb5ddc7',
      //apiVersion: this.state.apiVersion,
      onExit: this.exit,
      //onLoad: this.handleLinkOnLoad,
      onSuccess: this.onSuccess,
      product: ['auth', 'transactions'],
      //selectAccount: this.state.selectAccount,
      //token: this.state.token,
      //webhook: this.state.webhook,
    });

    //this.setState({disabledButton: false});
  }
  onSuccess(public_token,metadata){
    console.log(public_token,metadata)
    var resp = fetch('https://budget-master-reston.appspot.com/getAccessToken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_token: public_token,
      })
    })
    .then(response=>response.text())
    .then(data=>{console.log(data)})
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
    }
  }
  render(){
    this.onScriptLoaded()
    return (
      <button
        onClick={this.handleOnClick}
        disabled={this.state.disabledButton}
        style={this.state.style}
        className={this.state.className}
      >
        <span>{this.state.buttonText}</span>
      </button>
    )
  }
}

export default PlaidLink;