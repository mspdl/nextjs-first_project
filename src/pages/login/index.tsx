import { Layout } from "@/components/Layout";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in the email and password fields");
      return;
    }

    setErrorMessage("");
    setLoading(true);
    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (request && request.ok) {
      if (router.query.callbackUrl) {
        router.push(router.query.callbackUrl as string);
      } else {
        router.push("/");
      }
    } else {
      setErrorMessage(`Error: ${request?.error} | status: ${request?.status}`);
    }
  };

  return (
    <div className="">
      <Layout>
        <div>
          <Head>
            <title>Login</title>
          </Head>
          <div className="flex flex-col gap-2 pt-3 items-center">
            <h1 className="text-3xl">Login</h1>
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

export default Login;
