import { useState } from "react";
import fetchData from "./hooks/fetchData";

const SearchBar = ({ setResults, children: resultList }) => {
  const [searchInput, setSearchInput] = useState("");
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
    if (e.target.value.length > 2) {
      const list = data.pokemon_v2_pokemonspecies;
      const filteredList = list.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const input = e.target.value.toLowerCase();
        return pokemonName.includes(input);
      });
      setResults(filteredList);
    }
    if (error !== null) console.log(error);
    if (searchInput.length === 0) setResults([]);
    setSearchInput(e.target.value);
  };

  const clearInput = (e) => {
    e.preventDefault();
    setSearchInput("");
    setResults([]);
  };
  return (
    <div className="search-input">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          getList(e);
        }}
      />

      <button onClick={(e) => clearInput(e)}>
        <span className="material-symbols-outlined">close</span>
      </button>
      {resultList}
    </div>
  );
};

export default SearchBar;
