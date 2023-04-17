import { useState, useEffect } from "react";

const url = "https://beta.pokeapi.co/graphql/v1beta";
const query = `
query TypeList {
    pokemon_v2_type(limit: 18) {
      name
      id
    }
  }
  
`;
const fetchList = async (controller) => {
  const response = await fetch(url, {
    signal: controller.signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (response.status === 522) {
    throw new Error(`Error ${response.status}: Connection timed-out. The server did not respond.`)
  }
  if (response.name === 'AbortError') return
  if (!response.ok)
    throw new Error(
      `Error with fetching Type list. Returned with code ${response.status}`
    );
  const data = await response.json();
  return data;
};
const fetchTypeList = () => {
  const [list, setList ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();


    fetchList(controller)
    .then(({data:{pokemon_v2_type:typeList}}) => {
      console.log(typeList);
      setList(typeList);
      setIsLoading(false)
      setError(false)
    })
    .catch(error => {
      if(error.name !== 'AbortError') {
        console.error(error.message);
      }
      setIsLoading(false);
      setError(true);
    })
    return () => controller.abort();
  }, []);
  return {
    list,
    isLoading,
    error
  };
};

export default fetchTypeList;