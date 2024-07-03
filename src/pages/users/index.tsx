import { Layout } from "@/components/Layout";
import { User } from "@/types/User";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import api from "../../../libs/api";

type Props = {
  users: User[];
};

const Users = ({ users }: Props) => {
  const { data: session, status: sessionStatus } = useSession();

  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [userList, setUserList] = useState<User[]>(users);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);
      const json = await axios.get(`/api/users?page=${pageCount + 1}`);

      if (json.data.status) {
        if (json.data.users.length < 3) {
          setShowMore(false);
        }
        setUserList([...userList, ...json.data.users]);
      }
      setLoading(false);
      setPageCount(pageCount + 1);
    }
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>Users</title>
        </Head>

        <h1 className="text-3xl font-bold text-center">Users Page</h1>

        {sessionStatus === "loading" && <div>Loading</div>}
        {sessionStatus === "unauthenticated" && (
          <div>
            <p>{`You're not allowed to access this page`}</p>
            <button
              className="border border-white rounded-md p-3 mb-10"
              onClick={() => signIn()}
            >
              Login
            </button>
          </div>
        )}
        {sessionStatus === "authenticated" && (
          <>
            <Link
              className="p-1 border border-blue-500 rounded-md bg-blue-300"
              href={`/users/new`}
            >
              New User
            </Link>

            <ul>
              {userList.map((user, index) => (
                <li key={index}>
                  <p>
                    {index + 1} - {user.name}{" "}
                    <span className="italic text-xs">({user.email})</span>
                    <span className="text-xs"> [{user.id}]</span>
                  </p>
                </li>
              ))}
            </ul>

            {loading && "loading"}

            {showMore && !loading && (
              <button
                onClick={handleLoadMore}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const users = await api.getAllUsers(0);

  return {
    props: { users },
  };
};

export default Users;
