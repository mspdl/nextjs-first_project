import Link from "next/link";
import { useState } from "react";

const About = () => {
  const DEFAULT_VALUE = 110;
  const [count, setCount] = useState(DEFAULT_VALUE);

  return (
    <div>
      <h1 className="p-5 text-5xl">About page ({count})</h1>
      <p>Started in {DEFAULT_VALUE}</p>
      {/* Only refresh the component (p) above (the only that changed) but keeps the state*/}
      <ul className="list-disc list-inside">
        <li>
          <Link href="/about/morgan">Morgan</Link>
        </li>
        <li>
          <Link href="/about/john">John</Link>
        </li>
      </ul>
      <button onClick={() => setCount(count + 1)}>increase</button>
    </div>
  );
};

export default About;
