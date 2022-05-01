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
import ProfilePage from "./Profile/Profile";
import ProductPage from "./Product/Product";
import Chats from "./Chat/Chats";
import SearchResults from "./Search/SearchResults";
import UploadProductPage from "./Product/UploadProduct";


export default function Components() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/home" component={Homepage} />
        <Route path="/cart/:username" component={Cart} />
        <Route path="/user/:username" component={ProfilePage} />
        <Route path="/product/:product_id" component={ProductPage} />
        <Route path="/chats/:username" component={Chats} />
        <Route path="/results/:query" component={SearchResults} />
        <Route path="/upload/product" component={UploadProductPage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}