import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { v4 as uuidV4 } from "uuid";
import CopyToClipboard from "react-copy-to-clipboard";
import Loading from "./loadingComponent";

export default function ShortenLinks({ email }) {
  const [border, setBorder] = useState("none");
  const [outlet, setOutlet] = useState("none");
  const [color, setColor] = useState("hsla(257, 27%, 26%, 0.6)");
  const [linkUrl, setLinkUrl] = useState("");
  const [display, setDisplay] = useState("none");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");
  const [links, setLinks] = useState();
  const [loading, setLoading] = useState(false);

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

  const deleteDocument = (id) => {
    const promise = databases.deleteDocument(
      "6464bfecd9609282e188",
      "64691f765377caeffacb",
      id
    );
    promise.then(
      (response) => {
        updateLinks();
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const updateLinks = () => {
    setLoading(true);
    const promise = databases.listDocuments(
      "6464bfecd9609282e188",
      "64691f765377caeffacb"
    );
    promise.then(
      (response) => {
        setLinks(
          response.documents.filter((v) => {
            return v.link[0] === email;
          })
        );
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        console.log(err);
      }
    );
  };

  useEffect(() => {
    if (shortenedLink !== "") {
      const promise = databases.createDocument(
        "6464bfecd9609282e188",
        "64691f765377caeffacb",
        uuidV4(),
        { link: [email, shortenedLink, linkUrl] }
      );
      promise.then(
        (response) => {
          setShortenedLink("");
          setLinkUrl("");
          updateLinks();
        },
        (err) => {
          console.log(err);
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

  useEffect(() => {
    updateLinks();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="h-[150px] rounded flex items-center justify-between bg-primaryDesktopOne w-full bg-cover bg-[hsl(257,27%,26%)] px-6 max-[800px]:flex-col max-[800px]:px-4 max-[800px]:py-4 max-[800px]:justify-center max-[800px]:gap-5">
        <div className="w-[77%] flex flex-col gap-1 max-[800px]:w-full">
          <input
            style={{
              border: `${border}`,
              outline: `${outlet}`,
              color: `${color}`,
            }}
            placeholder="Shorten a link here..."
            type="text"
            className="w-full py-[12px] px-4 rounded text-sm"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <p className="absolute italic text-[hsl(0,87%,67%)] translate-y-12 max-[800px]:translate-y-11">
            {error}
          </p>
        </div>
        <button
          className="w-[21%] flex max-[800px]:w-full items-center justify-center gap-2 px-8 py-[12px] bg-[hsl(180,66%,49%)] rounded text-white text-[15px] font-semibold"
          onClick={handleSubmit}
        >
          Shorten It!
          <img
            className="w-5"
            src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator_selective.gif"
            alt=""
            style={{ display: `${display}` }}
          />
        </button>
      </div>
      <section className="w-full pt-7">
        <div
          id="viewLinks"
          className="w-full h-[250px] box-border overflow-y-scroll flex flex-col-reverse gap-4"
        >
          {links &&
            links.map((item) => (
              <div
                key={item.$id}
                className="w-full flex h-[50px] justify-between items-center"
              >
                <div className="w-[88%] flex max-[700px]:flex-col max-[700px]:gap-[6px]">
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    className=" text-sm text-[hsla(257,27%,26%,0.9)]  text-semibold pr-3 max-[700px]:pr-0 max-[700px]:border-none border-r border-solid border-[rgba(0,0,0,0.2)]"
                  >
                    {item.link[2]}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      className=" text-sm text-[hsla(257,27%,26%,0.9)] text-semibold pl-3 max-[700px]:pl-0"
                    >
                      https://{item.link[1]}
                    </p>
                    <CopyToClipboard
                      text={`https://${item.link[1]}`}
                      onCopy={() => {
                        const element = document.getElementById(item.$id);
                        element.classList.replace("fa-copy", "fa-check");

                        setTimeout(() => {
                          element.classList.replace("fa-check", "fa-copy");
                        }, 700);
                      }}
                    >
                      <i
                        id={`${item.$id}`}
                        className="fa-solid fa-copy cursor-pointer text-[13px] text-[hsla(257,27%,26%,0.8)]"
                      ></i>
                    </CopyToClipboard>
                  </div>
                </div>
                <i
                  className="fa-solid fa-trash text-[13px] cursor-pointer text-[hsla(257,27%,26%,0.8)]"
                  onClick={() => deleteDocument(item.$id)}
                ></i>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
