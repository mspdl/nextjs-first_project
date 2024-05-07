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
        <Head><title>Blog - {post.title}</title></Head>
        <h1 className="text-5xl pb-2">{"Morgan's Blog"}</h1>
        <h2 className="text-3xl font-bold pb-2">{post.title}</h2>
        <p className="max-w-2xl">{post.body}</p>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return { paths, fallback: "blocking" };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};
