import React, { Fragment, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function CciChart({ value }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Commodity Channel Index",
      },
    },
  };
  const dateFormat = (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "-" + mm + "-" + yyyy;
  };

  var labels = [];
  for (let i = 0; i < value.Closing_Price.Date.length; i++) {
    labels[i] = dateFormat(value.Closing_Price.Date[i]);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "CCI",
        lineTension: 0.6,
        data: value.Closing_Price.Date.map((op, i) => value.cci[i]),
        borderColor: "rgb(245 158 11)",
        backgroundColor: "rgb(180 83 9)",
      },
    ],
  };

  return (
    <Fragment>
      <Line options={options} data={data} />
    </Fragment>
  );
}
