import { connect } from "react-redux";
import SettingsPanel from "components/SettingsPanel";
import { toggleEnabled } from "actionCreators";

const mapStateToProps = (state) => ({
  countries: state.countries,
});

const mapDispatchToProps = { toggleEnabled };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);
