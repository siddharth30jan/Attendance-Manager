import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import {
  Home,
  UserSignup,
  UserLogin,
  TeachLogin,
  TeachSignup,
  TeachHome,
  UserHome,
  Logout
} from "./components/index";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/userlogin" exact component={UserLogin} />
          <Route path="/usersignup" exact component={UserSignup} />
          <Route path="/userhome" exact component={UserHome} />

          <Route path="/teachlogin" exact component={TeachLogin} />
          <Route path="/teachsignup" exact component={TeachSignup} />
          <Route path="/teachhome" exact component={TeachHome} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
