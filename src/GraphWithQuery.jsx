import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Graph from './Graph'

const GET_STUFF = gql`
  query GetStuff {
    results(countries: ["Canada", "Italy", "Japan", "Korea, South", "Spain", "Sweden", "US"], date: { gt: "1/1/2020" }) {
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
