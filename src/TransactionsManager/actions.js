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
export function controlComponent(componentName,values){
	return{
		type:'UPDATE_TRANSACTION_COMPONENT',
		componentName,
		values,
	}
}
export function addTransactionNotes(transId,notes){
	return{
		type:'ADD_TRANSACTION_NOTES_REQ',
		transId,
		notes,
	}
}
