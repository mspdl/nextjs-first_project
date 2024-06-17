import { Layout } from "@/components/Layout";
import { User } from "@/types/User";
import Head from "next/head";
import api from "../../libs/api";

type Props = {
  users: User[];
};

const Users = ({ users }: Props) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Users</title>
        </Head>
        <h1 className="text-3xl font-bold text-center">Users Page</h1>

        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
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
