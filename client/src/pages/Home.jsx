import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ userInfo, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container mx-auto p-5">
      <p>First Name: {userInfo?.firstName}</p>
      <p>Last Name: {userInfo?.lastName}</p>
      <p>Email: {userInfo?.email}</p>
    </div>
  );

  // {
  //   !isAuthenticated ? (
  //     <Navigate to="/login" replace />
  //   ) : (
  //     <div className="container mx-auto p-5">
  //       <p>First Name: {userInfo?.firstName}</p>
  //       <p>Last Name: {userInfo?.lastName}</p>
  //       <p>Email: {userInfo?.email}</p>
  //     </div>
  //   );
  // }

  console.log(isAuthenticated);
};

export default Home;
