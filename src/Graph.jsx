import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import React from "react";
import moment from "moment";
import "./Graph.css";

const Graph = ({ getStuff, staticData }) => {

  let dateToValueMap = {};
  console.log(getStuff)
  if (getStuff.loading) {
    return (
      <div className="App">
        <header className="App-header">Loading jao</header>
      </div>
    );
  }

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

  const countriesToShow = ['Italy', 'US']

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
        Deaths by country since first day of 20+ deaths {staticData ? '(static data)' : ''}
        <LineChart
          width={1000}
          height={800}
          data={graphData}
          margin={{ top: 50, left: 50, right: 50 }}
          padding={{ top: 50, left: 50, right: 50 }}
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
          {countriesToShow.map(countryName =>
            <Line dataKey={`deaths${countryName}`} key={countryName} name={countryName} stroke={colors[countryName]} dot={false} />
          )}
        </LineChart>
      </header>
    </div>
  );
};

export default Graph;
