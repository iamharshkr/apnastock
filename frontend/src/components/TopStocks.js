import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopStocks = () => {
  const { gainers, losers } = useSelector((state) => state.topStocks);

  return (
    <div id="top" className="px-0 lg:px-4 my-2 flex flex-col lg:flex-row bg-gray-900 border-y-2 border-slate-600">
      <div className="w-full lg:w-1/2">
        <h1 className="font-bold text-xl text-center text-green-500">
          Top Gainers
        </h1>
        <div className="flex flex-col border-x-2 border-gray-500 mb-2">
          {gainers.map((gainer) => (
            <Link
              key={gainer.symbol}
              className="flex flex-row justify-between items-center py-2 border-y-2 border-gray-800 text-slate-300 hover:bg-white hover:text-cyan-500 hover:border-sky-600"
              to={`/stock/${gainer.symbol}`}
            >
              <span
                className="ml-2 text-sm font-bold cursor-pointer"
                id={gainer.symbol}
              >
                {gainer.symbol}
              </span>
              <div className="mr-2 flex flex-row justify-center align-middle items-center">
                <span className="text-sm font-bold">₹ {gainer.netPrice}</span>
                <AiOutlineArrowUp className="text-sm font-bold text-green-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="font-bold text-xl text-center text-red-500">
          Top Losers
        </h1>
        <div className="flex flex-col justify-between border-x-2 border-gray-600 mb-2">
          {losers.map((loser) => (
            <Link
              key={loser.symbol}
              className="flex flex-row justify-between items-center py-2 border-y-2 border-gray-800 text-slate-300 hover:bg-white hover:text-cyan-500 hover:border-sky-600"
              to={`/stock/${loser.symbol}`}
            >
              <span
                className="ml-2 text-sm font-bold cursor-pointer"
                id={loser.symbol}
              >
                {loser.symbol}
              </span>
              <div className="mr-2 flex flex-row justify-center align-middle items-center">
                <span className="text-sm font-bold">₹ {loser.netPrice}</span>
                <AiOutlineArrowDown className="text-sm font-bold text-red-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStocks;
