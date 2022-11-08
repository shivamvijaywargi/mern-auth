import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const lougoutRequest = async () => {
    const resp = await axios.get("http://localhost:4000/api/v1/logout");

    if (resp.data.success) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    lougoutRequest();
  }, []);

  toast("Logged out successfully");

  return <div>Logout</div>;
};

export default Logout;
