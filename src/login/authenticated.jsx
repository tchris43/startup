import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated({user, onLogout}) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    onLogout();
  }

  return (

    <div>
        {console.log("entered")}
        <h1> {user} </h1>
    </div>
  );
}