import { Layout } from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginApi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    const csrfReq = await axios.get("/api/auth/csrf");
    if (csrfReq.data.csrfToken) {
      const authReq = await axios.post("/api/auth/callback/credentials", {
        json: true,
        csrfToken: csrfReq.data.csrfToken,
        email,
        password,
      });
      if (authReq.status === 200) {
        const userAuthReq = await axios.get("/api/auth/session");
        if (userAuthReq.data.user) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in the email and password fields");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    const logged = await login(email, password);
    setLoading(false);

    if (logged) {
      window.location.href = "/";
    } else {
      setErrorMessage("Access Denied");
    }
  };

  return (
    <div className="">
      <Layout>
        <div>
          <Head>
            <title>Login API</title>
          </Head>
          <div className="flex flex-col gap-2 pt-3 items-center">
            <h1 className="text-3xl">Login API</h1>
            <input
              className="p-2 w-72 rounded-md text-black"
              type="email"
              placeholder="type your email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={loading}
            />
            <input
              className="p-2 w-72 rounded-md text-black"
              type="password"
              placeholder="type your password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              className="p-1 rounded-md bg-blue-300 my-3 w-72 text-white hover:bg-blue-500 hover:text-black transition ease-in-out delay-100"
              disabled={loading}
            >
              Login
            </button>
            {errorMessage && (
              <p className="font-bold text-red-600">{errorMessage}</p>
            )}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LoginApi;
