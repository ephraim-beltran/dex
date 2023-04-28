const url = "https://beta.pokeapi.co/graphql/v1beta";
const query = `
query TypeList {
    pokemon_v2_type(limit: 18) {
      name
      id
    }
  }
  
`;
const fetchList = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    referrerPolicy: 'no-referrer'
  });
  if (!response.ok) {
    throw new Error(
      `Error with fetching Type list. Returned with code ${response.status}`
    );
  }
  const {
    data: { pokemon_v2_type: typeList },
  } = await response.json();

  
  return typeList;
}

export default fetchList;