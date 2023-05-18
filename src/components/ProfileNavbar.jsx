import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNavbar() {
  return (
    <nav className="w-full flex py-[30px] justify-between items-center">
      <div className="links">
        <h1 className="logo">Shortly</h1>
        <div className="nav-ul">
          <ul className="nav-ul-links">
            <li>
              <Link>Link Shortening</Link>
            </li>
          </ul>

          <div className="self-center flex items-center gap-[2px] cursor-pointer">
            <i class="fa-regular fa-circle-user text-lg text-[hsla(257,27%,26%,0.7)]"></i>
            <i className="fa-solid fa-caret-down text-[hsla(257,27%,26%,0.7)] text-xs"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}
