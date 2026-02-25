import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';

export function Login({ user, authState, onAuthChange }) {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  function loginUser() {
    localStorage.setItem('user', text);
    navigate('/discover');
    onAuthChange(text, AuthState.Authenticated);
  }

  function textChange(e) {
    setText(e.target.value);
  }

  return (
    // <main className="container-fluid text-center bg-light text-dark">
    //       <h1>Welcome to NextEvent</h1>
    //       <div className="input-group">
    //           <span className = "input-group-text"for = "username">Username:</span>
    //           <input className="form-control" type = "text" placeholder="your name" onChange = {textChange}/>
    //       </div>
    //       <div className="input-group">
    //           <span className = "input-group-text" for = "password">Password:</span>
    //           <input className = "form-control" type = "password" placeholder="your password"/>
    //       </div>
    //       <button onClick = {loginUser} className = "btn btn-primary">Login</button>
    //       <button type="submit" className = "btn btn-secondary">Create</button>
    // </main>
    <main className="container-fluid text-center bg-light text-dark">
      <div>
        <h1> Welcome to NextEvent</h1>
        {console.log(authState)}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          user={user}
          onLogin={loginUser}
        />
      )}
      {authState === AuthState.Authenticated && (
        <Authenticated
          user={user}
          onLogout={() => onAuthChange(user, AuthState.Unauthenticated)}
        />
      )}
      </div>
    </main>
  );
}