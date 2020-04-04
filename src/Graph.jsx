import {
  LineChart,
  Line,
  Text,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import React from "react";
import { getDeathsSinceDayZeroGraphData } from './util';
import "./Graph.css";

const Graph = ({ countries, getStuff }) => {

  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Loading jao</header>
      </div>
    );
  }

  const DAY_ZERO_DEATHS = 10

  const graphData = getDeathsSinceDayZeroGraphData(getStuff.results, { countries: countries.map(country => country.name), startDeaths: DAY_ZERO_DEATHS })

  return (
    <div className="App">
      <header className="App-header">
        Covid-19
        <LineChart
          width={1400}
          height={800}
          data={graphData}
          margin={{ bottom: 100, top: 100, left: 100, right: 100 }}
          padding={{ bottom: 50, top: 50, left: 50, right: 50 }}
        >
          <XAxis
            dataKey="day"
            height={100}
            label={<Text x={0} y={0} dx={580} dy={720} offset={0}>Days since 10 deaths</Text>}
            interval={1}
            tickMargin={30}
          />
          <YAxis
            label={<Text x={0} y={0} dx={50} dy={400} offset={0} angle={-90}>Deaths</Text>}
          />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          {countries.map(country =>
            <Line dataKey={country.name} key={country.name} name={country.name} stroke={country.color} dot={false} />
          )}
        </LineChart>
      </header>
    </div>
  );
};

export default Graph;
