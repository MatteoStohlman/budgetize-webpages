export function openPlaidLink(token=null,successCallback=false){
	return{
		type: 'OPEN_PLAID_LINK',
    token,
		successCallback,
	}
}
export function closePlaidLink(token=null){
	return{
		type: 'CLOSE_PLAID_LINK',
    token
	}
}

export function addBankAccount(public_token,accounts,institution,link_session_id){
	return{
		type:'ADD_BANK_ACCOUNT_REQ',
		public_token,
		accounts,
		institution,
		link_session_id
	}
}

export function updateBankAccounts(){
	return{
		type:'GET_BANK_ACCOUNTS_REQ',
	}
}
