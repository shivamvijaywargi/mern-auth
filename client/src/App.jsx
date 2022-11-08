import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.min.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const isUserAuthenticated = async () => {
    const resp = await axios.get("http://localhost:4000/api/v1/userDashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (resp.data.user) {
      setIsAuthenticated(true);
      setUserInfo(resp.data.user);
    }
    console.log(resp);
  };

  useEffect(() => {
    isUserAuthenticated();
  }, [isAuthenticated]);

  return (
    <div className="">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route
            path="/"
            element={
              <Home userInfo={userInfo} isAuthenticated={isAuthenticated} />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/logout"
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
