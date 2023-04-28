import "./TypeCalculator.css";

const TypeSelection = ({typeList}) => {
  return (
    <section>
      <div className="type-selector">
        <input type="checkbox" />
        <label className="slider round">normal</label>
      </div>
    </section>
  );
};

export default TypeSelection;
