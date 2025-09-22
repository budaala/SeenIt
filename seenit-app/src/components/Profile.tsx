import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = function () {
    useUserStore.getState().logOut();
    navigate("/");
  };

  return (
    <div>
      Profile
      <div>{isLoggedIn && <button onClick={logout}>Logout</button>}</div>
    </div>
  );
};

export default Profile;
