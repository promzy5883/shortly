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
