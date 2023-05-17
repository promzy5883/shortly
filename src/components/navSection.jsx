import { useState, useEffect } from "react";

export default function NavSection() {
  let [menuButtonFirstTransform, setmenuButtonFirstTransform] = useState(
    "rotate(0deg) translateY(0px)"
  );
  let [menuButtonSecondTransform, setmenuButtonSecondTransform] = useState(
    "rotate(0deg) translateY(0px)"
  );
  let [menuButtonThirdOpacity, setmenuButtonThirdOpacity] = useState(1);
  let [navLinksPosition, setNavLinksPosition] = useState("-1000px");

  return (
    <section className="first-half">
      <nav className="nav">
        <div className="links">
          <h1 className="logo">Shortly</h1>
          <div className="nav-ul" style={{ top: `${navLinksPosition}` }}>
            <ul className="nav-ul-links">
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li className="division">
                <a href="#">Resources</a>
              </li>
            </ul>

            <div className="security">
              <a href="#">Login</a>
              <a href="#">Sign Up</a>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (menuButtonThirdOpacity === 1) {
              setmenuButtonThirdOpacity(0);
              setmenuButtonFirstTransform("rotate(-45deg) translateY(8px)");
              setmenuButtonSecondTransform("rotate(45deg) translateY(-8px)");
              setNavLinksPosition("65px");
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
      <section className="more">
        <div className="paragraph" id="shorten">
          <p className="more-text">
            More than just <br />
            shorter links
          </p>
          <p className="sub-paragraph">
            Build your brand's recognition and get detailed insight <br /> on
            how your links are performing
          </p>
          <button className="get-started" id="get-started">
            Get Started
          </button>
        </div>
        <div className="img-box">
          <img src="/images/illustration-working.svg" alt="" />
        </div>
      </section>
    </section>
  );
}
