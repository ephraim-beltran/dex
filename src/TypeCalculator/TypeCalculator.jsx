import useAsync from "../hooks/useAsync";
import fetchList from "./TypeList";
import TypeSelection from "./TypeSelection";
import Loading from "../Loading";
const TypeCalculator = () => {
  const {
    value: typeList,
    status: listStatus,
    error: listError,
  } = useAsync(fetchList);
  const typeSelectionSection = () => {
    if (listStatus === "pending") return <Loading />;
    if (listStatus === "error") return <p>{listError.message}</p>;
    return (
      <>
        <h2>Type Calculator</h2>
        <TypeSelection typeList={typeList} />
      </>
    );
  };
  return <>{typeSelectionSection()}</>;
};

export default TypeCalculator;
