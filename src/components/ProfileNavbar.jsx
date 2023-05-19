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
  clickedLinks,
}) {
  const [clickedProfile, setClickedProfile] = useState(false);

  return (
    <nav className="w-full flex pr-[150px] py-[30px] justify-between items-center max-[870px]:pr-5">
      <div className="">
        <h1 className="logo">Shortly</h1>
      </div>
      <div className="self-center relative">
        {clickedProfile && (
          <div
            style={{
              boxShadow: "0 8px 24px rgba(140, 149, 159, 0.2)",
              minHeight: "140px",
            }}
            className="absolute top-[30px] h-auto w-36 box-border bg-white border border-solid border-[rgba(0,0,0,0.1)] right-[2%] rounded "
          >
            <p className="text-sm px-3 text-center pt-3 text-[hsla(257,27%,26%,0.9)] font-normal">
              Signed in as
            </p>
            <p className="text-[13px] text-center px-3 text-[hsla(257,27%,26%,0.9)] font-medium">
              {userName}
            </p>
            <div className="w-full pt-5 flex flex-col">
              <button
                onClick={() => {
                  setClickedProfile(false);
                  clickedLinks();
                }}
                className="w-full border-none py-2  justify-center flex items-center font-semibold text-xs text-[hsla(257,27%,26%,0.9)] hover:bg-[rgba(0,0,0,0.3)]"
              >
                Your Links
              </button>
              <button
                onClick={() => {
                  setClickedProfile(false);
                  clickedSignOut();
                }}
                className="w-full border-none py-2  flex justify-center items-center font-semibold text-xs text-[hsla(257,27%,26%,0.9)] hover:bg-[rgba(0,0,0,0.3)]"
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
