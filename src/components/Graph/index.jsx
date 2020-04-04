import {
  LineChart,
  Line,
  Text,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getDeathsSinceDayZeroGraphData } from 'common/util';
import "./Graph.css";

const Graph = ({ countries, getStuff, options }) => {
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  const handleResize = () => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    })

  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Fetching data ...</header>
      </div>
    );
  }

  const DAY_ZERO_DEATHS = 10
  const enabledCountries = countries.filter(country => country.enabled)

  if (enabledCountries.length === 0) {
    return (
      <div className="App">
        <header className="App-header">Select at least one country</header>
      </div>
    );
  }


  let graphData = getDeathsSinceDayZeroGraphData(getStuff.results, { countries: enabledCountries.map(country => country.name), cumulative: options.cumulative, startDeaths: DAY_ZERO_DEATHS })

  if (options.perCapita) {
    enabledCountries.forEach(country => {
      graphData = graphData.map(data => ({ ...data, [country.name]: data[country.name] ? Number((data[country.name] / (country.population / 100000)).toFixed(2)): undefined }))
    })
    // Fill holes in graphData, for perCapita when there were no deaths we set the value to undefined, but it should be zero.
    enabledCountries.forEach(country => {
      const lastIndex = graphData.map(data => data[country.name] !== undefined).lastIndexOf(true);
      graphData = graphData.map((data, index) => ({
        ...data,
        [country.name]: index < lastIndex && !data[country.name] ? 0: data[country.name]
      }))
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Covid-19
        <LineChart
          width={dimensions.width - 200 - 1}
          height={dimensions.height - 100}
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
          <Tooltip labelFormatter={day => `Day ${day}`} />
          <CartesianGrid stroke="#f5f5f5" />
          {enabledCountries.map(country =>
            <Line dataKey={country.name} key={country.name} name={country.name} stroke={country.color} dot={false} />
          )}
        </LineChart>
      </header>
    </div>
  );
};

Graph.propTypes = {
  countries: PropTypes.array.isRequired,
  getStuff: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};


export default Graph;
