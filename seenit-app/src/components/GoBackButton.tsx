import { useNavigate } from "react-router-dom";
import { ArrowBackIos as ArrowBackIcon } from "@mui/icons-material";

export default function GoBack() {
  const navigate = useNavigate();
  return (
    <div className="goBackSection">
      <a
        role="button"
        className="goBackButton link"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="buttonIcon iconButton" />
      </a>
    </div>
  );
}
