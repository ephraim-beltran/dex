import SearchBar from "../SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchHere = () => {
  const [results, setResults] = useState([]);

  return (
    <>
      <section className="search featured-article">
        <h2>Search pokemon here:</h2>
        <SearchBar setResults={setResults}>
        <div className="search-output">
          {results.length > 0 &&
            results.map((result) => {
              return (
                <Link
                  to={`/pokemon/${result.id}`}
                  className="search-result"
                  key={result.id}
                >
                  {result.name}
                </Link>
              );
            })}
        </div>
        </SearchBar>
      </section>
    </>
  );
};

export default SearchHere;
