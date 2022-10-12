import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getStockDetails } from "../actions/stocksAction";
import CciChart from "../components/CciChart";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import MarketCapChart from "../components/MarketCapChart";
import ReturnChart from "../components/ReturnChart";
import RsiChart from "../components/RsiChart";
import Stochastic from "../components/StochasticChart";

const Details = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [symbol, setSymbol] = useState('')
  const [slidingValue, setSlidingValue] = useState()
  // const symbol = params.symbol;
  const { loading, error, stock } = useSelector((state) => state.stockDetails);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    setSymbol(params.symbol)
    dispatch(getStockDetails(symbol, "nse"));

    setSlidingValue(stock.market ? (((stock.market["totalBuyQuantity"]
        ? stock.market["totalBuyQuantity"]
        : 0 - stock.market["totalSellQuantity"]
        ? stock.market["totalSellQuantity"]
        : 0) /
        (stock.market["totalBuyQuantity"] + stock.market["totalSellQuantity"])) *
      100) : 50);

      return
  }, [symbol, dispatch, error, params, slidingValue]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        stock && stock.market && (
          <div className="lg:min-w-max sm:max-w-screen-xl px-1 lg:px-4 py-32 mx-auto w-screen lg:h-fit">
            <div className="text-white bg-gray-800">
              <div className="flex items-center">
                <h1 className="p-2 font-bold text-base sm:text-xl">
                  {stock.market.companyName} :
                </h1>
                <h2 className="p-2 font-bold text-base sm:text-xl">
                  Rs. {stock.market.lastPrice}
                </h2>
              </div>
              <div className="my-2">
                {stock.Closing_Price ? <Chart value={stock} /> : ""}
              </div>
              {stock.RSI ? (
                <div className="my-3 flex flex-col">
                  <h3 className="mx-auto text-lg text-slate-600 font-bold">
                    Technical Analysis
                  </h3>
                  <div className="flex flex-col lg:flex-row justify-between py-2 items-center">
                    <div className="w-screen lg:w-6/12">
                      <RsiChart value={stock} />
                    </div>
                    <div className="w-screen lg:w-6/12">
                      <Stochastic value={stock} />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between py-2 items-center">
                    <div className="w-screen lg:w-6/12">
                      <ReturnChart value={stock} />
                    </div>
                    <div className="w-screen lg:w-6/12 ml-2">
                      <MarketCapChart value={stock} />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-center py-2 items-center">
                    <div className="w-screen lg:w-6/12">
                      <CciChart value={stock} />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="mt-2 border-x-2 border-gray-600">
                <div className="my-2 mx-auto w-1/2">
                  <div className="h-4 bg-gradient-to-r from-green-500 to-red-500 relative mr-2">
                    <span
                      className="w-2 h-6 absolute bg-gradient-to-r from-blue-500 to-sky-500"
                      style={{
                        top: "-3px",
                        left: `${
                          stock.market["totalBuyQuantity"] === null
                            ? 0
                            : stock.market["totalSellQuantity"] === null
                            ? 100
                            : slidingValue
                        }%`,
                      }}
                    ></span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="w-full lg:w-1/2 px-2 border-r-2 border-gray-600">
                    <div className="flex justify-center items-center">
                      <h3 className="font-bold text-lg border-b-2 border-gray-600">
                        Buying Market
                      </h3>
                    </div>
                    <div className="flex flex-row items-center justify-between ease-in duration-200">
                      <span className="text-lg font-bold">Price</span>
                      <span className="text-lg font-bold">Quantity</span>
                    </div>
                    {[...Array(5)].map((x, i) => (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-between ease-in duration-200"
                      >
                        <span>{stock.market["buyPrice" + (i + 1)]}</span>
                        <span>{stock.market["buyQuantity" + (i + 1)]}</span>
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <span className="font-bold">Total Quantity</span>
                      <span className="font-bold">
                        {stock.market["totalBuyQuantity"]
                          ? stock.market["totalBuyQuantity"]
                          : "null"}
                      </span>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-2">
                    <div className="flex justify-center items-center">
                      <h3 className="font-bold text-lg border-b-2 border-gray-600">
                        Selling Market
                      </h3>
                    </div>
                    <div className="flex flex-row items-center justify-between ease-in duration-200">
                      <span className="text-lg font-bold">Price</span>
                      <span className="text-lg font-bold">Quantity</span>
                    </div>
                    {[...Array(5)].map((x, i) => (
                      <div
                        key={i}
                        className="flex flex-row items-center justify-between w-full"
                      >
                        <span>{stock.market["sellPrice" + (i + 1)]}</span>
                        <span>{stock.market["sellQuantity" + (i + 1)]}</span>
                      </div>
                    ))}
                    <div className="flex flex-row items-center justify-between">
                      <span className="font-bold">Total Quantity</span>
                      <span className="font-bold">
                        {stock.market["totalSellQuantity"]
                          ? stock.market["totalSellQuantity"]
                          : "null"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-t-2 border-gray-500 flex-col lg:flex-row items-center my-2">
                <div className="w-full p-2">
                  <div className="mx-auto text-center">
                    <span className="font-bold text-lg">More Details</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Symbol</span>
                    <span className="font-bold">{stock.market.symbol}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Average Price</span>
                    <span className="font-bold">
                      {stock.market.averagePrice}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Open Price</span>
                    <span className="font-bold">{stock.market.open}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Upper Circuit</span>
                    <span className="font-bold">
                      {stock.market.pricebandupper}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Lower Circuit</span>
                    <span className="font-bold">
                      {stock.market.pricebandlower}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">52 week high</span>
                    <span className="font-bold">{stock.market.high52}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">52 week low</span>
                    <span className="font-bold">{stock.market.low52}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Margin</span>
                    <span className="font-bold">
                      {stock.market.applicableMargin}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Day Low</span>
                    <span className="font-bold">{stock.market.dayLow}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Total Traded Volume</span>
                    <span className="font-bold">
                      {stock.market.totalTradedVolume}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Total Traded Value</span>
                    <span className="font-bold">
                      {stock.market.totalTradedValue}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">
                      Delivery To Traded Quantity
                    </span>
                    <span className="font-bold">
                      {stock.market.deliveryToTradedQuantity}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">Surv Indicator</span>
                    <span className="font-bold">
                      {stock.market.surv_indicator
                        ? stock.market.surv_indicator
                        : "null"}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">
                      Bollinger Band High Indicator
                    </span>
                    <span className="font-bold">{stock.bb_bbhi}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between p-2 bg-gray-900 border-2 border-gray-700 ease-in duration-100 hover:bg-gray-600 border-gray-900 rounded-md my-1">
                    <span className="font-bold">
                      Bollinger Band Low Indicator
                    </span>
                    <span className="font-bold">{stock.bb_bbli}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default Details;
