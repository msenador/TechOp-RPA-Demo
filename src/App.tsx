import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export interface User {
  _id: string;
  name: string;
  eyes: string;
}

function App() {
  const [users, setUsers] = useState<User[]>();

  const initDb = async () => {
    const response = await fetch(
      "https://techop-rpa-demo-functions.azurewebsites.net/api/init-db?code=FW8mFHW6aZIZwKC-DwAoxslckCbNw-5vlLGCfffvtWVdAzFuLfLZ-g==",
      {}
    );
    const json = await response.json();
    console.log("J: ", json);
    setUsers(json);
  };

  useEffect(() => {
    initDb();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test ing<code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {users?.map((user) => {
        return (
          <div>
            <div>Name: {user.name}</div>
            <li>Eyes: {user.eyes}</li>
          </div>
        );
      })}
    </div>
  );
}

export default App;
