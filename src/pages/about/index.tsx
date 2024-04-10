import Link from "next/link";

const About = () => {
  return (
    <div>
      <h1 className="p-5 text-5xl">About page</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/about/morgan">Morgan</Link>
        </li>
        <li>
          <Link href="/about/john">John</Link>
        </li>
      </ul>
    </div>
  );
};

export default About;
