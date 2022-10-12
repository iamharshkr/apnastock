import React from "react";
import { AiFillBell } from "react-icons/ai";

const Alert = ({ msg, status }) => {
  const removeElement = () => {
    document.getElementById("alert").remove()
  }
  return (
    <div id="alert"
      className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${
        status === "success" ? "bg-green-500" : "bg-rose-500"
      }`}
    >
      <span className="text-xl inline-block mr-5 align-middle">
      <AiFillBell />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">{msg}</b>
      </span>
      <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => removeElement()}>
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;
