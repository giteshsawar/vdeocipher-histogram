import React from "react";
import Chart from "react-google-charts";

export default function ChartComp(props) {
  const { data } = props;
  return <Chart chartType="Bar" width="100%" height="400px" data={data} />;
}
