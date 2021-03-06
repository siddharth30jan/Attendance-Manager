import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [final, setFinal] = useState("");
  const style = {
    margin: "auto",
    padding: "20px",
    background: "blue",
    cursor: "pointer",
  };

  useEffect(() => {
    fetch("/api/students/myattendance", {
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `xxx ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        // console.log(d.attendance);
        const arrayOfObj = Object.entries(d.attendance).map((e) => ({
          [e[0]]: e[1],
        }));
        // console.log("hfkshfslj", arrayOfObj);
        setFinal(arrayOfObj);
      });
  }, []);

  //x => {sub: {P: 0, A: 0}}

  if (!token) return <Redirect to="/userlogin" />;
  //console.log("final",final);
  if (!final) return <div></div>;
  return (
    <div>
      {final.map((x) => {
        return (
          <div style={{ margin: "50px" }}>
            <h1>{Object.keys(x)[0]}</h1>
            <h3>Present: </h3> {Object.values(x)[0].P}
            <h3>Absents: </h3> {Object.values(x)[0].A}
          </div>
        );
      })}
      <Link to="/logout">
        <h1>Logout</h1>
      </Link>
    </div>
  );
};

export default Home;
