import { combineReducers } from 'redux'

import CategoryManagerReducer from 'CategoryManager/reducer'
import MappingManagerReducer from 'MappingManager/reducer'
import TransactionsManagerReducer from 'TransactionsManager/reducer'
import BudgetManagerReducer from 'BudgetManager/reducer'
import LoginReducer from 'Login/reducer'
import NotificationsReducer from 'Notifications/reducer'
import PlaidReducer from 'Plaid/reducer'

const IndexReducer = combineReducers({
	categories:CategoryManagerReducer,
	mappings:MappingManagerReducer,
	transactions:TransactionsManagerReducer,
	budget:BudgetManagerReducer,
	user:LoginReducer,
	notifications:NotificationsReducer,
	plaidLink:PlaidReducer,
})

export default IndexReducer
