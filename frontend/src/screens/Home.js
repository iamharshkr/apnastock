import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getTopStocks } from "../actions/stocksAction";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import TopStocks from "../components/TopStocks";
import faq from "../assets/images/faq.png";

function Home() {
  const { loading, error, gainers } = useSelector((state) => state.topStocks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    dispatch(getTopStocks());
  }, [error, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Hero />
          {gainers ? (
            <Fragment>
              <TopStocks />
            </Fragment>
          ) : (
            ""
          )}
          <div className="container p-2 my-3 text-white">
            <h2 className="text-2xl font-bold text-center">About Apna Stock</h2>
            <div className="flex lg:flex-row justify-center items-center">
              <div className="w-screen lg:w-3/4 text-justify">
                <p className="font-bold text-lg">What is Apna Stock?</p>
                <p className="text-lg">
                  Apna Stock is a stock analysis platform where you can check
                  the trends of stocks. Apna Stocks also provides some of the
                  best technical analysis tool which help you choose your
                  perfect stock for trading.
                </p>
                <p className="font-bold text-lg mt-4">
                  How Apna Stock help me?
                </p>
                <p className="text-lg">
                  Apna Stock provides some of the best famous technical analysis
                  tools. If you have knowledge about how technical analysis
                  happens, then you can increase your profit.
                </p>
                <p className="font-bold text-lg mt-4">
                  Which stock market Apna Stock Supports?
                </p>
                <p className="text-lg">
                  Right now we only support NSE (National Stock Exchange) India
                  Market. But we are planning to go world wide.
                </p>
                <p className="font-bold text-lg mt-4">
                  Is Apna Stock gives 100% accuracy?
                </p>
                <p className="text-lg">
                  Stock market is a risky platform. So before doing investment
                  kindly research about it. We don't guarantee that our data is
                  100% accurate. We collects data from the yahoo finance api and
                  after doing some techincal analysis we provide it to our user.
                </p>

                <p className="font-bold text-2xl mt-4">Note: </p>
                <p className="text-lg">
                  Nobody ever made high returns in the stock market without
                  taking risk. In fact, the more the risk you take, the more you
                  might earn. But then again, it is 'risk'. The more risk you
                  take, the more you might lose too. So kindly invest at your
                  own risk.
                </p>
              </div>
              <div className="bg-white-400 hidden lg:block ml-10">
                <img src={faq} alt="Faq Icon" height="500px" width="500px" />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
