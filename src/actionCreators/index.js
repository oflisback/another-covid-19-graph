export const TOGGLE_ENABLED = "toggleEnabled";

export const toggleEnabled = (countryName) => ({
  type: TOGGLE_ENABLED,
  countryName,
});
