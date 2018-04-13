export function updateTransactions(){
	return{
		type: 'UPDATE_TRANS_REQ',
	}
}
export function ignoreTransaction(transactionId){
	return{
		type:'IGNORE_TRANS_REQ',
		transactionId
	}
}
