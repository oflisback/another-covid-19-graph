import { combineReducers } from "redux";
import { COUNTRIES } from "common/constants";
import { TOGGLE_ENABLED } from "actionCreators";

const countries = (
  state = COUNTRIES.map((country) => ({ ...country, enabled: true })),
  action
) => {
  if (action.type === TOGGLE_ENABLED) {
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

export default combineReducers({
  countries,
});
