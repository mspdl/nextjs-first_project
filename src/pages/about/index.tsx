const About = () => {
  return (
    <div>
      <h1 className="p-5 text-5xl">About page</h1>
      <ul className="list-disc list-inside">
        <li>
          <a href="/about/morgan">Morgan</a>
        </li>
        <li>
          <a href="/about/john">John</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
