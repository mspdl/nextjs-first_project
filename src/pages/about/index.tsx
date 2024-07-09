/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/inline-script-id */
import { Layout } from "@/components/Layout";
import { MyButton } from "@/components/MyButton";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import SneakersImage from "../../../public/sneakers.png";
import styles from "../../styles/About.module.css";

type Props = {
  name: string;
};

const About = ({ name }: Props) => {
  const DEFAULT_VALUE = 110;
  const [count, setCount] = useState(DEFAULT_VALUE);

  const { t } = useTranslation("common");
  const { t: tAbout } = useTranslation("about");

  return (
    <Layout>
      <div>
        <Head>
          <title>{tAbout("page_title")}</title>
        </Head>

        <Image
          src={SneakersImage}
          alt={tAbout("sneakers")}
          height={200}
          width={200}
        />
        <Image
          src="https://www.google.com.br/google.jpg"
          alt={tAbout("google_logo")}
          width={200}
          height={200}
        />

        <h1 className={`p-5 text-5xl ${styles.title}`}>
          {tAbout("document_title", { count })}
        </h1>
        <p>{tAbout("started_in", { value: DEFAULT_VALUE })}</p>
        {/* Only refresh the component (p) above (the only that changed) but keeps the state*/}
        <p>{tAbout("my_name", { name: process.env.NEXT_PUBLIC_NAME })}</p>
        <p>{tAbout("server_text", { text: name})}</p>
        <ul
          className="list-disc list-inside"
          style={{
            color: count > DEFAULT_VALUE ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          <li className="item-1">
            <Link href="/about/morgan">{tAbout("using_link", {name: "Morgan"})}</Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/about/[slug]", query: { slug: "thomas" } }}
              replace
              scroll={false}
            >
              {tAbout("using_link", {name: "Thomas"})}
            </Link>
          </li>
          <li>
            <a href="/about/john">{tAbout("using_a", {name: "John"})}</a>
          </li>
        </ul>
        <MyButton onClick={() => setCount(count + 1)} label={tAbout("increase")} />
        <Script
          src="https://google-analytics.com/analytics.js"
          strategy="lazyOnload"
        />
        <Script strategy="afterInteractive">{`console.log('page loaded!')`}</Script>

        <style global jsx>
          {`
            body {
              background-color: black;
            }
            ul {
              background-color: orange;
            }
            .item-1 {
              background-color: pink;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "about"])),
      name: process.env.NAME,
    },
  };
};

export default About;
