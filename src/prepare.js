const data = require("./response.js").data;
const moment = require("moment");

console.log("Nbr results: " + data.results.length);

let dateToValueMap = {};

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

const countries = ["Italy", "US"];

let countryToDayZeroMap = {};

const DAY_ZERO_DEATHS = 1000;
const DATE_FORMAT = "YYYY-M-D";

countries.forEach((country) => {
  let minimumDayZeroDate = moment();
  Object.entries(dateToValueMap).forEach(([date, entry]) => {
    if (entry[country].deaths > DAY_ZERO_DEATHS) {
      if (!countryToDayZeroMap[country]) {
        countryToDayZeroMap[country] = date;
        minimumDayZeroDate = moment(date, DATE_FORMAT);
      } else {
        if (minimumDayZeroDate.isAfter(moment(date, DATE_FORMAT))) {
          countryToDayZeroMap[country] = date;
          minimumDayZeroDate = moment(date, DATE_FORMAT);
        }
      }
    }
  });
});

const minDayZero = Object.values(countryToDayZeroMap).reduce((a, b) =>
  moment.min([moment(a, DATE_FORMAT), moment(b, DATE_FORMAT)])
);

const lastDay = Object.keys(dateToValueMap).reduce((a, b) =>
  moment.max([moment(a, DATE_FORMAT), moment(b, DATE_FORMAT)])
);

console.log("First dayzero: " + minDayZero.format(DATE_FORMAT));

const nbrOfDays = moment.duration(lastDay.diff(minDayZero)).asDays() + 1;

let dayZeroGraphData = new Array(nbrOfDays).fill({});

countries.forEach((country) => {
  const startIndex = Object.keys(dateToValueMap).findIndex(
    (date) => date === countryToDayZeroMap[country]
  );

  let insertIndex = 0;
  const dates = Object.keys(dateToValueMap);
  for (let i = startIndex; i < dates.length; i++) {
    dayZeroGraphData[insertIndex] = {
      ...dayZeroGraphData[insertIndex],
      day: insertIndex,
      [country]: dateToValueMap[dates[i]][country].deaths,
    };
    insertIndex++;
  }
});

console.log(dayZeroGraphData);
