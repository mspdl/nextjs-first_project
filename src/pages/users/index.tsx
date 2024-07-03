import { Layout } from "@/components/Layout";
import { AuthUser } from "@/types/AuthUser";
import { User } from "@/types/User";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import api from "../../../libs/api";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
  users: User[];
  loggedUser: AuthUser;
};

const Users = ({ users, loggedUser }: Props) => {
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

        <div>
          Hello {loggedUser.name}! You are logged as a {loggedUser.role}.
        </div>

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
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const users = await api.getAllUsers(0);

  return {
    props: { loggedUser: session.user, users },
  };
};

export default Users;
