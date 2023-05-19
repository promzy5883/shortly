import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNavbar({ firstLetter }) {
  return (
    <nav className="w-full flex pr-[150px] py-[30px] justify-between items-center max-[870px]:pr-5">
      <div className="">
        <h1 className="logo">Shortly</h1>
      </div>
      <div className="self-center cursor-pointer flex items-center gap-[2px]">
        <div
          style={{
            backgroundColor: `${colors[Math.floor(Math.random() * 8)]}`,
          }}
          className="w-[26px] h-[26px] rounded-[13px] flex justify-center items-center"
        >
          <p className="text-white text-sm font-semibold">{firstLetter}</p>
        </div>
        <i className="fa-solid fa-caret-down text-xs text-[hsla(257,27%,26%,0.7)]"></i>
      </div>
    </nav>
  );
}

const colors = [
  "#98343a",
  "blue",
  "purple",
  "black",
  "#851921",
  "#69b024",
  "#177d6a",
  "#9b2397",
];
