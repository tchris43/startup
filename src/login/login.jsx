import React from 'react';

export function Login() {
  return (
    <main className="container-fluid text-center bg-light text-dark">
        <form method="get" action="search.html">
            <h1>Welcome to NextEvent</h1>
            <div className="input-group">
                <span className = "input-group-text"for = "username">Username:</span>
                <input className="form-control" type = "text" placeholder="your name"/>
            </div>
            <div className="input-group">
                <span className = "input-group-text" for = "password">Password:</span>
                <input className = "form-control" type = "password" placeholder="your password"/>
            </div>
            <button type="submit" className = "btn btn-primary">Login</button>
            <button type="submit" className = "btn btn-secondary">Create</button>
        </form>
    </main>
  );
}