import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Discover } from './discover/discover';
import { Preferences } from './preferences/preferences';
import { AuthState } from './login/authState';

export default function App() {
    const [user, setUser] = React.useState(localStorage.getItem('user') || null);
    const currentAuthState = user ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header>
                    <nav className= "navbar navbar-dark">
                        <div className= "navbar-brand" id="logo">NextEvent<sup>&reg;</sup></div>
                        <menu className= "navbar-nav">
                            <li>
                                <NavLink className= "nav-link" to = "/">Home</NavLink>
                            </li>
                            <li>
                                {authState === AuthState.Authenticated && <NavLink className= "nav-link" to = "discover">Discover</NavLink>}
                            </li>
                            <li>
                                {authState === AuthState.Authenticated && <NavLink className= "nav-link" to = "preferences">Preferences</NavLink>}
                            </li>
                        </menu>
                    </nav>
                </header>   

                <Routes>
                    <Route path='/' element={<Login 
                                            user = {user}
                                            authState = {authState} 
                                            onAuthChange = {(user, authState) => {
                                                setUser(user);
                                                setAuthState(authState);
                                            }}                          
                                            />} exact />
                    <Route path='/discover' element={<Discover user = {user}/>} />
                    <Route path='/preferences' element={<Preferences user = {user} />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                
                <footer>
                    <p>Taylor Christensen</p>
                    <NavLink to ="https://github.com/tchris43/startup/">github</NavLink>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}