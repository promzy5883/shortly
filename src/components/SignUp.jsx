import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import Loading from "./loadingComponent";
import Label from "./labels";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [nameBorder, setNameBorder] = useState("1px solid transparent");
  const [emailBorder, setEmailBorder] = useState("1px solid transparent");
  const [passwordBorder, setPasswordBorder] = useState("1px solid transparent");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const promise = account.create(
      uuidV4(),
      user.email,
      user.password,
      user.name
    );

    promise.then(
      (response) => {
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        }, 2000);
      },
      (err) => {
        setTimeout(() => {
          setIsLoading(false);
          if (user.name === "" || user.email === "" || user.password === "") {
            user.email === "" && setEmailBorder("1px solid red");
            user.password === "" && setPasswordBorder("1px solid red");
            user.name === "" && setNameBorder("1px solid red");
            setErrorMessage("Field cannot be blank");
          } else if (
            err.message ===
            "A user with the same email already exists in your project."
          ) {
            setErrorMessage("A user with the same email already exists.");
          } else {
            setErrorMessage(err.message);
          }
        }, 2000);
      }
    );
  };

  useEffect(() => {
    setEmailBorder("1px solid transparent");
  }, [user.email]);

  useEffect(() => {
    setNameBorder("1px solid transparent");
  }, [user.name]);

  useEffect(() => {
    setPasswordBorder("1px solid transparent");
  }, [user.password]);

  return (
    <main className="m-0 p-0 w-full bg-[hsl(255,100%,99%)] h-screen flex justify-center items-center max-[700px]:items-start max-[700px]:pt-6">
      {isLoading && <Loading />}
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
              placeholder="Promise Onuoha"
              value={user.name}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, name: e.target.value };
                })
              }
              style={{
                border: nameBorder,
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
              placeholder="example@gmail.com"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, email: e.target.value };
                })
              }
              style={{
                border: emailBorder,
              }}
              className="w-full text-sm py-2 px-4 bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
          </div>
          <div>
            <Label element={"password"} placeHolder={"Create a password"} />
            <br />
            <input
              placeholder="******"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, password: e.target.value };
                })
              }
              style={{
                border: passwordBorder,
              }}
              className="w-full py-2 px-4 text-sm bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
            {errorMessage !== "" && (
              <p style={{ color: "red" }} className="pt-2 text-xs font-bold">
                {errorMessage}
              </p>
            )}
          </div>
          <div>
            <button
              onClick={createUser}
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
