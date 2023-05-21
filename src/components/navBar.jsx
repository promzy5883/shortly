import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuButtonFirstTransform, setmenuButtonFirstTransform] = useState(
    "rotate(0deg) translateY(0px)"
  );
  const [menuButtonSecondTransform, setmenuButtonSecondTransform] = useState(
    "rotate(0deg) translateY(0px)"
  );
  const [menuButtonThirdOpacity, setmenuButtonThirdOpacity] = useState(1);
  const [navLinksPosition, setNavLinksPosition] = useState("-1000px");

  return (
    <nav className="nav w-[calc(100%-150px)] h-[80px] items-center flex justify-between max-[1100px]:w-[calc(100%-80px)] max-[996px]:w-[calc(100%-40px)] max-[870px]:w-full max-[870px]:px-5">
      <div className="w-full grid grid-cols-logoSection items-center">
        <h1
          style={{ textShadow: "1px 0px 1px hsl(255, 31%, 20%)" }}
          className="text-[30px] font-bold text-[hsl(255,31%,20%)] leading-[1px] cursor-pointer max-[700px]:text-[25px]"
        >
          Shortly
        </h1>
        <div className="nav-ul" style={{ top: `${navLinksPosition}` }}>
          <ul className="nav-ul-links">
            <li>
              <Link>Features</Link>
            </li>
            <li>
              <Link>Pricing</Link>
            </li>
            <li className="division">
              <Link>Resources</Link>
            </li>
          </ul>

          <div className="security">
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          if (menuButtonThirdOpacity === 1) {
            setmenuButtonThirdOpacity(0);
            setmenuButtonFirstTransform("rotate(-45deg) translateY(8px)");
            setmenuButtonSecondTransform("rotate(45deg) translateY(-8px)");
            setNavLinksPosition("80px");
          } else {
            setmenuButtonThirdOpacity(1);
            setmenuButtonFirstTransform("rotate(0deg) translateY(0px)");
            setmenuButtonSecondTransform("rotate(0deg) translateY(0px)");
            setNavLinksPosition("-1000px");
          }
        }}
        className="w-[24px] h-[15px] self-center flex-col justify-between cursor-pointer hidden max-[700px]:flex"
      >
        <span
          style={{ transform: `${menuButtonFirstTransform}` }}
          className="w-[100%] duration-500 h-[3px] bg-[rgba(0,0,0,0.6)] rounded-[120px]"
        ></span>
        <span
          style={{ opacity: `${menuButtonThirdOpacity}` }}
          className="w-[100%] duration-500 h-[3px] bg-[rgba(0,0,0,0.6)] rounded-[120px]"
        ></span>
        <span
          style={{ transform: `${menuButtonSecondTransform}` }}
          className="w-[100%] duration-500 h-[3px] bg-[rgba(0,0,0,0.6)] rounded-[120px]"
        ></span>
      </div>
    </nav>
  );
}
