import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Components from './components/Components';
function App() {


  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }, [])

  return (
    <div >
      <header >
        <Components />
        {(typeof data.members === 'undefined') ? (
          <p>Loading...</p>
        ): (
          data.members.map((member,i) => (
            <p key={i}>{member}</p>
          ))
        )}
      </header>
    </div>
  );
}

export default App;
