import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile.tsx";
import { useEffect } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Profile token={token} />;
  } else {
    useEffect(() => {
      navigate("/login");
    }, [navigate]);
    return null;
  }
}
