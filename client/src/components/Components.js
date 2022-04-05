import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignUp from "./Login/SignUp"; 
import Login from "./Login/Login";
import ProfilePage from "./Profile/Profile";

export default function Components() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/:username" component={ProfilePage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}