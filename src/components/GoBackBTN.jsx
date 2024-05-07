import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const GoBackBTN = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className=" btn border-0 fw-bold d-inline-flex align-items-center general-outline-button"
    >
      <MdOutlineArrowBackIos />
      <span className=" ms-1">Go Back</span>
    </button>
  );
};

export default GoBackBTN;
