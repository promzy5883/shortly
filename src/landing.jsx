import "./App.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/navSection";
import Button from "./components/button";
export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <main className="App">
        <section className="first-half">
          <NavBar />
          <section className="more">
            <div className="paragraph" id="shorten">
              <p className="more-text">
                More than just <br />
                shorter links
              </p>
              <p className="sub-paragraph">
                Build your brand's recognition and get detailed insight <br />{" "}
                on how your links are performing
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="get-started"
              >
                Get Started
              </button>
            </div>
            <div className="img-box">
              <img src="/images/illustration-working.svg" alt="" />
            </div>
          </section>
        </section>
        <section className="second-half">
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
          <Button children={"Get Started"} />
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
      </footer>
    </>
  );
}
