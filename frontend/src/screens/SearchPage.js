import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearErrors, getSearchStocks } from "../actions/stocksAction";
import TopStocks from "../components/TopStocks";

const SearchPage = () => {
  const { error, results } = useSelector((state) => state.search);
  const params = useParams();
  const [keyword, setKeywords] = useState(params.key)
  const dispatch = useDispatch();
  const [text, setText] = useState(keyword);
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/search/${text}`);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (text.length > 1) {
      dispatch(getSearchStocks(text));
    }
  }, [dispatch, text, error]);

  useEffect(() => {
    dispatch(getSearchStocks(keyword));
  }, [keyword, dispatch]);
  return (
    <Fragment>
      {results.length > 0 ? (
        <Fragment>
          <div className="lg:min-w-max sm:max-w-screen-xl px-4 py-32 mx-auto justify-center w-screen lg:h-fit items-center flex">
            <div className="bg-gray-800 rounded w-screen sm:w-5/6">
              {/* Search bar */}
              <div className="border-2 relative w-3/4 border-gray-500 m-2 flex flex-row justify-between items-center drop-shadow-lg rounded mx-auto focus-within:border-blue-400">
                <input
                  type="text"
                  className="borer-0 outline-0 p-2 bg-transparent text-white text-lg w-5/6"
                  placeholder="Search stock"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
                <button className="p-2 mx-auto" onClick={handleSubmit}>
                  <AiOutlineSearch className="text-white text-xl" />
                </button>
              </div>
              {/* Search bar ends */}
              <h1 className="text-white p-3 font-bold text-xl">
                Search Result For: {keyword}
              </h1>
              {results ? (
                results.map((result) => (
                  <Link
                    key={result.Symbols}
                    to={`/stock/${result.Symbols}`}
                    className="flex justify-between border-2 border-blue-900 items-center p-2 bg-gray-700 my-2 hover:bg-gray-900 hover:border-red-400"
                  >
                    <span className="text-white text-xs xs:text-sm text-start sm:text-base">
                      {result.Symbols}
                    </span>
                    <span className="text-white text-xs xs:text-sm text-end sm:text-base">
                      {result.Name}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="flex justify-between border-2 border-blue-900 items-center p-2 bg-gray-700 my-2 hover:bg-gray-900 hover:border-red-400">
                  <span className="text-white text-xs xs:text-sm text-start sm:text-base">
                    No Result Found
                  </span>
                </div>
              )}
            </div>
          </div>
          <TopStocks />
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default SearchPage;
