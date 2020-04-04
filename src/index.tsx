import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import { render } from "react-dom";
import "tachyons";
import "index.css";
import App from "components/App";
import configureStore from "configureStore";

const httpLink = new HttpLink({ uri: "https://covid19-graphql.now.sh" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const renderApp = () => {
  render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ReduxProvider store={configureStore()}>
          <App />
        </ReduxProvider>
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("components/App", renderApp);
}

renderApp();
