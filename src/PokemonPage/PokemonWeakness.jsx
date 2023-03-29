import fetchWeakness from "../TypeCalculator/fetchWeakness";

const PokemonWeakness = ({weakness}) => {
    return ( 
        <section id="pokemon-weakness">
            <p>Here are the weaknesses:</p>
            {weakness.map(item => <p key={item.damage_type}>{item.damage_type}</p>)}
        </section>
     );
}
 
export default PokemonWeakness;