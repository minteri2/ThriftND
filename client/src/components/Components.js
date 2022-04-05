import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignUp from "./Login/SignUp"; 
import Login from "./Login/Login";
import Homepage from "./Homepage/Homepage";
import Cart from "./Cart/Cart";

export default function Components() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/home" component={Homepage} />
        <Route path="/cart" component={Cart} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}