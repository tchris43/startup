import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Authenticated({user, onLogout}) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'DELETE',
    })
    .catch(() => {

    })
    .finally(() => {
      localStorage.removeItem('user');
      onLogout();
    })
  }

  return (

    <div>
        {console.log("entered")}
        <h1> {user} </h1>
        <button onClick = {() => navigate('/discover')} className = "btn btn-primary">Discover</button>
        <button onClick = {() => logout()} className = "btn btn-secondary">Logout</button>
    </div>
  );
}