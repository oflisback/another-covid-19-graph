import { connect } from "react-redux";
import Graph from "components/Graph";

const mapStateToProps = (state) => ({
  countries: state.countries,
});

export default connect(mapStateToProps)(Graph);
