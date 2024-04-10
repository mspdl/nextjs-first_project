import Link from "next/link";
import { useRouter } from "next/router";

const AboutItem = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="p-3">
      <p className="pb-2 text-2xl">{slug + "'s Dynamic page"}</p>
      <Link className="border border-white p-1 rounded-md" href={"/about"}>About page</Link>
    </div>
  );
};

export default AboutItem;
