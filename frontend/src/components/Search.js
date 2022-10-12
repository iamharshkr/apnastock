import React, { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const Search = ({status}) => {
  const [close, setClose] = useState(status ? true : false)
  return (
    <div className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center ease-in duration-300 z-50 ${close ? "invisible opacity-0" : "visible opacity-100"}`}>
      <div className="relative bg-zinc-700 w-4/6 h-4/6">
        <AiOutlineClose className="text-white absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setClose(true)}/>
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="my-2 text-2xl text-sky-600 font-bold">
            Search Your Favourite Stock
          </h2>
          <div className="border-2 border-gray-500 m-2 flex flex-row justify-center items-center drop-shadow-lg">
            <input
              type="text"
              className="borer-0 outline-0 p-2 bg-transparent text-white text-lg"
              placeholder="Search stock"
              required
            />
            <button className="p-2">
            <AiOutlineSearch className="text-white text-xl"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
