# Covid-19 death graph

This graph shows deaths after day zero in each country, where day zero in this case is they day of 10 total registered deaths due to the covid-19 disease.

The project uses [Recharts](https://recharts.org/en-US/) for the graph and this [Graph QL API](https://github.com/rlindskog/covid19-graphql) based on data from the [John Hopkins University](https://systems.jhu.edu/research/public-health/ncov/).

### Live version

See the graph at [https://another-covid-19.netlify.com](https://another-covid-19.netlify.com)

### Running

Install dependencies

```
yarn install
```

Run with static data during development

```
yarn start-static
```

Or run with data fetched from the GraphQL endpoint

```
yarn start-query
```
