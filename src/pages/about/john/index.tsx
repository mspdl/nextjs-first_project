import Link from "next/link";

const John = () => {
  return (
    <div className="">
      <h3 className="p-3 text-3xl">{"John's page"}</h3>
      <Link href="/about">Go to about page</Link>
    </div>
  );
};

export default John;
