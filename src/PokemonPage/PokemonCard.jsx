import { useState } from "react";
import PokemonType from "../PokemonType";

const PokemonCard = ({ dexId, name, activeForm, shiny, setShiny }) => {
  const shinyButton = (e) => {
    e.preventDefault();
    setShiny(!shiny);
  };

  const getPercentage = (value) => {
    return (value / 255) * 100;
  };
  return (
    <section id="pokemon-card" className={activeForm.types[0].name}>
      <div className="pokemon-title">
        <h2 id="pokemon-name">{name}</h2>
        <span id="pokemon-id"># {dexId}</span>
        <button
          className={shiny ? "active" : undefined}
          onClick={(e) => {
            shinyButton(e);
          }}
        >
          <span className="material-symbols-outlined">
            temp_preferences_custom
          </span>
        </button>
      </div>
      <img
        src={shiny ? activeForm.sprites.shiny : activeForm.sprites.default}
      />
      <div className="pokemon-card-types">
        {activeForm.types.map((type, i) => {
          return <PokemonType type={type.name} key={i} />;
        })}
      </div>
      <div className="pokemon-card-stats">
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">hp</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.hp) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.hp
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.hp}
          </div>
        </div>
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">atk</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.attack) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.attack
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.attack}
          </div>
        </div>
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">def</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.defense) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.defense
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.defense}
          </div>
        </div>
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">sp.atk</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.special_attack) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.special_attack
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.special_attack}
          </div>
        </div>
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">sp.def</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.special_defense) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.special_defense
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.special_defense}
          </div>
        </div>
        <div className="pokemon-card-stats-entry">
          <div className="pokemon-card-stats-label">spd</div>
          <div
            className="pokemon-card-stats-value"
            style={{
              flexBasis: getPercentage(activeForm.stats.speed) + "%",
              backgroundColor: `hsl(${getPercentage(
                activeForm.stats.speed
              )}, 100%, 50%)`,
            }}
          >
            +{activeForm.stats.speed}
          </div>
        </div>
      </div>
      <div className="pokemon-card-abilities">
        <div className="pokemon-card-abilities-labels">
          <div className="pokemon-ability-label">Ability</div>
          <div className="pokemon-ability-label">Hidden</div>
        </div>
        <div className="pokemon-card-abilities-list">
          <div className="pokemon-ability-common">
            {activeForm.abilities.map((ability) => {
              return (
                <div key={ability.id} className="pokemon-ability-common-item">
                  {ability.name.replace("-", " ")}
                </div>
              );
            })}
          </div>
          <div className="pokemon-ability-hidden">
            <div className="pokemon-ability-common">
              {activeForm.hidden_abilities.map((ability) => {
                return (
                  <div key={ability.id} className="pokemon-ability-hidden-item">
                    {ability.name.replace("-", " ")}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonCard;
