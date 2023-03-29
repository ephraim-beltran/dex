import { useParams } from "react-router-dom";
import { useEffect } from "react";
import pokeData from "./pokeData";
import BackButton from "../BackButton";
import PokemonCard from "./PokemonCard";
import Loading from "../Loading";
import PokemonFormSelection from "./PokemonFormSelection";
import PokemonWeakness from "./PokemonWeakness";
import fetchWeakness from "../TypeCalculator/fetchWeakness";

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

  const {weakness} = fetchWeakness(activeForm.types)

  if (loading) return <Loading />;

  return (
    <>
      <BackButton previousPage={"/search"} />
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
      <PokemonWeakness 
        weakness={weakness}
      />
    </>
  );
};

export default PokemonPage;
