import { Layout } from "@/components/Layout";
import { GetStaticProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("common");
  const { t: tHome } = useTranslation("home");

  return (
    <Layout>
      <>
        <Head>
          <title>Home</title>
          <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
          <meta
            name="description"
            content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:3000/" />
          <meta
            property="og:title"
            content="Meta Tags — Preview, Edit and Generate"
          />
          <meta
            property="og:description"
            content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
          />
          <meta
            property="og:image"
            content="http://localhost:3000/sneakers.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://localhost:3000/" />
          <meta
            property="twitter:title"
            content="Meta Tags — Preview, Edit and Generate"
          />
          <meta
            property="twitter:description"
            content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
          />
          <meta
            property="twitter:image"
            content="http://localhost:3000/sneakers.png"
          />
        </Head>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center font-bold text-3xl">{tHome("welcome")}</h1>

          {!session && (
            <button
              className="border border-white rounded-md p-3"
              onClick={() => signIn()}
            >
              {tHome("login_button")}
            </button>
          )}
          {session && (
            <>
              <p>{tHome("hello_user", { name: session.user?.name })}</p>
              <button
                className="border border-white rounded-md p-3"
                onClick={() => signOut()}
              >
                {tHome("logout_button")}
              </button>
            </>
          )}
        </div>
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "home"])),
    },
  };
};

export default Home;
