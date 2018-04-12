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
