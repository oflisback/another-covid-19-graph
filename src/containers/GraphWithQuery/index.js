import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Graph from "components/Graph";

// Create our enhancer function.
const withQuery = graphql(
  gql`
    query GetStuff {
      results(
        countries: [
          "Canada"
          "Italy"
          "Japan"
          "Korea, South"
          "Spain"
          "Sweden"
          "US"
        ]
        date: { gt: "1/1/2020" }
      ) {
        country {
          name
        }
        date
        deaths
      }
    }
  `,
  {
    name: "getStuff",
    options: {
      fetchPolicy: "network-only",
    },
  }
);

const GraphWithQuery = withQuery(Graph);

const mapStateToProps = (state, ownProps) => ({
  countries: state.countries,
  getStuff: ownProps.getStuff,
});

export default connect(mapStateToProps)(GraphWithQuery);
