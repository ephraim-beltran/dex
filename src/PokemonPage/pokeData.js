import { useState, useEffect } from "react";
import fetchWeakness from "../TypeCalculator/fetchWeakness";

const getStat = (formStats, statName) => {
  return formStats[
    formStats.findIndex((stat) => stat.pokemon_v2_stat.name === statName)
  ].base_stat;
};

const pokeData = (pokeId) => {
  const query = `query pokemonDataQuery {
        pokemon_v2_pokemonspecies_by_pk(id: ${pokeId}) {
          is_legendary
          is_mythical
          name
          id
          pokemon_v2_pokemons {
            id
            is_default
            name
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
                id
              }
            }
            pokemon_v2_pokemonstats {
              base_stat
              pokemon_v2_stat {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
                id
              }
              is_hidden
            }
          }
        }
      }`;
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState();
  const [activeForm, setActiveForm] = useState({types:[]});
  const [shiny, setShiny] = useState(false);
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://beta.pokeapi.co/graphql/v1beta", {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(`Data not received: ${res.status}`);
        }
        return res.json();
      })
      .then(({data}) => {
        const pokeData = {
          name: data.pokemon_v2_pokemonspecies_by_pk.name,
          id: data.pokemon_v2_pokemonspecies_by_pk.id,
          is_legendary: data.pokemon_v2_pokemonspecies_by_pk.is_legendary,
          is_mythical: data.pokemon_v2_pokemonspecies_by_pk.is_mythical,
          forms:
            data.pokemon_v2_pokemonspecies_by_pk.pokemon_v2_pokemons.map(
              (form) => {
                return {
                  form: form.id,
                  name: form.name,
                  is_default: form.is_default,
                  types: form.pokemon_v2_pokemontypes.map((type) => {
                    return {
                      name: type.pokemon_v2_type.name,
                      id: type.pokemon_v2_type.id,
                    };
                  }),
                  stats: {
                    hp: getStat(form.pokemon_v2_pokemonstats, "hp"),
                    attack: getStat(form.pokemon_v2_pokemonstats, "attack"),
                    defense: getStat(form.pokemon_v2_pokemonstats, "defense"),
                    special_attack: getStat(
                      form.pokemon_v2_pokemonstats,
                      "special-attack"
                    ),
                    special_defense: getStat(
                      form.pokemon_v2_pokemonstats,
                      "special-defense"
                    ),
                    speed: getStat(form.pokemon_v2_pokemonstats, "speed"),
                  },
                  sprites: {
                    default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${form.id}.png`,
                    shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${form.id}.png`,
                  },
                  abilities: form.pokemon_v2_pokemonabilities
                    .filter((ability) => !ability.is_hidden)
                    .map((ability) => {
                      return ability.pokemon_v2_ability;
                    }),
                  hidden_abilities: form.pokemon_v2_pokemonabilities
                    .filter((ability) => ability.is_hidden)
                    .map((ability) => {
                      return ability.pokemon_v2_ability;
                    }),
                };
              }
            ),
        };
        setPokemonData(pokeData);
        console.log(`Pokemon data received.\nSpecies no.: ${pokeData.id}`);
        setActiveForm(
          pokeData.forms[pokeData.forms.findIndex((form) => form.is_default)]
        );

        setFormList(pokeData.forms.map((form) => {
          return {
            id: form.form,
            name: form.name.replace(pokeData.name + "-", ""),
          };
        }));
        console.log("Form list loaded");
        console.log(`Default pokemon loaded.`);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error.message);
        }
      });
      return () => controller.abort();
    }, []);
    
  const {weakness} = fetchWeakness(activeForm.types)

  const selectForm = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setActiveForm(
      pokemonData.forms[
        pokemonData.forms.findIndex((form) => form.form == value)
      ]
    );
  };

  return {
    loading, // setLoading,           // Uncomment if required
    pokemonData, // setPokemonData,   // Uncomment if required
    formList, selectForm,
    activeForm,
    shiny,
    setShiny,
    weakness
  };
};

export default pokeData;
