import { useState } from "react";
import fetchSpeciesList from "./hooks/fetchSpeciesList";

const SearchBar = ({ setResults, children: resultList }) => {
  const [searchInput, setSearchInput] = useState("");
  const query = `query {
      pokemon_v2_pokemonspecies {
        id
        name
      }
    }
  `;
  const { data, error } = fetchSpeciesList(
    "https://beta.pokeapi.co/graphql/v1beta",
    query
  );

  const getList = (e) => {
    setSearchInput(e.target.value);
    const list = data;
    if (error !== null) {
      setResults([{name: 'Cannot fetch list', id: 0}])
      return console.log(error)
    };
    if (e.target.value.length > 2) {
      const filteredList = list.filter((pokemon) => {
        const pokemonName = pokemon.name.toLowerCase();
        const input = e.target.value.toLowerCase();
        return pokemonName.includes(input);
      });
      setResults(filteredList);
    }
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
        placeholder="Search pokemon here"
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
