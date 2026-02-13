import React from 'react';
import './discover.css';

export function Discover() {
  return (
    <main className="bg-light text-dark">
            <h2>
                Your Upcoming Events
            </h2>
            <div id="upcomingCarousel" className="carousel slide">
                <div id = "slide1" className = "upcoming carousel-item">
                    <span className = "card left-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className = "card middle-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className = "card right-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>
                <div id = "slide2" className = "upcoming carousel-item">
                    <span className = "card left-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className = "card middle-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className = "card right-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>
                <a className="carousel-control-prev" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>
            <br/>
            <h2>
                Browse Events
            </h2>
            <div id="eventCarousel" className="carousel slide">
                <div id = "slide1" className = "upcoming carousel-item">
                    <span className = "card left-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 1</figcaption>
                    </span>
                    <span className = "card middle-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 2</figcaption>
                    </span>
                    <span className = "card right-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 3</figcaption>
                    </span>
                </div>
                <div id = "slide2" className = "upcoming carousel-item">
                    <span className = "card left-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 4</figcaption>
                    </span>
                    <span className = "card middle-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 5</figcaption>
                    </span>
                    <span className = "card right-card">
                        <img src = "card.png" width = {200} />
                        <figcaption>Event 6</figcaption>
                    </span>
                </div>
                <a className="carousel-control-prev" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>

            <label for="invites">Invites:</label>
            <textarea id="invites" name="invites">Send and recieve invites!</textarea>
            <button>Send!</button>

        </main>
  );
}