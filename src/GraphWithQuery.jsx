import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Graph from './Graph'

// Create our enhancer function.
const withQuery = graphql(gql`
  query GetStuff {
    results(countries: ["Canada", "Italy", "Japan", "Korea, South", "Spain", "Sweden", "US"], date: { gt: "1/1/2020" }) {
      country {
        name
      }
      date
      deaths
    }
  }`,
  {
    name: "getStuff",
    options: {
      fetchPolicy: "network-only",
    }
  }
);

export default withQuery(Graph)
