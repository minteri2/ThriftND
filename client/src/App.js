import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
