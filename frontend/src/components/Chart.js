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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart({ value }) {
  const [showSma, setShowSma] = useState(false);
  const [showBollinger, setBollingerSma] = useState(false);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
        labels: {
          fontColor: "rgb(255, 99, 132)",
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

  var bollingerHigh = {
    label: "Bollinger Bands Indicator High",
    hidden: showBollinger ? false : true,
    fill: "start",
    data: value.Closing_Price.Date.map((op, i) => value.bb_bbh[i]),
    borderColor: "rgb(13 148 136)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  };
  var bollingerLow = {
    label: "Bollinger Bands Indicator Low",
    hidden: showBollinger ? false : true,
    fill: "end",
    data: value.Closing_Price.Date.map((op, i) => value.bb_bbl[i]),
    borderColor: "rgb(219 39 119)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  };
  var sma = {
    label: "Simple Moving Average",
    hidden: showSma ? false : true,
    data: value.Closing_Price.Date.map((op, i) => value.SMA[i]),
    borderColor: "rgb(107 33 168)",
    backgroundColor: "rgb(88 28 135)",
  };


  const data = {
    labels,
    datasets: [
      {
        label: "Closing Price",
        data: value.Closing_Price.Date.map(
          (op, i) => value.Closing_Price.Price[i]
        ),
        borderColor: "rgb(120 113 108)",
        backgroundColor: "rgb(87 83 78)",
      },
      sma,
      bollingerHigh,
      bollingerLow,
    ],
  };

  return (
    <Fragment>
      <Line options={options} data={data} />
      <div className="my-2 block">
        <h4 className="text-lg mx-auto my-2 text-center">Show on graph</h4>
        <div className="flex justify-center flex-wrap">
          <button
            onClick={() => setShowSma(!showSma)}
            className={`sm:my-1 my-2 text-sm sm:text-base p-2 ease-in duration-200 rounded border-2 border-sky-600 mr-2 hover:bg-blue-700 hover:border-blue-300 ${
              showSma ? "bg-blue-700" : "bg-transparent"
            }`}
          >
            Simple Moving Average
          </button>
          <button
            onClick={() => setBollingerSma(!showBollinger)}
            className={`sm:my-1 my-2 text-sm sm:text-base p-2 ease-in duration-200 rounded border-2 border-sky-600 hover:bg-blue-700 hover:border-blue-300 ${
              showBollinger ? "bg-blue-700" : "bg-transparent"
            }`}
          >
            Bollinger Band
          </button>
        </div>
      </div>
    </Fragment>
  );
}
