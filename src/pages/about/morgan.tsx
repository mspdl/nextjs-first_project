import Link from "next/link";

const MorganEspindola = () => {
  return (
    <div className="">
      <h3 className="p-3 text-3xl">{"Morgan's page"}</h3>
      <Link href="/about">Go to about page</Link>
    </div>
  );
};

export default MorganEspindola;
