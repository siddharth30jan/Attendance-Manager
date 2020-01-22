import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Template = ({ _id, name }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const f = () => {
    fetch(`http://localhost:5001/api/teachers/modify?id=${_id}&present=true`, {
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `xxx ${token}`
      })
    })
      .then(res => res.json())
      .then(d => {
        alert("Done!");
      });
  };
  const f1 = () => {
    fetch(`http://localhost:5001/api/teachers/modify?id=${_id}&present=false`, {
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: `xxx ${token}`
      })
    })
      .then(res => res.json())
      .then(d => {
        alert("Done!");
      });
  };
  return (
    <div>
      <h1>{name}</h1>
      <button
        style={{ color: "blue" }}
        onClick={e => {
          f();
        }}
      >
        P
      </button>
      <button
        style={{ color: "red" }}
        onClick={e => {
          f1();
        }}
      >
        A
      </button>
    </div>
  );
};

export default Template;
