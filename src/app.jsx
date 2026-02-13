import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className="body bg-dark text-light">
            <header>
                <nav class = "navbar navbar-dark">
                    <a class = "navbar-brand" id="logo" href="#">NextEvent<sup>&reg;</sup></a>
                    <menu class = "navbar-nav">
                        <li>
                            <a class = "nav-link" href = "index.html">Home</a>
                        </li>
                        <li>
                            <a class = "nav-link" href = "search.html">Discover</a>
                        </li>
                        <li>
                            <a class = "nav-link" href = "settings.html">Preferences</a>
                        </li>
                    </menu>
                </nav>
            </header>   

            <main> App Components go here</main>
            
            <footer>
                <p>Taylor Christensen</p>
                <a href="https://github.com/tchris43/startup/">github</a>
            </footer>
        </div>
    );
}