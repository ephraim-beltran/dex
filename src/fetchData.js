import { useState } from "react";
import { useEffect } from "react";


const fetchList = (url,query) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    // const query = `{
    //   pokemon_v2_pokemonspecies_by_pk(id: 1008) {
    //     name
    //     id
    //     pokemon_v2_pokemons {
    //       name
    //       id
    //       is_default
    //       pokemon_v2_pokemontypes {
    //         pokemon_v2_type {
    //           name
    //         }
    //         pokemon_v2_pokemon {
    //           pokemon_v2_pokemonabilities {
    //             is_hidden
    //             pokemon_v2_ability {
    //               name
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }`;

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
    .then(res => {
        if (!res.ok) {
            throw Error('Data not received')
        }
        return res.json()
    })
    .then(data => {
        setData(data)
        setIsLoading(false)
        setError(null)
    })
    .catch(err => {
        setError(err.message)
        setIsLoading(false)
    })

    return () => controller.abort();
  }, []);

  return { data, error, isLoading };
};

export default fetchList;
