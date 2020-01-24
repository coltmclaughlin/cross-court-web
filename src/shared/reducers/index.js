import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from 'screens/auth/reducer';
import semSessionReducer from 'screens/sem-session/reducer';
import locationsReducer from 'screens/locations/reducer';
import sessionReducer from 'screens/sessions/reducer';
import seriesReducer from 'screens/series/reducer';
import myAccountReducer from 'screens/my-account/reducer';
import purchaseHistoryReducer from 'screens/purchase-history/reducer';
import paymentsReducer from 'screens/payments/reducer';
import checkoutReducer from 'screens/checkout/reducer';
import legalDocsReducer from 'screens/legal-docs/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    semSession: semSessionReducer,
    locations: locationsReducer,
    session: sessionReducer,
    series: seriesReducer,
    myAccount: myAccountReducer,
    purchaseHistory: purchaseHistoryReducer,
    payments: paymentsReducer,
    checkout: checkoutReducer,
    legalDocs: legalDocsReducer,
  });
