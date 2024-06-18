import { Layout } from "@/components/Layout";
import { User } from "@/types/User";
import Head from "next/head";
import { useState } from "react";
import api from "../../libs/api";

type Props = {
  users: User[];
};

const Users = ({ users }: Props) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [userList, setUserList] = useState<User[]>(users);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);
      const req = await fetch(`/api/users?page=${pageCount + 1}`);
      const json = await req.json();
      if (json.status) {
        if (json.users.length < 3) {
          setShowMore(false);
        }
        setUserList([...userList, ...json.users]);
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

        {showMore && (
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

export const getServerSideProps = async () => {
  const users = await api.getAllUsers(0);

  return {
    props: { users },
  };
};

export default Users;
