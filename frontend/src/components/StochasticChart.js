import React, { Fragment } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export default function Stochastic({ value }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stochastic Oscillator",
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 50,
            yMax: 50,
            borderColor: "rgb(0, 0, 0)",
            borderWidth: 2,
          },
        },
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
        label: "%K",
        lineTension: 0.6,
        data: value.Closing_Price.Date.map((op, i) => value.overbought[i]),
        borderColor: "rgb(162 28 175)",
        backgroundColor: "rgb(134 25 143)",
      },
      {
        label: "%D",
        lineTension: 0.6,
        data: value.Closing_Price.Date.map((op, i) => value.oversold[i]),
        borderColor: "rgb(20 184 166)",
        backgroundColor: "rgb(13 148 136)",
      },
    ],
  };

  return (
    <Fragment>
      <Line options={options} data={data} />
    </Fragment>
  );
}
