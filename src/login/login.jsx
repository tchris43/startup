import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({setUser}) {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  function loginUser() {
    localStorage.setItem('user', text);
    setUser(text);
    navigate('/discover');
  }

  function textChange(e) {
    setText(e.target.value);
  }

  return (
    <main className="container-fluid text-center bg-light text-dark">
          <h1>Welcome to NextEvent</h1>
          <div className="input-group">
              <span className = "input-group-text"for = "username">Username:</span>
              <input className="form-control" type = "text" placeholder="your name" onChange = {textChange}/>
          </div>
          <div className="input-group">
              <span className = "input-group-text" for = "password">Password:</span>
              <input className = "form-control" type = "password" placeholder="your password"/>
          </div>
          <button onClick = {loginUser} className = "btn btn-primary">Login</button>
          <button type="submit" className = "btn btn-secondary">Create</button>
    </main>
  );
}