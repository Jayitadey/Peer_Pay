import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage.removeItem()
    navigate("/Login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;