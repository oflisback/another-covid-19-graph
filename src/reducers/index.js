import { combineReducers } from "redux";
import { COUNTRIES } from "common/constants";
import {
  TOGGLE_COUNTRY_ENABLED,
  TOGGLE_CUMULATIVE,
  TOGGLE_PER_CAPITA,
} from "actionCreators";

const countries = (
  state = COUNTRIES.map((country) => ({ ...country, enabled: true })),
  action
) => {
  if (action.type === TOGGLE_COUNTRY_ENABLED) {
    let updatedCountries = JSON.parse(JSON.stringify(state));

    let country = updatedCountries.find(
      (country) => country.name === action.countryName
    );
    if (country) {
      country.enabled = !country.enabled;
    }
    return updatedCountries;
  }
  return state;
};

const options = (state = { cumulative: true, perCapita: false }, action) => {
  switch (action.type) {
    case TOGGLE_CUMULATIVE:
      return { ...state, cumulative: !state.cumulative };
    case TOGGLE_PER_CAPITA:
      return { ...state, perCapita: !state.perCapita };
    default:
      return state;
  }
};

export default combineReducers({
  countries,
  options,
});
