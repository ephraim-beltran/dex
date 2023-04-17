import { useState } from "react";
import { useEffect } from "react";


const fetchSpeciesList = (url,query) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query}),
    })
    .then(res => {
        if (!res.ok) {
            throw Error('Data not received')
        }
        return res.json()
    })
    .then(({data:{pokemon_v2_pokemonspecies : pokeSpecies}}) => {
        setData(pokeSpecies)
        setLoading(false)
        setError(null)
    })
    .catch(err => {
        setError(err.message)
        setLoading(false)
    })

    return () => controller.abort();
  }, []);

  return { data, error, loading };
};

export default fetchSpeciesList;
