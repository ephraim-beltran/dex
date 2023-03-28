import { useParams } from "react-router-dom";
import pokeData from "./pokeData";
import BackButton from "../BackButton";
import PokemonCard from "./PokemonCard";
import Loading from "../Loading";
import PokemonFormSelection from "./PokemonFormSelection";
import PokemonWeakness from "./PokemonWeakness";

const PokemonPage = () => {
  const { dexId } = useParams();

  // Moved states to pokeData component for readability
  const {
    loading,
    pokemonData,
    formList,
    selectForm,
    activeForm,
    shiny,
    setShiny,
  } = pokeData(dexId);

  return (
    <>
    <BackButton previousPage={'/search'}/>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <PokemonFormSelection
            selectForm={selectForm}
            activeForm={activeForm}
            formList={formList}
          />
          <PokemonCard
            dexId={pokemonData.id}
            name={pokemonData.name}
            activeForm={activeForm}
            shiny={shiny}
            setShiny={setShiny}
          />
          <PokemonWeakness />
        </>
      )}
    </>
  );
};

export default PokemonPage;
