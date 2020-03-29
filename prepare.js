const data = require("./response.js").data;

console.log("Nbr results: " + data.results.length);

let dateToValueMap = {};

console.log(data.results[0]);

data.results.forEach((entry) => {
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

console.log(dateToValueMap);

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

console.log(graphData);

/*
const receivedData = data.getStuff.results.map(
    (value: { country: { name: string }; date: string; deaths: number }) => ({
      country: value.country.name,
      date: value.date,
      deaths: value.deaths,
    })
  );



console.log(data);
*/
