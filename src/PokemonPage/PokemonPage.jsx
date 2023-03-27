import { useParams } from "react-router-dom";
import pokeData from "./pokeData";
import PokemonCard from "./PokemonCard";
import Loading from "../Loading";
import PokemonFormSelection from "./PokemonFormSelection";




const PokemonPage = () => {
  const { dexId } = useParams();

  // Moved states to pokeData component for readability
  const {
    loading,
    pokemonData,
    activeForm,
    setActiveForm
  } = pokeData(dexId);
  const selectForm = (e) => {
    e.preventDefault();
    const value = e.target.value
    setActiveForm(pokemonData.forms[pokemonData.forms.findIndex(form => form.form == value)])
}

  return (
    <>
    {loading && <Loading />}
    {!loading && (
      <>
      <PokemonFormSelection
      selectForm={selectForm}
      activeForm={activeForm}
      formList={pokemonData.forms.map(form => {
        return {
          id: form.form,
          name: form.name.replace(pokemonData.name+'-', '')
        }
      })}
      />
      <PokemonCard
      dexId={pokemonData.id}
      name={pokemonData.name}
      activeForm={activeForm}
      />
      </>
    )}
    </>
  );
};

export default PokemonPage;
