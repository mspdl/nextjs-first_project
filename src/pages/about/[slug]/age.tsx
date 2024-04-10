import { useRouter } from "next/router";

const Age = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <div className="p-3">{slug + " is 90 years old"}</div>;
};

export default Age;
