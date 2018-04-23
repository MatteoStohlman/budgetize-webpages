export function login(email,password){
	return{
		type: 'LOGIN_REQ',
    email,
    password,
	}
}

export function logout(){
	return{
		type: 'LOGOUT',
	}
}

export function updateLoginComponent(componentName,values){
	return{
		type: 'UPDATE_LOGIN_COMPONENT',
		componentName,
		values,
	}
}

export function createAccount(firstName,lastName,email,password,callback){
	return{
		type:'CREATE_ACCOUNT_REQ',
		firstName,
		lastName,
		email,
		password,
		callback:()=>callback()
	}
}
