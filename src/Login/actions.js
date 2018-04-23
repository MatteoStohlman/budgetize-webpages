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
	console.log('running action');
	return{
		type: 'UPDATE_LOGIN_COMPONENT',
		componentName,
		values,
	}
}
