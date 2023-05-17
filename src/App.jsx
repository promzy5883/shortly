import "./App.css";
import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import SetCookie from "./components/cookies";
import NavSection from "./components/navSection";

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
    } else if (linkUrl.indexOf("https://") === -1) {
      setBorder("1px solid hsl(0, 87%, 67%)");
      setOutlet("1px");
      setColor("hsl(0, 87%, 67%)");
      setError("Enter a valid URL");
      return;
    } else {
      setDisplay("block");
      return fetch(`https://api.shrtco.de/v2/shorten?url=${linkUrl}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === true) {
            SetCookie(linkUrl, data.result.short_link, 365);
            setClicked(!clicked);
            console.log(data);
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
    <>
      <main className="App">
        <NavSection />
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
              Track how your links are performing across the web with our
              advanced statistics dashboard
            </p>
          </div>
          <div className="stats_box">
            <div className="boxes1">
              <div className="boxes1-imgBox">
                <img src="/images/icon-brand-recognition.svg" alt="" />
              </div>
              <p className="boxes-text">Brand Recognition</p>
              <p className="boxes-paragraph">
                Boost your brand recognition with each click. Generic links
                don’t mean a thing. Branded links help instil confidence in your
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
          <a href="#shorten" className="get-started">
            Get Started
          </a>
        </section>
      </main>
      <footer>
        <div className="main-footer">
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
              <i className="fa-brands fa-facebook-f facebook_icon"></i>
              <i
                className="fa-brands fa-twitter twitter_icon"
                onClick={() => window.open("https://twitter.com/Promzy_5")}
              ></i>

              <i className="fa-brands fa-pinterest-p pinterest_icon"></i>

              <i className="fa-brands fa-instagram twitter_icon"></i>
            </div>
          </div>
        </div>
        <div class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://promzy.netlify.app">Promise</a>.
        </div>
      </footer>
    </>
  );
}

export default App;
