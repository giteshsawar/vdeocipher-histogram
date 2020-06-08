import React, { useState } from "react";
import ChartComp from "../Chart";
import { getData, calculateTotalCount } from "../../utils/data";

import "./style.css";

function DataSet(props) {
  const { dataset, diff, max } = props;
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoadingStatus] = useState(false);
  const [difference, setDifference] = useState(diff);
  const [maximum, setMaximum] = useState(max);

  const getChartData = async () => {
    setLoadingStatus(true);
    const data = await getData(dataset, difference, maximum);
    if (!data) return window.alert("Not able to fetch data");

    setRawData(data);
    const mappedData = calculateTotalCount(data, {
      dataset,
      diff,
      max,
    });

    setChartData(mappedData);
    setLoadingStatus(false);
  };

  const getInputValue = e => {
    const { name, value } = e.target;
    const num = Number(value);
    console.log('set new value', num, typeof num);
    if (name === 'max') return setMaximum(num);

    if (num <= maximum) return setDifference(num);

    alert('Difference must be smaller than maximum');
  };

  const updateChart = () => {
    const mappedData = calculateTotalCount(rawData, { dataset, diff: difference, max: maximum });
    setChartData(mappedData);
  };

  return (
    <div className="chart">
      {chartData.length ? (
        <div className="chart_comp" id="chart_container">
          <div className="field_inputs">
            <div className="input_div">
              Difference: <input type="number" name="diff" value={difference} onChange={getInputValue} />
            </div>
            <div className="input_div">
              Max: <input type="number" name="max" value={maximum} onChange={getInputValue} />
            </div>
            <div className="input_div">
              <button className="btn" onClick={updateChart}>Update</button>
            </div>
          </div>
          <ChartComp data={chartData} />
        </div>
      ) : (
        <div>
          {loading ? (
            <p id="laoding_msg">Loading data...</p>
          ) : (
            <p id="fetch_data" onClick={getChartData}>Click here to get {dataset} data</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DataSet;
