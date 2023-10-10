import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  padding: 100px;
`;

const EditBtn = styled.button`
  cursor: pointer;
`;

const EditContainer = styled.div`
  border: solid;
  padding: 10px;
  max-width: 150px;
`;

const InputContainer = styled.div`
  padding: 5px 0px;
`;

const SaveBtn = styled.button``;

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  occupation: string;
  showUpdateForm: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editOccupation, setEditOccupation] = useState("");

  useEffect(() => {
    getUsers();
    clearEditForm();
  }, []);

  const getUsers = async () => {
    const response = await fetch(
      "https://techop-rpa-functions.azurewebsites.net/api/getUsers?",
      {}
    );
    const result = await response.json();
    result.forEach((user: User) => {
      user.showUpdateForm = false;
    });
    setUsers(result);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    user.showUpdateForm = !user.showUpdateForm;
    users.forEach((u: User) => {
      if (u.email !== user.email) {
        u.showUpdateForm = false;
      }
    });

    setUsers([...users]);
  };

  const handleSubmit = () => {
    users.forEach((u: User) => {
      if (u.email === selectedUser!.email) {
        if (editFirstName) {
          u.firstName = editFirstName;
        }
        if (editLastName) {
          u.lastName = editLastName;
        }
        if (editOccupation) {
          u.occupation = editOccupation;
        }
      }
    });
    selectedUser!.showUpdateForm = false;
    clearEditForm();
    setUsers([...users]);
  };

  const clearEditForm = () => {
    setEditFirstName("");
    setEditLastName("");
    setEditOccupation("");
  };

  return (
    <Container>
      <h1>USERS</h1>
      {users?.map((user) => {
        return (
          <div>
            <h3>Email: {user.email}</h3>
            <li>Last name: {user.lastName}</li>
            <li>First name: {user.firstName}</li>
            <li>Occupation: {user.occupation}</li>
            <EditBtn id={user.firstName} onClick={() => handleEdit(user)}>
              Edit
            </EditBtn>
            {user.showUpdateForm ? (
              <EditContainer>
                <InputContainer>
                  <div>First name:</div>
                  <input
                    placeholder={user.firstName}
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                  ></input>
                </InputContainer>
                <InputContainer>
                  <div>Last name:</div>
                  <input
                    placeholder={user.lastName}
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                  ></input>
                </InputContainer>
                <InputContainer>
                  <div>Occupation:</div>
                  <input
                    placeholder={user.occupation}
                    value={editOccupation}
                    onChange={(e) => setEditOccupation(e.target.value)}
                  ></input>
                </InputContainer>
                <SaveBtn onClick={() => handleSubmit()}>Save</SaveBtn>
              </EditContainer>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </Container>
  );
}

export default App;
