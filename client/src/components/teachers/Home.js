import React, { useState,useEffect  } from "react";
import { Redirect } from "react-router-dom";
import Template from "./Template";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [stud, setStud] = useState();
  const style = {
    margin: "auto",
    padding: "20px",
    background: "blue",
    cursor: "pointer"
  };

  useEffect(() => {
    fetch("http://localhost:5001/api/students")
      .then(res => res.json())
      .then(d => {
        console.log(d.student);
        setStud(d.student);
      });
  });

  if (!token) return <Redirect to="/teachlogin" />;

  return (
    <div>
      {stud.map(x => {
        return <Template _id={x._id} />;
      })}
    </div>
  );
};

export default Home;
