import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Discover } from './discover/discover';
import { Preferences } from './preferences/preferences';

export default function App() {
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
                                <NavLink className= "nav-link" to = "discover">Discover</NavLink>
                            </li>
                            <li>
                                <NavLink className= "nav-link" to = "preferences">Preferences</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>   

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/discover' element={<Discover />} />
                    <Route path='/preferences' element={<Preferences />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                
                <footer>
                    <p>Taylor Christensen</p>
                    <NavLink href="https://github.com/tchris43/startup/">github</NavLink>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}