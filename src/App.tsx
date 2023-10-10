import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  padding: 100px;
`;

const EditBtn = styled.button`
  cursor: pointer;
`;

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  occupation: string;
}

function App() {
  const [users, setUsers] = useState<User[]>();

  const getUsers = async () => {
    const response = await fetch(
      "https://techop-rpa-functions.azurewebsites.net/api/getUsers?",
      {}
    );
    const result = await response.json();
    setUsers(result);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <h1>USERS</h1>
      {users?.map((user) => {
        return (
          <div>
            <h3>Email: {user.email}</h3>
            <li>Lastname: {user.lastName}</li>
            <li>Firstname: {user.firstName}</li>
            <li>Occupation: {user.occupation}</li>
            <EditBtn id={user.firstName}>Edit</EditBtn>
          </div>
        );
      })}
    </Container>
  );
}

export default App;
