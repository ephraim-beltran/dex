import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import SearchHere from "./SearchHere";

const Home = () => {
  return (
    <>
      <SearchHere />
      <section className="calculator featured-article">
        <Link to="/type-calculator">
          <h2>Type calculator</h2>
        </Link>
      </section>
    </>
  );
};

export default Home;
