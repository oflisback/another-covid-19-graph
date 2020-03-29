import Graph from './Graph'
import React from "react";
import getStuff from './response.js'
import "./Graph.css";

export default () => <Graph getStuff={{ results: getStuff.data.results, loading: false }} staticData />
