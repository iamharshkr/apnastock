import React, { useState, Fragment, useEffect, useRef } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSearchStocks } from "../actions/stocksAction";

const Hero = () => {
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search);
  const [openSearch, seOpenSearch] = useState(false);
  const [text, setText] = useState("");
  let navigate = useNavigate();

  const wrapperRef = useRef();

  const handleSearch = () => {
    navigate(`/search/${text}`);
  };

  useEffect(() => {
    if (text.length > 1) {
      dispatch(getSearchStocks(text));
    }
    if(!openSearch) setText("");
  }, [dispatch, text, openSearch]);
  return (
    <Fragment>
      <section className="relative text-white bg-gray-900">
        {/* search bar starts here */}
        <div
          ref={wrapperRef}
          className={`antialiased  overflow-x-hidden overflow-y-auto absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center ease-in duration-200 z-50 h-modal md:h-full ${
            openSearch
              ? "visible opacity-100 scale-100"
              : "invisible opacity-0 scale-0"
          }`}
        >
          <div className="relative bg-gray-800 lg:w-4/6 lg:h-4/6 w-full h-full">
            <AiOutlineClose
              className="text-white absolute top-2 right-2 text-xl cursor-pointer"
              onClick={() => seOpenSearch(false)}
            />
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="my-2 text-base sm:text-2xl text-sky-600 font-bold">
                Search Your Favourite Stock
              </h2>
              <div className="border-2 relative w-3/4 border-gray-500 m-2 flex flex-row justify-between items-center drop-shadow-lg rounded focus-within:border-blue-400">
                <input
                  type="text"
                  className="borer-0 outline-0 p-2 bg-transparent text-white text-lg w-5/6"
                  placeholder="Search stock"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                <button className="p-2" onClick={handleSearch}>
                  <AiOutlineSearch className="text-white text-xl" />
                </button>
                <div
                  className={`absolute top-10 left-0 right-0 bg-gray-700 ease-in duration-200 translate-y-0 overflow-auto drop-shadow-md ${
                    results && text.length > 1
                      ? "visible opacity-100 translate-y-1"
                      : "invisible opacity-0"
                  }`}
                  style={{ maxHeight: "40vh" }}
                >
                  <div className="flex flex-col">
                    {results &&
                      results.map((result) => (
                        <Link
                          className="cursor-pointer p-2 bg-gray-800 hover:bg-gray-900"
                          id={result.Symbols}
                          key={result.Symbols}
                          to={`/stock/${result.Symbols}`}
                        >
                          {result.Name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* search bar ends here */}
        <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
              Analyze Your Stock
              <span className="sm:block"> Increase Your Profit</span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
              We are here to help you choosing a perfect stock which gives you
              more profit.
            </p>
            <div className="flex flex-col justify-center gap-4 mt-8">
              <p
                className="block w-full px-12 py-3 text-lg font-bold text-white border border-blue-600 rounded sm:w-auto hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring cursor-pointer ease-in-out duration-200"
                onClick={() => seOpenSearch(true)}
              >
                Search Stock
              </p>
              <a
                className="my-3 px-2 py-3 text-lg font-bold text-white border border-pink-600 rounded-full sm:w-auto hover:bg-pink-600 active:bg-pink-500 focus:outline-none focus:ring cursor-pointer animate-bounce flex flex-row justify-center items-center ease-in-out duration-200"
                href="#top"
              >
                <p>Scroll To See Top Stocks</p>
                <AiOutlineArrowDown className="text-xl ml-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hero;
