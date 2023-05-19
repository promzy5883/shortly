import SetCookie from "./cookies";
import { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function ShortenBox() {
  const [border, setBorder] = useState("none");
  const [outlet, setOutlet] = useState("none");
  const [color, setColor] = useState("hsla(257, 27%, 26%, 0.6)");
  const [linkUrl, setLinkUrl] = useState("");
  const [display, setDisplay] = useState("none");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied === true) {
      alert("Copied!");
      setCopied(false);
    }
  }, [copied]);

  useEffect(() => {
    if (linkUrl !== "") {
      setError("");
      setBorder("none");
      setOutlet("none");
      setColor("hsla(257, 27%, 26%, 0.6)");
    }
  }, [linkUrl]);

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
            setData([document.cookie]);
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
      <div className="second-half-link-box"></div>
    </>
  );
}

{
  /*document.cookie !== "" &&
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
            })*/
}
