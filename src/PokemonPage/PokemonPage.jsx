import { useParams } from "react-router-dom";
import pokeData from "../hooks/pokeData";
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
    weakness,
  } = pokeData(dexId);

  if (loading) return <Loading />;

  return (
    <>
      <BackButton previousPage={"/search"} />
      <PokemonFormSelection
        selectForm={selectForm}
        activeForm={activeForm}
        formList={formList}
      />
      <div
      className={
        'pokemon-article' +
        ` ${pokemonData.name}` +
        ` ${pokemonData.is_legendary ? 'legendary' : ''}` +
        ` ${pokemonData.is_mythical ? 'mythical' : ''}`
      }>
        <PokemonCard
          dexId={pokemonData.id}
          name={pokemonData.name}
          activeForm={activeForm}
          shiny={shiny}
          setShiny={setShiny}
        />
        <PokemonWeakness weakness={weakness} />
      </div>
    </>
  );
};

export default PokemonPage;
