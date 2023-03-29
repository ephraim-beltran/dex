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

  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    signal: controller.signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(
      `Type data not received. Responded with ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};

const fetchWeakness = (typeList) => {
  const [weakness, setWeakness] = useState([]);
  const [error, setError] = useState();
  
  useEffect(() => {
    const controller = new AbortController();
    
    const getList = async () => {
      const list = await Promise.all(typeList.map(type => fetchTypeData(type.id, controller)))
      
      const datas = await Promise.all(list.map(
        ({
          data: {
            pokemon_v2_type_by_pk: {
              pokemonV2TypeefficaciesByTargetTypeId: weaknesses
            }
          }
        }) => {
        return weaknesses
      }));

      let filteredList = [];
      datas.forEach(data => {
        data.forEach(item => {
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
      const sortedList = filteredList.sort((a, b) => {
        return b.damage_factor - a.damage_factor
      })
      setWeakness(filteredList);

      // For debugging only
      console.log('Weakness loaded for: ' +
        typeList.map(type => type.name)
      );
    }

    getList().catch(err => {
        if (err.name !== 'AbortError'){
            setError(err.message)
        }
    })

    return () => controller.abort();
  }, [typeList]);

  return {
    weakness,
  };
};

export default fetchWeakness;
