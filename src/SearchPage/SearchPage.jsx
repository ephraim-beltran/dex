import SearchBar from "../SearchBar"
import PokemonList from "./PokemonList";
import { useState } from "react";

const SearchPage = () => {
    const [results, setResults] = useState([]);

    return ( 
        <>
        <section className="search-page">
        <SearchBar results={results} setResults={setResults} />
        <PokemonList results={results} />
        </section>
        </>
     );
}
 
export default SearchPage;