import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import Label from "./labels";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();

    const promise = account.create(
      uuidV4(),
      user.email,
      user.password,
      user.name
    );

    promise.then(
      (response) => {
        console.log(response);
        navigate("/dashboard");
      },
      (err) => console.log(err)
    );
  };

  return (
    <main className="m-0 p-0 w-full h-screen flex justify-center items-center max-[700px]:items-start max-[700px]:pt-6">
      <div className="w-[1100px] h-auto flex justify-between max-[700px]:w-[90%] max-[700px]:flex-col max-[700px]:justify-start max-[700px]:items-center max-[700px]:gap-9">
        <img
          src="/images/illustration-working.svg"
          alt=""
          className="w-[60%] max-[700px]:w-[100%]"
        />
        <form
          action="#"
          method="post"
          className="w-[350px] flex flex-col justify-center gap-4 max-[700px]:w-[90%] max-[700px]:pb-10"
        >
          <p
            className="text-[25px] pb-2 font-bold text-[hsl(255,31%,20%)] leading-[1px]"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontFamily: "'Outfit', sans-serif",
              textShadow: "1px 0px 1px hsl(255, 31%, 20%)",
            }}
          >
            SignUp
          </p>
          <div>
            <Label element={"name"} placeHolder={"Full Name"} />
            <br />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, name: e.target.value };
                })
              }
              style={{
                fontFamily: "'EB Garamond', serif",
                fontFamily: "'Outfit', sans-serif",
              }}
              className="w-full py-2 px-4 bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm text-sm"
              required
            />
          </div>
          <div>
            <Label element={"email"} placeHolder={"Email"} />
            <br />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, email: e.target.value };
                })
              }
              style={{
                fontFamily: "'EB Garamond', serif",
                fontFamily: "'Outfit', sans-serif",
              }}
              className="w-full text-sm py-2 px-4 bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
          </div>
          <div>
            <Label element={"password"} placeHolder={"Create a password"} />
            <br />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, password: e.target.value };
                })
              }
              style={{
                fontFamily: "'EB Garamond', serif",
                fontFamily: "'Outfit', sans-serif",
              }}
              className="w-full py-2 px-4 text-sm bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
          </div>
          <div>
            <button
              onClick={createUser}
              style={{
                fontFamily: "'EB Garamond', serif",
                fontFamily: "'Outfit', sans-serif",
              }}
              type="submit"
              className="w-full text-[15px] text-white border-none rounded-sm py-[10px] flex justify-center font-semibold items-center bg-[hsl(180,66%,49%)] duration-500 hover:bg-[hsla(180,66%,49%,0.6)]"
            >
              Sign Up
            </button>
            <p className="pt-1 text-[13px] font-medium">
              Have an account?{" "}
              <Link to={"/login"} className="font-normal underline">
                SignIn
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
