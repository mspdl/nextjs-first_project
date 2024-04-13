type BlogProps = {
  name: string;
};

const Blog = ({ name }: BlogProps) => {
  return (
    <div className="">
      <h1>Blog</h1>
      <p>{name + "'s blog"}</p>
    </div>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      name: "Morgan",
    },
  };
};

export default Blog;
