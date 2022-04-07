import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Components from './components/Components';
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
