import { useNavigate } from "react-router-dom";

const BackButton = ({previousPage}) => {
    const navigate = useNavigate();

    const goBack = (e) => {
        e.preventDefault();
        navigate(previousPage);
    }

  return (
    <button
    id="back-button"
    className="material-symbols-outlined"
    onClick={(e) => {
        goBack(e)
    }}
    >
        arrow_back_ios_new
    </button>
  );
};

export default BackButton;
