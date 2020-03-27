import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import "./Graph.css";

const Graph = ({ getStuff }: any) => {
  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Loading jao</header>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        {getStuff ? getStuff.country.name : null}
      </header>
    </div>
  );
};

const GET_STUFF = gql`
  query GetStuff {
    country(name: "US") {
      name
      mostRecent {
        date(format: "yyyy-MM-dd")
        confirmed
      }
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
