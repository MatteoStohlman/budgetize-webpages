import CategoryManagerSaga from 'CategoryManager/saga'
import MappingManagerSaga from 'MappingManager/saga'
import TransactionsManagerSaga from 'TransactionsManager/saga'
import BudgetManagerSaga from 'BudgetManager/saga'
import LoginSaga from 'Login/saga'
import NotificationsSaga from 'Notifications/saga'
import PlaidSaga from 'Plaid/saga'

export default function* IndexSaga () {
  yield [
      CategoryManagerSaga(),
      MappingManagerSaga(),
      TransactionsManagerSaga(),
      BudgetManagerSaga(),
      LoginSaga(),
      NotificationsSaga(),
      PlaidSaga(),
  ]
}
