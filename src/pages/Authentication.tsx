import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { ErrorIcon, GoogleLogo } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
  const { createUser, loginPassword, loginGoogle } = useAuth();

  const [status, setStatus] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function showError(msg, time = 7000) {
    setError(msg);
    setTimeout(() => setError(null), time);
  }

  async function send() {
    try {
      if (status === "login") {
        await loginPassword(email, password);
      } else {
        await createUser(email, password);
      }
    } catch (error) {
      showError(error?.message ?? 'unexpected error');
    }
  }
  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className=" hidden md:block lg:w-2/3 md:w-1/2">
        <img
          className="h-screen w-full object-cover"
          src="https://source.unsplash.com/1600x900/?neon"
          alt="Authentication page random image"
        />
      </div>
      <div className=" m-10 w-full lg:w-1/3 md:w-1/2">
        <h1
          className={`
      text-3xl font-bold mb-5
      `}
        >
          {status === "login" ? "Sign in" : "Register now"}
        </h1>
        {error ? (
          <div
            className={`
        flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg
        `}
          >
            {ErrorIcon(5)}{" "}
            <span className="ml-3">{error}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          mandatory
          valueType="email"
          label="Email"
          value={email}
          valueChanged={setEmail}
        />
        <AuthInput
          mandatory
          valueType="password"
          label="Password"
          value={password}
          valueChanged={setPassword}
        />
        <button
          onClick={send}
          className={`
      w-full bg-indigo-500 hover:bg-indigo-400
      text-white rounded-lg px-4 py-3 mt-6`}
        >
          {status === "login" ? "Sign in" : "Register"}
        </button>
        <hr className="my-6 border-gray-300" />
        <button
          onClick={loginGoogle}
          className={`
       flex justify-center items-center w-full bg-red-500 hover:bg-red-400
      text-white rounded-lg px-4 py-3 mt-6`}
        >
          <span className="mr-2"> {GoogleLogo}</span>Sign in with Google
        </button>
        {status === "login" ? (
          <p className="mt-8">
            New here?
            <a
              onClick={() => setStatus("register")}
              className={`
            text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              {" "}
              Create a free account.
            </a>
          </p>
        ) : (
          <p className="mt-8 ">
            {" "}
            Already have an account?
            <a
              onClick={() => setStatus("login")}
              className={`
               text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              {" "}
              Sign In.
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
