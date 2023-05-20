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
    setIsLoading(true);
    const getAccount = account.get();
    getAccount.then(
      (response) => {
        setUserDetails(response);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
      }
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
    <main className="">
      {isLoading && <Loading />}
      {userDetails ? (
        <section className="w-full pb-8 h-screen box-border px-[150px] max-[850px]:px-[20px] max-[1000px]:px-[40px] bg-[hsl(255,100%,99%)] max-[870px]:pl-5">
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
          <section className="w-full h-auto">
            <ShortenLinks email={userDetails.email} />
          </section>
        </section>
      ) : (
        <section></section>
      )}
    </main>
  );
}
