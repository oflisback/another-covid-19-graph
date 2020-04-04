import { combineReducers } from "redux";
import { COUNTRIES } from "common/constants";
import { TOGGLE_ENABLED } from "actionCreators";

const countriesReducer = (
  state = COUNTRIES.map((country) => ({ ...country, enabled: true })),
  action
) => {
  if (action.type === TOGGLE_ENABLED) {
  }
  return state;
};

export default combineReducers({
  countriesReducer,
});
