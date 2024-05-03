import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const Age = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <div className="p-3">{slug + " is 90 years old"}</div>
    </Layout>
  );
};

export default Age;
