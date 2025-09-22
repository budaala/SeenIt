import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile.tsx";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore.ts";

export default function ProfilePage() {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore.getState().isLoggedIn;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Profile />;
  } else {
    useEffect(() => {
      navigate("/login");
    }, [navigate]);
    return null;
  }
}
