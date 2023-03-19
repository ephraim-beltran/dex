import { useState } from "react";
import fetchData from "../hooks/fetchData";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const query = `query {
      pokemon_v2_pokemonspecies {
        id
        name
      }
    }
  `;
  const { data, error } = fetchData(
    "https://beta.pokeapi.co/graphql/v1beta",
    query
  );

  const getList = (e) => {
    const input = e.target.value;
    if (input.length > 3) {
      const list = data.data.pokemon_v2_pokemonspecies;
      const filteredList = list.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const input = searchInput.toLowerCase();
        return pokemonName.includes(input);
      });
      setResults(filteredList);
    }
    if (error !== null) console.log(error);
    if (searchInput.length === 0) setResults([]);
    setSearchInput(input);
  };

  const clearInput = (e) => {
    e.preventDefault();
    setSearchInput("");
    setResults([]);
  };
  return (
    <>
      <div className="search-input">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            getList(e);
          }}
        />

        <button onClick={(e) => clearInput(e)}>
          <i className="fa fa-times-circle-o" aria-hidden="true"></i>
        </button>
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
      </div>
    </>
  );
};

export default SearchBar;
