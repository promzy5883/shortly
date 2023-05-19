import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import ProfileNavbar from "./ProfileNavbar";
import ShortenLinks from "./links";
import Loading from "./loadingComponent";
import Modal from "./modal";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getAccount = account.get();
    getAccount.then(
      (response) => setUserDetails(response),
      (error) => console.log(error)
    );
  }, []);

  const handleLogout = () => {
    setModal(false);
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await account.deleteSession("current");
        navigate("/");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }, 3000);
  };

  return (
    <main>
      {userDetails ? (
        <section className="w-full h-auto box-border pl-[150px] bg-[hsl(255,100%,99%)] max-[870px]:pl-5">
          {isLoading && <Loading />}
          {modal && (
            <Modal
              cancel={() => setModal(false)}
              confirm={handleLogout}
              question={"you want to logout?"}
              type={"logout"}
            />
          )}
          <ProfileNavbar
            firstLetter={userDetails.name[0]}
            userName={userDetails.name}
            clickedSignOut={() => setModal(true)}
          />
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
          <section className="w-full h-auto mt-[180px]">
            <ShortenLinks />
          </section>
        </section>
      ) : (
        <section></section>
      )}
    </main>
  );
}
