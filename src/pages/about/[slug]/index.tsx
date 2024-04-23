import { useRouter } from "next/router";
import { useEffect } from "react";

const AboutItem = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`Going to ${url}`);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div className="p-3">
      <p className="pb-2 text-2xl">{slug + "'s Dynamic page"}</p>
      <p className="mb-2">Pathname: {router.pathname}</p>
      <p className="mb-2">isFallback: {router.isFallback.toString()}</p>

      <button
        className="border border-white ml-2 p-1 rounded-md"
        onClick={() => {
          router.push("/about");
        }}
      >
        {"Go to About page"}
      </button>
      <button
        className="border border-white ml-2 p-1 rounded-md"
        onClick={() => {
          router.push({ pathname: "/about/[slug]", query: { slug: "pedro" } });
        }}
      >
        {"Go to Pedro's page"}
      </button>
      <button
        className="border border-white ml-2 p-1 rounded-md"
        onClick={() => {
          router.replace("/about/ana");
        }}
      >
        {"Go to Ana's page"}
      </button>
    </div>
  );
};

export default AboutItem;
