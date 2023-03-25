const PokemonFormSelection = ({ formList, selectForm, activeForm }) => {
  return (
    <section id="form-selection">
      {formList.map((form) => {
        return (
          <button
            key={form.id}
            className={`form-selection-item ${
              form.id == activeForm.form ? "active" : ""
            }`}
            value={form.id}
            onClick={(e) => selectForm(e)}
          >
            {form.name}
          </button>
        );
      })}
    </section>
  );
};

export default PokemonFormSelection;
