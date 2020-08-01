import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  //margin: "100px",
  padding: "50px"
};
const UserSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const Submit = e => {
    e.preventDefault();
    console.log(name, password, email, subject);
    fetch("http://localhost:5001/api/teachers/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name, subject }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg == "success") {
          setIsLoggedIn(true);
        }
      })
      .catch(e => setError(e));
  };
  if (isLoggedIn || token) return <Redirect to="/teachlogin" />;
  return (
    <div style={style}>
      <h2>SIGNUP</h2>
      <form style={style} onSubmit={Submit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          style={{ marginTop: "5px" }}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          style={{ marginTop: "5px" }}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          style={{ marginTop: "5px" }}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <label>Select your Subject</label>
        <select value={subject} onChange={e => setSubject(e.target.value)}>
          <option value="chemistry">CHEMISTRY</option>
          <option value="physics">PHYSICS</option>
          <option value="maths">MATHS</option>
        </select>
        <button style={{ marginTop: "5px" }}>Register</button>
      </form>
      <h1>{error} </h1>
    </div>
  );
};

export default UserSignup;
