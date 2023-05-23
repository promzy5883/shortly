import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import ProfileNavbar from "./ProfileNavbar";
import ShortenLinks from "./links";
import Loading from "./loadingComponent";
import Modal from "./modal";
import { initialState, reducer } from "./hook";

export default function Profile() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "updateIsLoading", isLoadingValue: true });
    const getAccount = account.get();
    getAccount.then(
      (response) => {
        dispatch({ type: "updateUserDetails", userDetailsValue: response });
        dispatch({ type: "updateIsLoading", isLoadingValue: false });
        dispatch({ type: "updateOpacity", opacityValue: 1 });
      },
      (error) => {
        dispatch({ type: "updateIsLoading", isLoadingValue: false });
        console.log(error);
        dispatch({ type: "updateOpacity", opacityValue: 1 });
      }
    );
  }, []);

  const handleLogout = () => {
    dispatch({ type: "updateModal", modalValue: false });
    dispatch({ type: "updateIsLoading", isLoadingValue: true });
    setTimeout(async () => {
      try {
        await account.deleteSession("current");
        navigate("/");
        dispatch({ type: "updateIsLoading", isLoadingValue: false });
      } catch (err) {
        dispatch({ type: "updateIsLoading", isLoadingValue: false });
        console.log(err);
      }
    }, 3000);
  };

  return (
    <main className="">
      {state.isLoading && <Loading />}
      {state.userDetails ? (
        <section className="w-full pb-8 h-screen box-border px-[150px] max-[850px]:px-[20px] max-[1000px]:px-[40px] bg-[hsl(255,100%,99%)] max-[870px]:pl-5">
          {state.modal && (
            <Modal
              cancel={() =>
                dispatch({ type: "updateModal", modalValue: false })
              }
              confirm={handleLogout}
              question={"you want to logout?"}
              type={"logout"}
            />
          )}
          <ProfileNavbar
            firstLetter={state.userDetails.name[0]}
            userName={state.userDetails.name}
            clickedSignOut={() =>
              dispatch({ type: "updateModal", modalValue: true })
            }
          />
          <section className="w-full h-auto">
            <ShortenLinks email={state.userDetails.email} />
          </section>
        </section>
      ) : (
        <section
          style={{ opacity: state.opacity }}
          className="w-full h-screen box-border bg-[hsl(255,100%,99%)] flex justify-center items-center"
        >
          <div className="w-full flex flex-col items-center gap-4">
            <p>Session Expired</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-1 text-sm rounded bg-black border border-solid border-black text-white duration-500 hover:bg-transparent hover:text-black"
            >
              Login
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
