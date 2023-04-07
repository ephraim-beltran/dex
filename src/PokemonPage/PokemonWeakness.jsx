import PokemonType from "../PokemonType";


const filterWeakness = (list, damage_factor) => {
    const weaknessList = list.filter(type => type.damage_factor == damage_factor)
    const typeList = weaknessList.map((type, i) => 
        <PokemonType type={type.damage_type} key={`${type.damage_type}-${type.damage_factor}-${i}`} />
        )
    return typeList;
}

const PokemonWeakness = ({weakness}) => {
    const superEffective = filterWeakness(weakness, 400);
    const effective = filterWeakness(weakness, 200);
    const normal = filterWeakness(weakness, 100);
    const resistant = filterWeakness(weakness, 50);
    const superResistant = filterWeakness(weakness, 25);
    const immune = filterWeakness(weakness, 0);
    return ( 
        <section id="pokemon-weakness">
            <h3>Weakness</h3>
            {superEffective.length > 0 && (
                <div className="damage-factor">
                    <h4>Super Effective</h4>
                    <div className="damage-types">
                        {superEffective}
                    </div>
                </div>
            )}
            {effective.length > 0 && (
                <div className="damage-factor">
                    <h4>Effective</h4>
                    <div className="damage-types">
                        {effective}
                    </div>
                </div>
            )}
            {normal.length > 0 && (
                <div className="damage-factor">
                    <h4>Normal</h4>
                    <div className="damage-types">
                        {normal}
                    </div>
                </div>
            )}
            {resistant.length > 0 && (
                <div className="damage-factor">
                    <h4>Resistant</h4>
                    <div className="damage-types">
                        {resistant}
                    </div>
                </div>
            )}
            {superResistant.length > 0 && (
                <div className="damage-factor">
                    <h4>Super Resistant</h4>
                    <div className="damage-types">
                        {superResistant}
                    </div>
                </div>
            )}
            {immune.length > 0 && (
                <div className="damage-factor">
                    <h4>Immune</h4>
                    <div className="damage-types">
                        {immune}
                    </div>
                </div>
            )}
            
        </section>
     );
}
 
export default PokemonWeakness;