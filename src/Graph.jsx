import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { COUNTRIES } from './constants'
import React from "react";
import { getDeathsSinceDayZeroGraphData } from './util';
import "./Graph.css";

const Graph = ({ getStuff, staticData }) => {

  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Loading jao</header>
      </div>
    );
  }

  console.log(getStuff)

  const DAY_ZERO_DEATHS = 10

  const graphData = getDeathsSinceDayZeroGraphData(getStuff.results, { countries: COUNTRIES, startDeaths: DAY_ZERO_DEATHS })

  const colors = {
    'Italy': '#725675',
    'Japan': '#376D7F',
    'Spain': '#2F795D',
    'Sweden': '#6D7935',
    'US': '#87464A',
  }

  return (
    <div className="App">
      <header className="App-header">
        Deaths by country since first day of {DAY_ZERO_DEATHS}+ deaths {staticData ? '(static data)' : ''}
        <LineChart
          width={1400}
          height={800}
          data={graphData}
          margin={{ top: 50, left: 50, right: 50 }}
          padding={{ top: 50, left: 50, right: 50 }}
        >
          <XAxis
            dataKey="day"
            height={100}
            tickMargin={30}
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          {COUNTRIES.map(countryName =>
            <Line dataKey={countryName} key={countryName} name={countryName} stroke={colors[countryName]} dot={false} />
          )}
        </LineChart>
      </header>
    </div>
  );
};

export default Graph;
