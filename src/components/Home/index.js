import React from "react";
import DataSet from '../DataSet';

import './style.css';

export default function Homepage() {

  return (
    <div className="charts-container">
      <DataSet dataset="pages" diff={100} max={2000} />
      <DataSet dataset="posts" diff={500} max={5000} />
    </div>
  );
}
