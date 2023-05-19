import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import ProfileNavbar from "./ProfileNavbar";

export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [isCreated, setIsCreated] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getAccount = account.get();
    getAccount.then(
      (response) => setUserDetails(response),
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsCreated(true);
    }, 5000);
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      {isCreated ? (
        <main>
          {userDetails ? (
            <section className="w-full h-screen box-border pl-[150px] bg-[hsl(255,100%,99%)] max-[870px]:pl-5">
              <div
                style={{ display: `${modal === true ? "flex" : "none"}` }}
                className="absolute w-full h-screen bg-[rgba(0,0,0,0.1)] left-0 justify-center items-center"
              >
                <div className="bg-[hsl(255,100%,99%)] w-60 h-36 rounded box-border py-4 px-4 flex flex-col justify-between">
                  <p className="text-[15px] font-semibold text-[rgba(0,0,0,0.7)]">
                    Are you sure <br /> you want to logout?
                  </p>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={() => setModal(false)}
                      className="w-[45%] bg-[rgba(0,0,0,0.2)] flex justify-center items-center rounded h-8 text-xs hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-[45%] bg-red-500 text-white flex justify-center items-center rounded h-8 text-xs hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <ProfileNavbar firstLetter={userDetails.name[0]} />
              <section
                style={{ gridTemplateColumns: "43% 57%" }}
                className="grid justify-between w-full pb-[30px] max-[870px]:pb-4 max-[870px]:flex-col-reverse max-[870px]:flex"
              >
                <div className="pt-[70px] max-[870px]:pt-4 max-[870px]:translate-y-16">
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    className="pb-[2px] leading-[-1px] font-bold text-[50px] text-[hsl(260,8%,14%)]"
                  >
                    URL <br />
                    Shortening
                  </p>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    className="text-base text-[hsla(257,27%,26%,0.6)] duration-500 font-medium leading-[25px] pb-5"
                  >
                    Shorten the length of your long URL.
                    <br /> And view all shortened links
                  </p>
                </div>
                <div className="h-[300px] max-[870px]:h-[150px] max-[870px]:w-[92%] ">
                  <img
                    src="/images/illustration-working.svg"
                    alt=""
                    className="w-full"
                  />
                </div>
              </section>
            </section>
          ) : (
            <section></section>
          )}
        </main>
      ) : (
        spinner
      )}
    </main>
  );
}

const spinner = (
  <main className="w-full h-screen flex justify-center items-center bg-[hsl(255,100%,99%)]">
    <img src="/images/spinner.svg" alt="" className="h-[60px]" />
  </main>
);
