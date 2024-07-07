import { Layout } from "@/components/Layout";
import Head from "next/head";

const Custom500 = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Internal Server Error</title>
        </Head>
        <h1 className="text-3xl font-bold">500</h1>
        <p>Internal Server Error</p>
      </div>
    </Layout>
  );
};

export default Custom500;
