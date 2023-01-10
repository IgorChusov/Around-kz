import { combineReducers, Reducer } from 'redux';
import { accountReducer, TAccountState } from './account/reducer';
import { searchReducer, TSearchState } from './search/reducer';
import { sessionReducer, TSessionState } from './session/reducer';
import { businessmenReducer, TBusinessmenState } from './businessman/reducer'
import { marketReducer, TMarketState } from './market/reduser';
import { adsReducer, TAdsState } from './ads/reduser';
import { scheduleReducer, TScheduleState } from './schedule/reducer';

export type RootState = {
  session: TSessionState,
  account: TAccountState,
  search: TSearchState,
  businessmen: TBusinessmenState,
  market: TMarketState,
  ads: TAdsState
  schedule: TScheduleState
}
// Combine different shrinking functions
// into a single function for the store object.
const combineReducer = combineReducers({
  session: sessionReducer,
  account: accountReducer,
  search: searchReducer,
  businessmen: businessmenReducer,
  market: marketReducer,
  ads: adsReducer,
  schedule: scheduleReducer
});

// Return the initial state in response to a request.
export const rootReducer: Reducer = (state, action) => {
  return combineReducer(state, action);
}
