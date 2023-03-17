import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Home = () => {
  return (
    <>
      <section className="search">
        <h2>Search pokemon here:</h2>
        <SearchBar />
      </section>
      <section className="calculator">
        <Link to="/type-calculator">
          <h2>Type calculator</h2>
        </Link>
      </section>
    </>
  );
};

export default Home;
