import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Components from './components/Components';
import Parse from "parse";
import * as Env from "./environments";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {


  const [data, setData] = useState([{}]);

  return (
    <div >
      <header >
        <Components />
      </header>
    </div>
  );
}

export default App;
