export const TOGGLE_COUNTRY_ENABLED = "toggleCountryEnabled";
export const TOGGLE_CUMULATIVE = "toggleCumulative";
export const TOGGLE_PER_CAPITA = "togglePerCapita";

export const toggleCountryEnabled = (countryName) => ({
  type: TOGGLE_COUNTRY_ENABLED,
  countryName,
});

export const toggleCumulative = () => ({
  type: TOGGLE_CUMULATIVE,
});

export const togglePerCapita = () => ({
  type: TOGGLE_PER_CAPITA,
});
