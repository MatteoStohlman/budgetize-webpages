export function updateBudget(month,year=2018){
	return{
		type: 'UPDATE_BUDGET_REQ',
		month,
		year

	}
}

export function toggleAddBudget(override=null,initialValues=false){
	return {
		type:'TOGGLE_ADD_BUDGET',
		override,
		initialValues,
	}
}

export function removeTransactionFromBudget(transactionId){
	return{
		type:'REMOVE_TRANS_FROM_BUDGET',
		transactionId
	}
}
