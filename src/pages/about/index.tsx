import Link from "next/link";
import { useState } from "react";

const About = () => {
  const [count, setCount] = useState(110);

  return (
    <div>
      <h1 className="p-5 text-5xl">About page ({count})</h1>
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
