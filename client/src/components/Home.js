import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [stud, setStud] = useState(false);
  const [teach, setTeach] = useState(false);

  const style = {
    margin: "auto",
    padding: "20px",
    background: "blue",
    cursor: "pointer"
  };
  if (stud) return <Redirect to="/userlogin" />;
  if (teach) return <Redirect to="/teacherlogin" />;
  return (
    <div>
      <div
        onClick={e => {
          setStud(true);
        }}
        style={style}
      >
        STUDENT
      </div>
      <div
        onClick={e => {
          setTeach(true);
        }}
        style={style}
      >
        TEACHER
      </div>
    </div>
  );
};

export default Home;
