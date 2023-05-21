import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import Label from "./labels";
import { Link } from "react-router-dom";
import Loading from "./loadingComponent";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [style, setStyle] = useState({
    emailBorder: "1px solid transparent",
    passwordBorder: "1px solid transparent",
    errorMessage: "",
    isLoading: false,
  });

  const togglingLoading = (value) => {
    setStyle((previous) => {
      return { ...previous, isLoading: value };
    });
  };

  const togglingEmailBorder = (value) => {
    setStyle((previous) => {
      return { ...previous, emailBorder: value };
    });
  };

  const togglingPasswordBorder = (value) => {
    setStyle((previous) => {
      return { ...previous, passwordBorder: value };
    });
  };

  const togglingErrorMessage = (value) => {
    setStyle((previous) => {
      return { ...previous, errorMessage: value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    togglingLoading(true);

    try {
      await account.createEmailSession(user.email, user.password);
      setTimeout(() => {
        navigate("/profile");
        togglingLoading(false);
      }, 4000);
    } catch (err) {
      togglingLoading(false);
      console.log(err);

      if (user.email === "" || user.password === "") {
        user.email === "" && togglingEmailBorder("1px solid red");
        user.password === "" && togglingPasswordBorder("1px solid red");
        togglingErrorMessage("Field cannot be blank");
      } else {
        togglingErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    togglingEmailBorder("1px solid transparent");
  }, [user.email]);

  useEffect(() => {
    togglingPasswordBorder("1px solid transparent");
  }, [user.password]);

  return (
    <main className="m-0 p-0 w-full bg-[hsl(255,100%,99%)] h-screen flex justify-center items-center max-[700px]:items-start max-[700px]:pt-6">
      {style.isLoading && <Loading />}
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
            SignIn
          </p>
          <div>
            <Label element={"email"} placeHolder={"Email"} />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, email: e.target.value };
                })
              }
              style={{
                border: style.emailBorder,
              }}
              className="w-full text-sm py-2 px-4 bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
          </div>
          <div>
            <Label element={"password"} placeHolder={"Password"} />
            <br />
            <input
              type="password"
              name="password"
              placeholder="******"
              value={user.password}
              onChange={(e) =>
                setUser((p) => {
                  return { ...p, password: e.target.value };
                })
              }
              style={{
                border: style.passwordBorder,
              }}
              className="w-full py-2 px-4 text-sm bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
            {style.errorMessage !== "" && (
              <p style={{ color: "red" }} className="pt-2 text-xs font-bold">
                {style.errorMessage}
              </p>
            )}
          </div>
          <div>
            <button
              onClick={loginUser}
              type="submit"
              className="w-full text-[15px] text-white border-none rounded-sm py-[10px] flex justify-center font-semibold items-center bg-[hsl(180,66%,49%)] duration-500 hover:bg-[hsla(180,66%,49%,0.6)]"
            >
              Sign In
            </button>
            <p className="pt-1 text-[13px] font-medium">
              New To Shortly?{" "}
              <Link to={"/signup"} className="font-normal underline">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
