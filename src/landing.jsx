import "./App.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/navBar";
import Button from "./components/button";
import Footer from "./components/Footer";
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
      <Footer />
    </>
  );
}
