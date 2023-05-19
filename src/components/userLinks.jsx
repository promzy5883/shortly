import React, { useState, useEffect } from "react";
import { databases } from "../appwrite/appwriteConfig";
import CopyToClipboard from "react-copy-to-clipboard";

export default function UserLinks() {
  const [links, setLinks] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const promise = databases.listDocuments(
      "6464bfecd9609282e188",
      "64676a8e6f660788c078"
    );
    promise.then(
      (response) => {
        setLinks(response.documents);
        console.log(links);
        setLoading(false);
      },
      (err) => setLoading(false)
    );
  }, []);

  return (
    <main>
      {loading && <p>Loading...</p>}
      {links && links.map((item) => <li key={item.$id}>{item.link[0]}</li>)}
    </main>
  );
}
{
  /*.map((v) => {
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
