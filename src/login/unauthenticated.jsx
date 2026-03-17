import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated({user, onLogin}) {
  const [userName, setUserName] = React.useState(user);
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');

  function loginUser() {
    createAuth('/api/auth/login');
  }

  function createUser() {
    createAuth('/api/auth/create');
  }


  async function createAuth(endpoint) {
    const res = await fetch(endpoint, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userName, password}),
    });
    await res.json();
    if (res.ok){
      localStorage.setItem('user', user);
      navigate('/discover');
    } else {
      alert('Authentication failed');
    }
  }


  return (

    <div>
      <div className="input-group">
         <span className = "input-group-text"for = "username" >Username:</span>
         <input className="form-control" type = "text" onChange = {(e) => setUserName(e.target.value)} placeholder="your name"/>
      </div>
      <div className="input-group">
        <span className = "input-group-text" for = "password">Password:</span>
        <input className = "form-control" type = "password" placeholder="your password" onChange = {(e) => setPassword(e.target.value)}/>
      </div>
      <button onClick = {() => loginUser()} disabled={!userName || !password} className = "btn btn-primary">Login</button>
      <button onClick = {() => createUser()} type="submit" disabled={!userName || !password} className = "btn btn-secondary">Create</button>
    </div>
  );
}