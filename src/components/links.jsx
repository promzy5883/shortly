import React, { useEffect, useReducer } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { v4 as uuidV4 } from "uuid";
import CopyToClipboard from "react-copy-to-clipboard";
import Loading from "./loadingComponent";
import { initialState, reducer } from "./hook";

export default function ShortenLinks({ email }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleError = (message) => {
    dispatch({
      type: "updateBorder",
      borderValue: "1px solid hsl(0, 87%, 67%)",
    });
    dispatch({ type: "updateOutlet", outletValue: "1px" });
    dispatch({ type: "updateColor", colorValue: "hsl(0, 87%, 67%)" });
    dispatch({ type: "updateError", errorValue: message });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      state.linkUrl === "" ||
      (state.linkUrl.trim().indexOf("https://") === 0 &&
        state.linkUrl.length <= 8)
    ) {
      handleError("Add a link");
      return;
    } else if (state.linkUrl.trim().indexOf("https://") !== 0) {
      handleError("Enter a valid URL");
      return;
    } else {
      dispatch({ type: "updateDisplay", displayValue: "block" });
      return fetch(`https://api.shrtco.de/v2/shorten?url=${state.linkUrl}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === true && data.result.short_link2.length > 0) {
            dispatch({
              type: "updateShortenedLink",
              shortenedLinkValue: data.result.short_link2,
            });
          }
        })
        .finally(() => {
          dispatch({ type: "updateDisplay", displayValue: "none" });
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
    dispatch({ type: "updateLoading", loadingValue: true });
    const promise = databases.listDocuments(
      "6464bfecd9609282e188",
      "64691f765377caeffacb"
    );
    promise.then(
      (response) => {
        dispatch({
          type: "updateLinks",
          linksValue: response.documents
            .filter((v) => {
              return v.link[0] === email;
            })
            .reverse(),
        });
        dispatch({ type: "updateLoading", loadingValue: false });
      },
      (err) => {
        dispatch({ type: "updateLoading", loadingValue: false });
        console.log(err);
      }
    );
  };

  useEffect(() => {
    if (state.shortenedLink !== "") {
      const promise = databases.createDocument(
        "6464bfecd9609282e188",
        "64691f765377caeffacb",
        uuidV4(),
        { link: [email, state.shortenedLink, state.linkUrl] }
      );
      promise.then(
        (response) => {
          dispatch({
            type: "updateShortenedLink",
            shortenedLinkValue: "",
          });
          dispatch({
            type: "updateLinkUrl",
            linkUrlValue: "",
          });
          updateLinks();
        },
        (err) => {
          console.log(err);
          dispatch({
            type: "updateShortenedLink",
            shortenedLinkValue: "",
          });
          dispatch({
            type: "updateLinkUrl",
            linkUrlValue: "",
          });
        }
      );
    }
  }, [state.shortenedLink]);

  useEffect(() => {
    if (state.linkUrl !== "") {
      dispatch({
        type: "updateBorder",
        borderValue: "none",
      });
      dispatch({ type: "updateOutlet", outletValue: "none" });
      dispatch({
        type: "updateColor",
        colorValue: "hsla(257, 27%, 26%, 0.6)",
      });
      dispatch({ type: "updateError", errorValue: "" });
    }
  }, [state.linkUrl]);

  useEffect(() => {
    updateLinks();
  }, []);

  return (
    <>
      {state.loading && <Loading />}
      <div className="h-[150px] rounded flex items-center justify-between bg-primaryDesktopOne w-full bg-cover bg-[hsl(257,27%,26%)] px-6 max-[800px]:flex-col max-[800px]:px-4 max-[800px]:py-4 max-[800px]:justify-center max-[800px]:gap-5">
        <div className="w-[77%] flex flex-col gap-1 max-[800px]:w-full">
          <input
            style={{
              border: `${state.border}`,
              outline: `${state.outlet}`,
              color: `${state.color}`,
            }}
            placeholder="Shorten a link here..."
            type="text"
            className="w-full py-[12px] px-4 rounded text-sm"
            value={state.linkUrl}
            onChange={(e) =>
              dispatch({ type: "updateLinkUrl", linkUrlValue: e.target.value })
            }
          />
          <p className="absolute italic text-[hsl(0,87%,67%)] translate-y-12 max-[800px]:translate-y-11">
            {state.error}
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
            style={{ display: `${state.display}` }}
          />
        </button>
      </div>
      <section className="w-full pt-7">
        {state.links && state.links.length > 0 && (
          <div className="bg-[hsl(257,27%,26%)] p-4  rounded w-full">
            <div
              id="viewLinks"
              className="w-full h-auto max-h-[140px] max-[700px]:max-h-[170px]  box-border flex gap-4 flex-col  overflow-y-scroll"
            >
              {state.links.map((item) => (
                <div
                  key={item.$id}
                  className="w-full flex h-[35px]  max-[800px]:h-[50px]  justify-between items-center"
                >
                  <div className="w-[88%]  flex max-[700px]:flex-col max-[700px]:gap-[6px]">
                    <p className=" text-sm text-[hsl(255,100%,99%)]  text-semibold pr-3 max-[700px]:pr-0 max-[700px]:border-none border-r border-solid border-[hsl(255,100%,99%)]">
                      {item.link[2]}
                    </p>
                    <div className="flex gap-2 items-center">
                      <p className=" text-sm text-[hsl(255,100%,99%)] text-semibold pl-3 max-[700px]:pl-0">
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
                          className="fa-solid fa-copy cursor-pointer text-[13px] text-[hsl(255,100%,99%)]"
                        ></i>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <i
                    className="fa-solid fa-trash text-[13px] cursor-pointer text-[hsl(255,100%,99%)]"
                    onClick={() => deleteDocument(item.$id)}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
