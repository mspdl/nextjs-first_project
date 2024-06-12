import { Layout } from "@/components/Layout";
import Head from "next/head";
import styles from '../styles/Users.module.css'

const Users = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Users</title>
        </Head>
          <h1>Users Page</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  

  return {
    props: {}
  }
}

export default Users;
