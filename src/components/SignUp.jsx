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

  const [styles, setStyles] = useState({
    nameBorder: "1px solid transparent",
    emailBorder: "1px solid transparent",
    passwordBorder: "1px solid transparent",
    errorMessage: "",
    isLoading: false,
  });

  const toggle = {
    nameBorder: (value) =>
      setStyles((prev) => {
        return { ...prev, nameBorder: value };
      }),
    emailBorder: (value) =>
      setStyles((prev) => {
        return { ...prev, emailBorder: value };
      }),
    passwordBorder: (value) =>
      setStyles((prev) => {
        return { ...prev, passwordBorder: value };
      }),
    errorMessage: (value) =>
      setStyles((prev) => {
        return { ...prev, errorMessage: value };
      }),
    loading: (value) =>
      setStyles((prev) => {
        return { ...prev, isLoading: value };
      }),
  };

  const createUser = async (e) => {
    e.preventDefault();
    toggle.loading(true);

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
          toggle.loading(false);
        }, 2000);
      },
      (err) => {
        setTimeout(() => {
          toggle.loading(false);
          if (user.name === "" || user.email === "" || user.password === "") {
            user.email === "" && toggle.emailBorder("1px solid red");
            user.password === "" && toggle.passwordBorder("1px solid red");
            user.name === "" && toggle.nameBorder("1px solid red");
            toggle.errorMessage("Field cannot be blank");
          } else if (
            err.message ===
            "A user with the same email already exists in your project."
          ) {
            toggle.errorMessage("A user with the same email already exists.");
          } else {
            toggle.errorMessage(err.message);
          }
        }, 2000);
      }
    );
  };

  useEffect(() => {
    toggle.emailBorder("1px solid transparent");
  }, [user.email]);

  useEffect(() => {
    toggle.nameBorder("1px solid transparent");
  }, [user.name]);

  useEffect(() => {
    toggle.passwordBorder("1px solid transparent");
  }, [user.password]);

  return (
    <main className="m-0 p-0 w-full bg-[hsl(255,100%,99%)] h-screen flex justify-center items-center max-[700px]:items-start max-[700px]:pt-6">
      {styles.isLoading && <Loading />}
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
                border: styles.nameBorder,
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
                border: styles.emailBorder,
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
                border: styles.passwordBorder,
              }}
              className="w-full py-2 px-4 text-sm bg-[rgba(0,0,0,0.1)] outline-none mt-2 rounded-sm"
              required
            />
            {styles.errorMessage !== "" && (
              <p style={{ color: "red" }} className="pt-2 text-xs font-bold">
                {styles.errorMessage}
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
