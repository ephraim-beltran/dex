import { useState, useEffect } from "react";

const fetchTypeData = async (typeId, controller) => {
  const query = `
        query weakness_by_type {
            pokemon_v2_type_by_pk(id: ${typeId}) {
                id
                name
                pokemonV2TypeefficaciesByTargetTypeId {
                    damage_factor
                    pokemon_v2_type {
                        name
                    }
                }
            }
        }
    `;
  const url = "https://beta.pokeapi.co/graphql/v1beta";
  const response = await fetch(url , {
    signal: controller.signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  return response;
};

const fetchWeakness = (typeList) => {
  const [weakness, setWeakness] = useState([]);
  const [sortedWeakness, setSortedWeakness] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    
    const getList = async () => {
        try {
            const responses = await Promise.all(typeList.map(type => fetchTypeData(type.id, controller)))
            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error(
                        `Pokemon type data not received. Responded with ${responses.status}`
                    );
                }
            })

            const data = await Promise.all(responses.map(response => response.json()))

            return data;
            
        } catch (err) {
            if (err.name !== 'AbortError'){
                console.error(err.message)
            }
        }
    }
    
    getList()
    .then(data => {
        const weaknesses = data.map(({
            data: {
              pokemon_v2_type_by_pk: {
                pokemonV2TypeefficaciesByTargetTypeId: typeWeaknesses
              }
            }
          }) => {
            return typeWeaknesses
          }
        )

        let filteredList = []; // List that needs to be returned
        // Pushes each array item and consolidates existing array item
        weaknesses.forEach(weakness => {
          weakness.forEach(item => {
            const index = filteredList.findIndex(obj => obj.damage_type === item.pokemon_v2_type.name);

            if (index !== -1) {
              filteredList[index].damage_factor = filteredList[index].damage_factor * item.damage_factor / 100
            } else {
              filteredList.push({
                damage_factor: item.damage_factor,
                damage_type: item.pokemon_v2_type.name
              })
            }
          })
        })
        // Sorts the filteredList in order of damage_factor
        // Not necessary
        const sortedList = filteredList.sort((a, b) => {
          return b.damage_factor - a.damage_factor
        })
        setWeakness(filteredList);
        setSortedWeakness(sortedList);

        // For debugging only
        console.log('Weakness loaded for: ' +
          typeList.map(type => type.name)
        );
    })

    return () => controller.abort();
  }, [typeList]);

  return {
    weakness,
    sortedWeakness
  };
};

export default fetchWeakness;
