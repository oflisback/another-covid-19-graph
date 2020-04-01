import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import React from "react";
import ReactDOM from "react-dom";
import "tachyons";
import "./index.css";
import Graph from "./GraphWithQuery";

const httpLink = new HttpLink({ uri: "https://covid19-graphql.now.sh" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Graph />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
