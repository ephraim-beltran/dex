import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <article className="search">
        <h2>Search pokemon here:</h2>
        <input type="text" />
      </article>
      <article className="calculator">
        <Link to="/type-calculator">
          <h2>Type calculator</h2>
        </Link>
      </article>
    </>
  );
};

export default Home;
