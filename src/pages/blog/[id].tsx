import { Layout } from "@/components/Layout";
import { Post } from "@/types/Post";
import { GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

type PostProps = {
  post: Post;
};

const PostPage = ({ post }: PostProps) => {
  return (
    <Layout>
      <div className="p-3 flex flex-col items-center">
        <Head>
          <title>Blog - {post.title}</title>{" "}
          <meta name="title" content={post.title} />
          <meta name="description" content={post.body} />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`http://localhost:3000/blog/${post.id}`}
          />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.body} />
          <meta
            property="og:image"
            content="http://localhost:3000/sneakers.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={`http://localhost:3000/blog/${post.id}`}
          />
          <meta property="twitter:title" content={post.title} />
          <meta property="twitter:description" content={post.body} />
          <meta
            property="twitter:image"
            content="http://localhost:3000/sneakers.png"
          />
        </Head>
        <h1 className="text-5xl pb-2">{"Morgan's Blog"}</h1>
        <h2 className="text-3xl font-bold pb-2">{post.title}</h2>
        <p className="max-w-2xl">{post.body}</p>
      </div>
    </Layout>
  );
};

export default PostPage;

type IPath = {
  params: {
    id: string;
  };
  locale: string;
};

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  const paths: IPath[] = [];

  posts.map((post) => {
    paths.push({ params: { id: post.id.toString() }, locale: "en" });
    paths.push({ params: { id: post.id.toString() }, locale: "pt" });
  });

  return { paths, fallback: "blocking" };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const { locale } = context;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  console.log("Selected Language: " + locale);

  return {
    props: {
      post,
    },
  };
};
