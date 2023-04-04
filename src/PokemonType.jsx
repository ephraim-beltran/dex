const PokemonType = ({type}) => {
    return ( 
        <div className={`pokemon-type ` + type}>
              {type}
        </div>
     );
}
 
export default PokemonType;