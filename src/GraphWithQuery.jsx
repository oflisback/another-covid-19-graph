import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Graph from './Graph'

const GET_STUFF = gql`
  query GetStuff {
    results(countries: ["Italy", "US"], date: { gt: "3/10/2020" }) {
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
