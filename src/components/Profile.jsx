import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import ProfileNavbar from "./ProfileNavbar";

export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [isCreated, setIsCreated] = useState(false);

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
            <section className="w-full h-screen box-border px-[150px] bg-[hsl(255,100%,99%)]">
              <ProfileNavbar />
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontFamily: "'Outfit', sans-serif",
                }}
                className="font-semibold text-xl text-[rgba(0,0,0,0.7)]"
              >
                Hello👋 {userDetails.name}
              </p>
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
  <main className="w-full h-screen flex justify-center items-center">
    <img src="/images/spinner.svg" alt="" className="h-[60px]" />
  </main>
);
