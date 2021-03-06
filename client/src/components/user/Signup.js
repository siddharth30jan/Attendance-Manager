import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "50px",
};
const UserSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    //console.log(name, password, email);
    setLoading(true);
    fetch("/api/students/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLoading(false);
        if (data.msg == "success") {
          setIsLoggedIn(true);
        } else setError(data.err);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  };
  if (isLoggedIn || token) return <Redirect to="/userlogin" />;
  return (
    <div style={style}>
      <h2>SIGNUP</h2>
      <form style={style} onSubmit={Submit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          style={{ marginTop: "5px" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          style={{ marginTop: "5px" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          style={{ marginTop: "5px" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button style={{ marginTop: "5px" }}>Register</button>
      </form>
      <h1>{error} </h1>
      {loading && <h1>Loading....</h1>}
    </div>
  );
};

export default UserSignup;
