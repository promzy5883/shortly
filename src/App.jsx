import "./App.css";
import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function SetCookie(name, value, expiryDate) {
  var d = new Date();
  d.setTime(d.getTime() + expiryDate * 24 * 60 * 60 * 1000);
  var expires = "expires" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function DeleteCookie(name) {
  document.cookie = `${name}=; expires=Wed, 15 Mar 2023 14:20:03 GMT; path=/`;
}

function App() {
  const [linkUrl, setLinkUrl] = useState("");
  const [error, setError] = useState("");
  const [border, setBorder] = useState("none");
  const [outlet, setOutlet] = useState("none");
  const [color, setColor] = useState("hsla(257, 27%, 26%, 0.6)");
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [display, setDisplay] = useState("none");
  const [linkDisplay, setLinkDisplay] = useState("none");

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 500) {
      return setLinkDisplay("none");
    } else if (window.innerWidth > 500) {
      return setLinkDisplay("flex");
    }
  });
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setLinkDisplay("none");
    } else {
      setLinkDisplay("flex");
    }
  }, []);
  useEffect(() => {
    if (linkUrl !== "") {
      setError("");
      setBorder("none");
      setOutlet("none");
      setColor("hsla(257, 27%, 26%, 0.6)");
    }
  }, [linkUrl]);
  useEffect(() => {
    setData(() => [document.cookie]);
  }, [clicked]);

  useEffect(() => {
    if (copied === true) {
      alert("Copied!");
      setCopied(false);
    }
  }, [copied]);

  function check() {
    if (linkUrl === "") {
      setError("Please add a link");
      setBorder("1px solid hsl(0, 87%, 67%)");
      setOutlet("1px");
      setColor("hsl(0, 87%, 67%)");
      return;
    } else {
      setDisplay("block");
      return fetch(`https://api.shrtco.de/v2/shorten?url=${linkUrl}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === true) {
            SetCookie(linkUrl, data.result.short_link, 365);
            setClicked(!clicked);
          }
        })
        .finally(() => {
          setDisplay("none");
          if (
            document.cookie
              .split("; ")
              [document.cookie.split("; ").length - 1].split("=")[0] !== linkUrl
          ) {
            setError("Invalid Url");
          }
        });
    }
  }

  return (
    <div className="App">
      <section className="first-half">
        <nav className="nav">
          <div className="links">
            <p className="logo">Shortly</p>
            <ul
              className="nav-ul"
              style={{
                display: `${linkDisplay}`,
              }}
            >
              <div className="nav-ul-links">
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
                <li className="division">
                  <a href="#">Resources</a>
                </li>
              </div>

              <div className="security">
                <a href="#">Login</a>
                <a href="#">Sign Up</a>
              </div>
            </ul>
          </div>

          <button
            className="menu-button"
            onClick={() => {
              if (linkDisplay === "none") {
                setLinkDisplay("flex");
              } else {
                setLinkDisplay("none");
              }
            }}
          >
            <i className="fa-solid fa-bars menu"></i>
          </button>
        </nav>
        <section className="more">
          <div className="paragraph">
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

      <section className="second-half">
        <div className="shorten">
          <input
            style={{
              border: `${border}`,
              outline: `${outlet}`,
              color: `${color}`,
            }}
            placeholder="Shorten a link here..."
            type="text"
            className="shorten-input"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <button className="submit" onClick={check}>
            Shorten It!
            <img
              className="spinner"
              src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_selective.gif"
              alt=""
              style={{ display: `${display}` }}
            />
          </button>
          <p
            className="error"
            style={{
              position: "absolute",
              top: "105px",
              color: "hsl(0, 87%, 67%)",
              fontStyle: "italic",
            }}
          >
            {error}
          </p>
        </div>
        <div className="second-half-link-box">
          {document.cookie !== "" &&
            decodeURIComponent(data[0])
              .split("; ")
              .reverse()
              .map((v) => {
                return (
                  <div
                    key={decodeURIComponent(data[0]).split("; ").indexOf(v)}
                    className="your-links"
                  >
                    <p className="original-link">{v.split("=")[0]}</p>
                    <div className="copy-link">
                      <a
                        className="short-link"
                        href={`https://${v.split("=")[1]}`}
                        target="_blank"
                      >
                        {`https://${v.split("=")[1]}`}
                      </a>
                      <CopyToClipboard
                        text={`https://${v.split("=")[1]}`}
                        onCopy={() => setCopied(true)}
                      >
                        <button className="copy-btn">Copy</button>
                      </CopyToClipboard>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="advanced_stats">
          <p className="stats_heading">Advanced Statistics</p>
          <p className="stats-paragraph">
            Track how your links are performing across the web with our advanced
            statistics dashboard
          </p>
        </div>
        <div className="stats_box">
          <div className="boxes1">
            <div className="boxes1-imgBox">
              <img src="/images/icon-brand-recognition.svg" alt="" />
            </div>
            <p className="boxes-text">Brand Recognition</p>
            <p className="boxes-paragraph">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>
          <div className="boxes2">
            <div className="boxes2-imgBox">
              <img src="/images/icon-detailed-records.svg" alt="" />
            </div>
            <p className="boxes-text">Detailed Records</p>
            <p className="boxes-paragraph">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
          <div className="boxes3">
            <div className="boxes3-imgBox">
              <img src="/images/icon-fully-customizable.svg" alt="" />
            </div>
            <p className="boxes-text">Fully Customizable</p>
            <p className="boxes-paragraph">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
          <div className="line"></div>
        </div>
      </section>
      <section className="third-section">
        <p className="boost">Boost your links today</p>
        <button className="get-started">Get Started</button>
      </section>
      <footer>
        <div className="footer-logo">
          <p className="footer-logo-text">Shortly</p>
        </div>
        <div className="footer-links">
          <div className="features">
            <p>Features</p>
            <ul>
              <li>
                <a href="#">Link Shortening</a>
              </li>
              <li>
                <a href="#">Branded Links</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
            </ul>
          </div>
          <div className="resources">
            <p>Resources</p>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
          <div className="company">
            <p>Company</p>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook-f facebook_icon"></i>
            </a>
            <a href="https://twitter.com/Promzy_5" target="blank">
              <i className="fa-brands fa-twitter twitter_icon"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-pinterest-p pinterest_icon"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram twitter_icon"></i>
            </a>
          </div>
        </div>
      </footer>
      <div class="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://promzy.netlify.app">Promise</a>.
      </div>
    </div>
  );
}

export default App;
