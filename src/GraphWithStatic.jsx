import Graph from './Graph'
import React from "react";
import getStuff from './response.js'
import "./Graph.css";

export default ({ countries }) => <Graph countries={countries} getStuff={{ results: getStuff.data.results, loading: false }} staticData />
