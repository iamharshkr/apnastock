import React, { useState } from "react";
import {
  AiFillFacebook,
  AiOutlineBars,
  AiOutlineClose,
  AiOutlineGithub,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${value}`);
  };
  return (
    <nav
      className={
        "top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 absolute"
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={
              "text-white text-2xl leading-relaxed inline-block mr-4 py-2 font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            }
            to="/"
          >
            Apna Stock
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? (
              <AiOutlineClose className="text-white" />
            ) : (
              <AiOutlineBars className="text-white" />
            )}
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex justify-center items-center">
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/disclaimer"
              >
                Disclaimer
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/terms"
              >
                Terms & Conditions
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                to="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex justify-center items-center">
              <a
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://facebook.com/iamharshkr"
              >
                <AiFillFacebook className="text-white text-2xl lg:text-gray-300 text-gray-500" />
                <span className="lg:hidden inline-block ml-2">Follow</span>
              </a>
            </li>

            <li className="flex justify-center items-center">
              <a
                className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://github.com/iamharshkr"
              >
                <AiOutlineGithub className="text-white text-2xl lg:text-gray-300 text-gray-500" />
                <span className="lg:hidden inline-block ml-2">Follow</span>
              </a>
            </li>
            <li className="flex justify-center items-center sm:p-3">
              <form method="get" onSubmit={handleSubmit}>
                <div className="border-2 border-grey-400 rounded flex item-center focus-within:border-blue-400">
                  <input
                    type="text"
                    placeholder="Search stock"
                    className="borer-0 outline-0 px-2 bg-transparent text-black lg:text-white"
                    name="search"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button type="submit" className="p-2 mx-auto">
                    <AiOutlineSearch className="text-black lg:text-white text-lg" />
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
