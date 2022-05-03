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
import Group from "./Group/Group";
import GroupPosts from "./Group/GroupPosts";
import UploadProductPage from "./Product/UploadProduct";
import CreateGroup from "./Group/CreateGroup";
import Checkout from "./Cart/Checkout"
import Order from "./Cart/Order"
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
        <Route path="/chats" component={Chats} />
        <Route path="/results/:query" component={SearchResults} />
        <Route path="/groups" exact component={Group} />
        <Route path="/groups/:group_id" component={GroupPosts} />
        <Route path="/upload/product" component={UploadProductPage} />
        <Route path="/creategroup" component={CreateGroup} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order" component={Order} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}