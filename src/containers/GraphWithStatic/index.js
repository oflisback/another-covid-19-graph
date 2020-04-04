import { connect } from "react-redux";
import Graph from "components/Graph";
import staticData from "./staticData.js";

const mapStateToProps = (state) => ({
  countries: state.countries,
  getStuff: { results: staticData.data.results, loading: false },
  options: state.options,
});

export default connect(mapStateToProps)(Graph);
