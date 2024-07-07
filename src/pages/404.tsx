import { Layout } from "@/components/Layout";
import Head from "next/head";

const Custom404 = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Page not found</title>
        </Head>
        <h1 className="text-3xl font-bold">404</h1>
        <p>Page not found</p>
      </div>
    </Layout>
  );
};

export default Custom404;
