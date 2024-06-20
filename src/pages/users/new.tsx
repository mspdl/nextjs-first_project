import { Layout } from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const NewUser = () => {
  const router = useRouter();

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSaveForm = async () => {
    if (nameInput && emailInput) {
      const json = await axios.post(`/api/users`, {
        name: nameInput,
        email: emailInput,
      });
      if (json.data.status) {
        setNameInput("");
        setEmailInput("");
        if (
          window.confirm(
            "User registered successfully! Want to go to users page?"
          )
        ) {
          router.push("/users");
        }
      } else {
        alert(JSON.stringify(json.data.error));
      }
    } else {
      alert("You need to fill out user name and email");
    }
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>New User</title>
        </Head>
        <h1 className="text-3xl font-bold text-center">New User Page</h1>
        <div className="flex flex-col items-center">
          <input
            className="w-[30%] rounded-md p-1 my-3 text-center text-black"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Type the user name"
          />
          <input
            className="w-[30%] rounded-md p-1 my-3 text-center text-black"
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Type the user email"
          />
          <button onClick={handleSaveForm}>Register</button>
        </div>
      </div>
    </Layout>
  );
};

export default NewUser;
