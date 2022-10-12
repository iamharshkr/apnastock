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

export default function MarketCapChart({ value }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: 'Market Capital',
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
        label: "Market Cap",
        lineTension: 0.6,
        data: value.Closing_Price.Date.map((op, i) => value.MarketCap[i]),
        borderColor: "rgb(180 83 9)",
        backgroundColor: "rgb(120 53 15)",
      },
    ],
  };

  return (
    <Fragment>
      <Line options={options} data={data} />
    </Fragment>
  );
}
