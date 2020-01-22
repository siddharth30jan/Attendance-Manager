import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <div>
      <h1>You have been logged out!</h1>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};
export default Logout;
