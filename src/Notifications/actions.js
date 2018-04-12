export function updateNotifications(userId){
	return{
		type: 'UPDATE_NOTIFICATIONS_REQ',
    userId
	}
}

export function openUpdatePlaidLink(accessToken,notificationIndex){
	return{
		type:'OPEN_UPDATE_PLAID_LINK_REQ',
		accessToken,
		notificationIndex,
	}
}

export function removeNotification(index=false){
	return{
		type:'REMOVE_NOTIFICATION',
		index
	}
}
