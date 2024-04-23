/* eslint-disable @next/next/inline-script-id */
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

type Props = {
  name: string;
};

const About = ({ name }: Props) => {
  const DEFAULT_VALUE = 110;
  const [count, setCount] = useState(DEFAULT_VALUE);

  return (
    <div>
      <h1 className="p-5 text-5xl">About page ({count})</h1>
      <p>Started in {DEFAULT_VALUE}</p>
      {/* Only refresh the component (p) above (the only that changed) but keeps the state*/}
      <p>My name is {process.env.NEXT_PUBLIC_NAME}</p>
      <p>This text: {name}</p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/about/morgan">Morgan</Link>
        </li>
        <li>
          <Link href="/about/john">John</Link>
        </li>
      </ul>
      <button onClick={() => setCount(count + 1)}>increase</button>
      <Script
        src="https://google-analytics.com/analytics.js"
        strategy="lazyOnload"
      />
      <Script strategy="afterInteractive">{`window.alert('page loaded!')`}</Script>
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
