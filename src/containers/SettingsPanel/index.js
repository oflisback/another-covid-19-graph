import { connect } from "react-redux";
import SettingsPanel from "components/SettingsPanel";
import {
  toggleCumulative,
  toggleCountryEnabled,
  togglePerCapita,
} from "actionCreators";

const mapStateToProps = (state) => ({
  countries: state.countries,
  options: state.options,
});

const mapDispatchToProps = {
  toggleCountryEnabled,
  toggleCumulative,
  togglePerCapita,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
