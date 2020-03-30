import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Graph from './Graph'
import { COUNTRIES } from './constants.js'

const GET_STUFF = gql`
  query GetStuff {
    results(countries: ["Italy", "Spain", "Sweden", "US"], date: { gt: "1/1/2020" }) {
      country {
        name
      }
      date
      deaths
    }
  }
`;

const GraphWithQuery = graphql(GET_STUFF, {
  name: "getStuff",
  options: {
    fetchPolicy: "network-only",
  },
})(Graph);

export default GraphWithQuery;
