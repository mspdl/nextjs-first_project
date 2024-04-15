import { Post } from "@/types/Post";
import Link from "next/link";

type BlogProps = {
  name: string;
  posts: Post[];
};

const Blog = ({ name, posts }: BlogProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-3xl flex flex-col items-center">
        <h1 className="text-5xl p-3">{name + "'s blog"}</h1>

        <ul className="p-3 ">
          {posts.map((post, index) => (
            <li key={index} className="p-1 mb-2 border border-white rounded-md">
              <Link href={`/blog/${post.id}`}>
                <p className="font-bold">
                  [{post.id}] {post.title}
                </p>
                <p>{post.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return {
    props: {
      name: "Morgan",
      posts,
    },
    revalidate: 60 * 60 * 2,
  };
};

export default Blog;
