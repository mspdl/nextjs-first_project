import { Post } from "@/types/Post";

type PostProps = {
  post: Post;
};

const PostPage = ({ post }: PostProps) => {
  return (
    <div className="">
      <h1>Blog</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
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

  return { paths, fallback: true };
};

export const getStaticProps = async () => {};
