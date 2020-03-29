import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import "./Graph.css";

const Graph = ({ getStuff }) => {
  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Loading jao</header>
      </div>
    );
  }

  let dateToValueMap = {};

  getStuff.results.forEach((entry) => {
    if (dateToValueMap.hasOwnProperty(entry.date)) {
      dateToValueMap[entry.date] = {
        ...dateToValueMap[entry.date],
        [entry.country.name]: { deaths: entry.deaths },
      };
    } else {
      dateToValueMap[entry.date] = {
        [entry.country.name]: { deaths: entry.deaths },
      };
    }
  });

  const graphData = [];

  Object.entries(dateToValueMap).forEach(([date, entry]) => {
    let data = {
      date,
    };
    Object.entries(entry).forEach(([country, countryData]) => {
      Object.entries(countryData).forEach(([property, value]) => {
        data[`${property}${country}`] = value;
      });
    });
    graphData.push(data);
  });

  // Gör en map Datum till deaths

  // Få till att kunna visa både italien och usa ..
  // i förlängningen rita graferna från att länderna haft tio deaths på en dag, se hur det utvecklas då.

  const formatXAxis = (tickItem) => moment(tickItem).format("DD/M");

  // Fler länder
  // bättre tooltip
  // bättre x-axel values, ändå större grid
  const colors = {
    'US': '#8D4A53',
    'Italy': '#8F698D'
  }

  return (
    <div className="App">
      <header className="App-header">
        Deaths by country since first day of 20+ deaths
        <LineChart
          width={1000}
          height={800}
          data={graphData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            angle={45}
            height={100}
            tickMargin={30}
            tickFormatter={formatXAxis}
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dataKey="deathsItaly" stroke={colors.Italy} dot={false} />
          <Line dataKey="deathsUS" stroke={colors.US} dot={false} />
        </LineChart>
      </header>
    </div>
  );
};

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
