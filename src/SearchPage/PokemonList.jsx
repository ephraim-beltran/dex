import { Link } from "react-router-dom";
const PokemonList = ({ results }) => {
  return (
    <>
      {results.length > 0 &&
        results.map((result, i) => {
          return (
            <Link to={`/pokemon/${result.id}`} key={i}>
              <div className="result-card">
                <div className="result-sprite">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`}
                  />
                  <h4 className="result-dex-number"># {result.id}</h4>
                </div>
                <h3 className="result-name">{result.name}</h3>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default PokemonList;
