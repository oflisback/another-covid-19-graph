const moment = require("moment");

const DATE_FORMAT = "YYYY-M-D";

export const getDeathsSinceDayZeroGraphData = (
  results,
  { countries, cumulative, startDeaths }
) => {
  let dateToValueMap = {};

  results.forEach((entry) => {
    let deaths = entry.deaths;
    if (dateToValueMap.hasOwnProperty(entry.date)) {
      dateToValueMap[entry.date] = {
        ...dateToValueMap[entry.date],
        [entry.country.name]: {
          deaths,
        },
      };
    } else {
      dateToValueMap[entry.date] = {
        [entry.country.name]: { deaths },
      };
    }
  });

  if (!cumulative) {
    Object.keys(dateToValueMap).forEach((date) => {
      const prevDay = moment(date, DATE_FORMAT)
        .subtract(1, "days")
        .format(DATE_FORMAT);
      countries.forEach((countryName) => {
        if (dateToValueMap[date][countryName]) {
          dateToValueMap[date] = {
            ...dateToValueMap[date],
            [countryName]: {
              ...dateToValueMap[date][countryName],
              dayDeaths:
                dateToValueMap[prevDay] && dateToValueMap[prevDay][countryName]
                  ? dateToValueMap[date][countryName].deaths -
                    dateToValueMap[prevDay][countryName].deaths
                  : 0,
            },
          };
        }
      });
    });
  }

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

  let countryToDayZeroMap = {};

  countries.forEach((country) => {
    let minimumDayZeroDate = moment();
    Object.entries(dateToValueMap).forEach(([date, entry]) => {
      if (entry[country] && entry[country].deaths > startDeaths) {
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

  const dayZeroValues = Object.values(countryToDayZeroMap);
  const minDayZero =
    dayZeroValues.length === 1
      ? moment(dayZeroValues[0])
      : dayZeroValues.reduce((a, b) =>
          moment.min([moment(a, DATE_FORMAT), moment(b, DATE_FORMAT)])
        );

  const lastDay = Object.keys(dateToValueMap).reduce((a, b) =>
    moment.max([moment(a, DATE_FORMAT), moment(b, DATE_FORMAT)])
  );

  console.log(countryToDayZeroMap);

  const nbrOfDays = Math.round(
    moment.duration(lastDay.diff(minDayZero)).asDays() + 1
  );

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
        [country]: dateToValueMap[dates[i]]
          ? cumulative
            ? dateToValueMap[dates[i]][country].deaths
            : dateToValueMap[dates[i]][country].dayDeaths
          : 0,
      };
      insertIndex++;
    }
  });
  return dayZeroGraphData;
};
