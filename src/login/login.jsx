import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';

export function Login({ user, authState, onAuthChange }) {

  return (
    <main className="container-fluid text-center bg-light text-dark">
      <div>
        <h1> Welcome to NextEvent</h1>
        {console.log(authState)}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          user={user}
          onLogin={(userName) => {
            onAuthChange(userName, AuthState.Authenticated)
          }}
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