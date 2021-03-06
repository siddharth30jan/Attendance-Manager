import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "20px",
};
const UserLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const Submit = (e) => {
    e.preventDefault();
    // console.log(password, email);
    setLoading(true);
    fetch("/api/teachers/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setLoading(false);
        if (data.msg == "success") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else setError(data.err);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.err);
      });
  };
  if (token) return <Redirect to="/teachhome" />;
  return (
    <div style={style}>
      <h2>SIGN IN</h2>
      <form style={style} onSubmit={Submit}>
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
        <button style={{ marginTop: "5px" }}>Login</button>
      </form>
      <div style={{ style }}>
        <h2>Dont have an account? Register here</h2>
        <Link to="/teachsignup" style={{ textDecoration: "none" }}>
          <button color="inherit">Signup</button>
        </Link>
      </div>
      <h1>{error} </h1>
      {loading && <h1>Loading....</h1>}
    </div>
  );
};

export default UserLogin;
