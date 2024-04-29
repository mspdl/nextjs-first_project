/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/inline-script-id */
import { MyButton } from "@/components/MyButton";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import styles from "../../styles/About.module.css";

type Props = {
  name: string;
};

const About = ({ name }: Props) => {
  const DEFAULT_VALUE = 110;
  const [count, setCount] = useState(DEFAULT_VALUE);

  return (
    <div>
      <h1 className={`p-5 text-5xl ${styles.title}`}>About page ({count})</h1>
      <p>Started in {DEFAULT_VALUE}</p>
      {/* Only refresh the component (p) above (the only that changed) but keeps the state*/}
      <p>My name is {process.env.NEXT_PUBLIC_NAME}</p>
      <p>This text: {name}</p>
      <ul
        className="list-disc list-inside"
        style={{
          color: count > DEFAULT_VALUE ? "red" : "green",
          fontWeight: "bold",
        }}
      >
        <li className="item-1">
          <Link href="/about/morgan">{"Morgan (link using <Link>)"}</Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/about/[slug]", query: { slug: "thomas" } }}
            replace
            scroll={false}
          >
            {"Thomas (link using <Link>)"}
          </Link>
        </li>
        <li>
          <a href="/about/john">{"John (link using <a>)"}</a>
        </li>
      </ul>
      <MyButton onClick={() => setCount(count + 1)} label="increase" />
      <Script
        src="https://google-analytics.com/analytics.js"
        strategy="lazyOnload"
      />
      <Script strategy="afterInteractive">{`console.log('page loaded!')`}</Script>

      <style global jsx>
        {`
          body {
            background-color: pink;
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
  );
};

export const getStaticProps = () => {
  return {
    props: {
      name: process.env.NAME,
    },
  };
};

export default About;
