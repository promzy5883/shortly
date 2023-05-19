import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { v4 as uuidV4 } from "uuid";

export default function ShortenLinks() {
  const [border, setBorder] = useState("none");
  const [outlet, setOutlet] = useState("none");
  const [color, setColor] = useState("hsla(257, 27%, 26%, 0.6)");
  const [linkUrl, setLinkUrl] = useState("");
  const [display, setDisplay] = useState("none");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (linkUrl === "" || linkUrl.indexOf("https://") === -1) {
      setBorder("1px solid hsl(0, 87%, 67%)");
      setOutlet("1px");
      setColor("hsl(0, 87%, 67%)");
      linkUrl === "" && setError("Please add a link");
      linkUrl.indexOf("https://") === -1 && setError("Enter a valid URL");
      return;
    } else {
      setDisplay("block");
      return fetch(`https://api.shrtco.de/v2/shorten?url=${linkUrl}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === true && data.result.short_link2.length > 0) {
            setShortenedLink(data.result.short_link2);
          }
        })
        .finally(() => {
          setDisplay("none");
        });
    }
  };

  useEffect(() => {
    if (shortenedLink !== "") {
      const promise = databases.createDocument(
        "6464bfecd9609282e188",
        "64676a8e6f660788c078",
        uuidV4(),
        { link: [`https://${shortenedLink}`, linkUrl] }
      );
      promise.then(
        (response) => {
          setShortenedLink("");
          setLinkUrl("");
        },
        (err) => {
          setShortenedLink("");
          setLinkUrl("");
        }
      );
    }
  }, [shortenedLink]);

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

  return (
    <>
      <div className="shorten">
        <div className="flex flex-col w-[75%]">
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
          <p
            className="error"
            style={{
              color: "hsl(0, 87%, 67%)",
              fontStyle: "italic",
            }}
          >
            {error}
          </p>
        </div>
        <button className="submit" onClick={handleSubmit}>
          Shorten It!
          <img
            className="spinner"
            src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_selective.gif"
            alt=""
            style={{ display: `${display}` }}
          />
        </button>
      </div>
      <div className="second-half-link-box"></div>
    </>
  );
}
