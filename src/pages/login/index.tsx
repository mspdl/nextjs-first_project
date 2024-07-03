import { Layout } from "@/components/Layout";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="">
      <Layout>
        <div>
          <Head>
            <title>Login</title>
          </Head>
          <h1 className="text-3xl">Login</h1>
          <div className="flex flex-col gap-2 w-72 pt-3">
            <input
              className="p-2 rounded-md text-black"
              type="email"
              placeholder="type your email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="p-2 rounded-md text-black"
              type="password"
              placeholder="type your password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="p-1 rounded-md bg-blue-300 my-3 w-72 text-white hover:bg-blue-500 hover:text-black transition ease-in-out delay-100"
          >
            Login
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
