import React, { useState } from "react";

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

let choosedColor = colors[Math.floor(Math.random() * 8)];

export default function ProfileNavbar({
  firstLetter,
  userName,
  clickedSignOut,
}) {
  const [clickedProfile, setClickedProfile] = useState(false);

  return (
    <nav className="w-full flex py-[30px] max-[800px]:pt-[10px] justify-between items-center">
      <div className="">
        <h1 className="logo">Shortly</h1>
      </div>
      <div className="self-center relative">
        {clickedProfile && (
          <div
            style={{
              boxShadow: "0 8px 24px rgba(140, 149, 159, 0.2)",
              minHeight: "112px",
            }}
            className="absolute top-[30px]  pb-1 h-auto w-48 box-border bg-white border border-solid border-[rgba(0,0,0,0.1)] right-[2%] rounded "
          >
            <p className="text-sm pl-5 px-4  pt-3 text-[hsla(247,27%,26%,0.9)] font-normal">
              Signed in as
            </p>
            <p className="text-[13px]  px-4 text-[hsla(257,27%,26%,0.9)] font-medium">
              {userName}
            </p>
            <div className="w-full pt-5">
              <button
                onClick={() => {
                  setClickedProfile(false);
                  clickedSignOut();
                }}
                className="w-full border-none py-2 pl-4 flex  items-center font-semibold text-xs text-[hsla(257,27%,26%,0.9)] hover:bg-[rgba(0,0,0,0.3)]"
              >
                SignOut
              </button>
            </div>
          </div>
        )}
        <div
          className="cursor-pointer flex items-center gap-[2px]"
          onClick={() => setClickedProfile((prev) => !prev)}
        >
          <div
            style={{
              backgroundColor: `${choosedColor}`,
            }}
            className="w-[26px] h-[26px] rounded-[13px] flex justify-center items-center"
          >
            <p className="text-white text-sm font-semibold">{firstLetter}</p>
          </div>
          <i className="fa-solid fa-caret-down text-xs text-[hsla(257,27%,26%,0.7)]"></i>
        </div>
      </div>
    </nav>
  );
}
